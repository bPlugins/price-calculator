<?php
/**
 * Plugin Name: Price Calculator - Gutenberg Block
 * Description: Calculate price of products based on quantity
 * Version: 1.0.0
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: price-calculator
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PCB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.0' );
define( 'PCB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Generate Styles
class PCBStyleGenerator {
    public static $styles = [];
    public static function addStyle( $selector, $styles ){
        if( array_key_exists( $selector, self::$styles ) ){
           self::$styles[$selector] = wp_parse_args( self::$styles[$selector], $styles );
        }else { self::$styles[$selector] = $styles; }
    }
    public static function renderStyle(){
        $output = '';
        foreach( self::$styles as $selector => $style ){
            $new = '';
            foreach( $style as $property => $value ){
                if( $value == '' ){ $new .= $property; }else { $new .= " $property: $value;"; }
            }
            $output .= "$selector { $new }";
        }
        return $output;
    }
}

// Price Calculator
class PCBPriceCalculator{
    protected static $_instance = null;

    function __construct(){
        add_action( 'init', [$this, 'register'] );
    }

    public static function instance(){
        if( self::$_instance === null ){
            self::$_instance = new self();
        }
        return self::$_instance;
    }

    function register() {
        wp_register_script( 'pcb_editor_script', plugins_url( 'dist/editor.js', __FILE__ ), [ 'wp-blob', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-element', 'wp-html-entities', 'wp-i18n', 'wp-rich-text' ], PCB_PLUGIN_VERSION, false ); // Backend Script
        wp_register_style( 'pcb_editor_style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], PCB_PLUGIN_VERSION ); // Backend Style
        wp_register_script( 'pcb_script', plugins_url( 'dist/script.js', __FILE__ ), [ 'jquery' ], PCB_PLUGIN_VERSION, true ); // Frontend Script
        wp_register_style( 'pcb_style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], PCB_PLUGIN_VERSION ); // Frontend Style

        register_block_type( 'pcb/price-calculator', [
            'editor_script' => 'pcb_editor_script',
            'editor_style'  => 'pcb_editor_style',
            'script'        => 'pcb_script',
            'style'         => 'pcb_style',
            'render_callback' => [$this, 'render']
        ] ); // Register Block
        
        wp_set_script_translations( 'pcb_editor_script', 'price-calculator', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
    }

    function render( $attributes ){
        extract( $attributes );
        $align = $align ?? '';
        $cId = $cId ?? '';
        $width = $width ?? '60%';
        $alignment = $alignment ?? 'center';
        $background = $background ?? [ 'color' => '#e3edf1' ];
        $textAlign = $textAlign ?? 'left';
        $padding = $padding ?? [ 'vertical' => '15px', 'horizontal' => '30px' ];
        $border = $border ?? [ 'radius' => '3px' ];
        $shadow = $shadow ?? [];
        $heading = $heading ?? 'Price Calculator';
        $headingTypo = $headingTypo ?? [ 'fontSize' => 28 ];
        $headingColor = $headingColor ?? '#40444f';
        $maxQuantity = $maxQuantity ?? 500;
        $quantityLabel = $quantityLabel ?? 'Product Items:';
        $totalPriceLabel = $totalPriceLabel ?? 'total price';
        $numberTypo = $numberTypo ?? [ 'fontSize' => 20, 'fontWeight' => 700 ];
        $labelTypo = $labelTypo ?? [ 'fontSize' => 15 ];
        $numberLabelColor = $numberLabelColor ?? '#40444f';

        $priceCalculatorStyle = new PCBStyleGenerator(); // Generate Styles
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId", [
            'text-align' => $alignment
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator", [
            'width' => '0px' === $width || '0%' === $width || '0em' === $width ? 'auto' : $width,
            $background['styles'] ?? 'background-color: #e3edf1;' => '',
            'text-align' => $textAlign,
            'padding' => $padding['styles'] ?? '15px 30px',
            $border['styles'] ?? 'border-radius: 3px;' => '',
            'box-shadow' => $shadow['styles'] ?? 'none'
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator .alert", [
            'text-align' => $textAlign,
            'width' => '0px' === $width || '0%' === $width || '0em' === $width ? 'auto' : $width,
            $typography['styles'] ?? 'font-size: 25px;' => '',
            $colors['styles'] ?? 'color: #333; background: #fff;' => '',
            'padding' => $padding['styles'] ?? '15px 30px',
            $border['styles'] ?? 'border: 2px solid #333; border-radius: 8px;' => '',
            'box-shadow' => $shadow['styles'] ?? 'none'
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator .pcbHeading", [
            $headingTypo['styles'] ?? 'font-size: 28px;' => '',
            'color' => $headingColor
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator .pcbQuantity, #pcbPriceCalculator-$cId .pcbPriceCalculator .pcbTotal", [
            'color' => $numberLabelColor
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator .pcbQuantity .pcbQuantityAmount, #pcbPriceCalculator-$cId .pcbPriceCalculator .pcbTotal .pcbTotalPrice", [
            $numberTypo['styles'] ?? 'font-size: 20px; font-weight: 700;'
        ] );
        $priceCalculatorStyle::addStyle( "#pcbPriceCalculator-$cId .pcbPriceCalculator .pcbQuantity .pcbQuantityLabel, #pcbPriceCalculator-$cId .pcbPriceCalculator .pcbTotal .pcbTotalLabel", [
            $labelTypo['styles'] ?? 'font-size: 15px;'
        ] );

        ob_start(); ?>
        <div class='wp-block-pcb-price-calculator <?php echo 'align' . esc_attr( $align ); ?>' id='pcbPriceCalculator-<?php echo esc_attr( $cId ) ?>' data-price-calculator='<?php echo wp_json_encode( [ 'unitPrice' => $unitPrice ?? 15, 'maxQuantity' => $maxQuantity ] ); ?>'>
            <style>@import url( <?php echo esc_url( $headingTypo['googleFontLink'] ?? '' ); ?> ); @import url( <?php echo esc_url( $numberTypo['googleFontLink'] ?? '' ); ?> ); @import url( <?php echo esc_url( $labelTypo['googleFontLink'] ?? '' ); ?> ); <?php echo wp_kses( $priceCalculatorStyle::renderStyle(), [] ) ?></style>

            <div class='pcbPriceCalculator'>
                <h2 class='pcbHeading'><?php echo wp_kses_post( $heading ); ?></h2>

                <div class='pcbQuantity'>
                    <label class='pcbQuantityLabel'><?php echo wp_kses_post( $quantityLabel ); ?></label>

                    <p class='pcbQuantityAmount'></p>
                </div>

                <input class='pcbQuantityRange' type='range' min='1' max="<?php echo esc_html( $maxQuantity ); ?>" step='1' />

                <div class='pcbTotal'>
                    <p class='pcbTotalPrice'></p>

                    <label class='pcbTotalLabel'><?php echo wp_kses_post( $totalPriceLabel ); ?></label>
                </div>
            </div>
        </div>

        <?php $priceCalculatorStyle::$styles = []; // Empty styles
        return ob_get_clean();
    } // Render
}
PCBPriceCalculator::instance();