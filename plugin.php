<?php
/**
 * Plugin Name: Price Calculator - Block
 * Description: Calculate price of products based on quantity
 * Version: 1.0.9
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: price-calculator
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PCLB_PLUGIN_VERSION', isset( $_SERVER['HTTP_HOST'] ) && 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.9' );
define( 'PCLB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Price Calculator
class PCLBPriceCalculator{
	function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}

	function onInit() {
		wp_register_style( 'pclb-price-calculator-style', plugins_url( 'dist/style.css', __FILE__ ), [], PCLB_PLUGIN_VERSION ); // Style
		wp_register_style( 'pclb-price-calculator-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'pclb-price-calculator-style' ], PCLB_PLUGIN_VERSION ); // Backend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'pclb-price-calculator-editor-style',
			'style'				=> 'pclb-price-calculator-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block

		wp_set_script_translations( 'pclb-price-calculator-editor-script', 'price-calculator', plugin_dir_path( __FILE__ ) . 'languages' );
	}

	function render( $attributes ){
		extract( $attributes );

		wp_set_script_translations( 'pclb-price-calculator-script', 'price-calculator', plugin_dir_path( __FILE__ ) . 'languages' );

		$className = $className ?? '';
		$blockClassName = "wp-block-pclb-price-calculator $className align$align";

		ob_start(); ?>
		<div class='<?php echo esc_attr( $blockClassName ); ?>' id='pclbPriceCalculator-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new PCLBPriceCalculator;