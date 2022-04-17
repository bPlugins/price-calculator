<?php
/**
 * Plugin Name: Price Calculator - Block
 * Description: Calculate price of products based on quantity
 * Version: 1.0.6
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: price-calculator
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PCLB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.6' );
define( 'PCLB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Price Calculator
class PCLBPriceCalculator{
	function __construct(){
		add_action( 'init', [$this, 'onInit'] );
	}

	function onInit() {
		wp_register_style( 'pclb-price-calculator-editor-style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], PCLB_PLUGIN_VERSION ); // Backend Style
		wp_register_style( 'pclb-price-calculator-style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], PCLB_PLUGIN_VERSION ); // Frontend Style

		register_block_type( __DIR__, [
			'editor_style'		=> 'pclb-price-calculator-editor-style',
			'style'				=> 'pclb-price-calculator-style',
			'render_callback'	=> [$this, 'render']
		] ); // Register Block
		
		wp_set_script_translations( 'pclb-price-calculator-editor-script', 'price-calculator', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
	}

	function render( $attributes ){
		extract( $attributes );

		ob_start(); ?>
		<div class='wp-block-pclb-price-calculator <?php echo 'align' . esc_attr( $align ); ?>' id='pclbPriceCalculator-<?php echo esc_attr( $cId ) ?>' data-attributes='<?php echo esc_attr( wp_json_encode( $attributes ) ); ?>'></div>

		<?php return ob_get_clean();
	} // Render
}
new PCLBPriceCalculator;