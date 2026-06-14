<?php
/**
 * Plugin Name: Price Calculator - Block
 * Description: Calculate price of products based on quantity
 * Version: 1.1.1
 * Author: bplugins
 * Author URI: https://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: price-calculator
 * Requires at least: 6.5
 * Tested up to: 7.0
 * Requires PHP: 7.4
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PCLB_VERSION', ( defined( 'WP_DEBUG' ) && WP_DEBUG ) ? time() : '1.1.1' );
define( 'PCLB_DIR_URL', plugin_dir_url( __FILE__ ) );
define( 'PCLB_DIR_PATH', plugin_dir_path( __FILE__ ) );

if( !class_exists( 'PCLBPlugin' ) ){
	/**
	 * Main plugin class for Price Calculator Block.
	 *
	 * @since 1.0.0
	 */
	class PCLBPlugin {
		/**
		 * Constructor. Registers WordPress hooks.
		 *
		 * @since 1.0.0
		 */
		public function __construct(){
			add_action( 'init', [$this, 'onInit'] );
			add_action( 'enqueue_block_editor_assets', [$this, 'setTranslations'] );
		}

		/**
		 * Registers the block type from the build directory.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function onInit() {
			register_block_type( __DIR__ . '/build' );
		}

		/**
		 * Sets up script translations for editor and view scripts.
		 *
		 * @since 1.0.8
		 * @return void
		 */
		public function setTranslations() {
			wp_set_script_translations( 'pclb-price-calculator-editor-script', 'price-calculator', PCLB_DIR_PATH . '/languages' );
			wp_set_script_translations( 'pclb-price-calculator-view-script', 'price-calculator', PCLB_DIR_PATH . '/languages' );
		}
	}
	new PCLBPlugin();
}