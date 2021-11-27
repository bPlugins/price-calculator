<?php
/**
 * Plugin Name: Price Calculator - Gutenberg Block
 * Description: Calculate price of products based on quantity
 * Version: 1.0.1
 * Author: bPlugins LLC
 * Author URI: http://bplugins.com
 * License: GPLv3
 * License URI: https://www.gnu.org/licenses/gpl-3.0.txt
 * Text Domain: price-calculator
 */

// ABS PATH
if ( !defined( 'ABSPATH' ) ) { exit; }

// Constant
define( 'PCLB_PLUGIN_VERSION', 'localhost' === $_SERVER['HTTP_HOST'] ? time() : '1.0.1' );
define( 'PCLB_ASSETS_DIR', plugin_dir_url( __FILE__ ) . 'assets/' );

// Generate Styles
class PCLBStyleGenerator {
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
class PCLBPriceCalculator{
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
        wp_register_script( 'pclb_editor_script', plugins_url( 'dist/editor.js', __FILE__ ), [ 'wp-blob', 'wp-block-editor', 'wp-blocks', 'wp-components', 'wp-compose', 'wp-data', 'wp-element', 'wp-html-entities', 'wp-i18n', 'wp-rich-text', 'lodash' ], PCLB_PLUGIN_VERSION, false ); // Backend Script
        wp_register_style( 'pclb_editor_style', plugins_url( 'dist/editor.css', __FILE__ ), [ 'wp-edit-blocks' ], PCLB_PLUGIN_VERSION ); // Backend Style
        wp_register_script( 'pclb_script', plugins_url( 'dist/script.js', __FILE__ ), [ 'lodash' ], PCLB_PLUGIN_VERSION, true ); // Frontend Script
        wp_register_style( 'pclb_style', plugins_url( 'dist/style.css', __FILE__ ), [ 'wp-editor' ], PCLB_PLUGIN_VERSION ); // Frontend Style

        wp_enqueue_script( 'lodash' );

        register_block_type( 'pclb/price-calculator', [
            'editor_script' => 'pclb_editor_script',
            'editor_style'  => 'pclb_editor_style',
            'script'        => 'pclb_script',
            'style'         => 'pclb_style',
            'render_callback' => [$this, 'render']
        ] ); // Register Block
        
        wp_set_script_translations( 'pclb_editor_script', 'price-calculator', plugin_dir_path( __FILE__ ) . 'languages' ); // Translate
    }

    function render( $attributes ){
        extract( $attributes );
        $align = $align ?? '';
        $cId = $cId ?? '';
        $width = $width ?? '60%';
        $alignment = $alignment ?? 'center';
        $background = $background ?? [ 'color' => '#e3edf1' ];
        $textAlign = $textAlign ?? 'left';
        $padding = $padding ?? [ 'vertical' => '25px', 'horizontal' => '30px' ];
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
        $rangeWidth = $rangeWidth ?? '50%';
        $rangeTrackBG = $rangeTrackBG ?? [ 'gradient' => 'radial-gradient(#70777f, #40444f)' ];
        $rangeThumbBG = $rangeThumbBG ?? [ 'gradient' => 'radial-gradient(#70777f, #40444f)' ];

        $priceCalculatorStyle = new PCLBStyleGenerator(); // Generate Styles
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId", [
            'text-align' => $alignment
        ] );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator", [
            'width' => '0px' === $width || '0%' === $width || '0em' === $width ? 'auto' : $width,
            $background['styles'] ?? 'background-color: #e3edf1;' => '',
            'text-align' => $textAlign,
            'padding' => $padding['styles'] ?? '25px 30px',
            $border['styles'] ?? 'border-radius: 3px;' => '',
            'box-shadow' => $shadow['styles'] ?? 'none'
        ] );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbHeading", [
            $headingTypo['styles'] ?? 'font-size: 28px;' => '',
            'color' => $headingColor
        ] );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantity, #pclbPriceCalculator-$cId .pclbPriceCalculator .pclbTotal", [
            'color' => $numberLabelColor
        ] );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantity .pclbQuantityAmount, #pclbPriceCalculator-$cId .pclbPriceCalculator .pclbTotal .pclbTotalPrice", [
            $numberTypo['styles'] ?? 'font-size: 20px; font-weight: 700;' => ''
        ] );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantity .pclbQuantityLabel, #pclbPriceCalculator-$cId .pclbPriceCalculator .pclbTotal .pclbTotalLabel", [
            $labelTypo['styles'] ?? 'font-size: 15px;' => ''
        ] );

        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange", [ 'width' => $rangeWidth ] );
        
        $rangeTrackBGStyle = [ $rangeTrackBG['styles'] ?? 'background-image: radial-gradient(#70777f, #40444f);' => '' ];
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange:focus::-webkit-slider-runnable-track", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange:focus::-ms-fill-upper", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange:focus:focus::-ms-fill-lower", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-webkit-slider-runnable-track", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-moz-range-track", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-ms-fill-upper", $rangeTrackBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-ms-fill-lower", $rangeTrackBGStyle );
        
        $rangeThumbBGStyle = [ $rangeThumbBG['styles'] ?? 'background-image: radial-gradient(#70777f, #40444f);' => '' ];
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-webkit-slider-thumb", $rangeThumbBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-moz-range-thumb", $rangeThumbBGStyle );
        $priceCalculatorStyle::addStyle( "#pclbPriceCalculator-$cId .pclbPriceCalculator .pclbQuantityRange::-ms-thumb", $rangeThumbBGStyle );

        ob_start(); ?>
        <div class='wp-block-pclb-price-calculator <?php echo 'align' . esc_attr( $align ); ?>' id='pclbPriceCalculator-<?php echo esc_attr( $cId ) ?>' data-price-calculator='<?php echo wp_json_encode( [ 'maxQuantity' => $maxQuantity, 'unitPrice' => $unitPrice ?? 15, 'unitPriceQuery' => $unitPriceQuery ?? [ [ 'afterQuantity' => 20, 'unitPrice' => 10 ] ] ] ); ?>'>
            <style>@import url( <?php echo esc_url( $headingTypo['googleFontLink'] ?? '' ); ?> ); @import url( <?php echo esc_url( $numberTypo['googleFontLink'] ?? '' ); ?> ); @import url( <?php echo esc_url( $labelTypo['googleFontLink'] ?? '' ); ?> ); <?php echo wp_kses( $priceCalculatorStyle::renderStyle(), [] ) ?></style>

            <div class='pclbPriceCalculator'>
                <h2 class='pclbHeading'><?php echo wp_kses_post( $heading ); ?></h2>

                <div class='pclbQuantity'>
                    <label class='pclbQuantityLabel'><?php echo wp_kses_post( $quantityLabel ); ?></label>

                    <p class='pclbQuantityAmount'></p>
                </div>

                <input class='pclbQuantityRange' type='range' min='1' max="<?php echo esc_html( $maxQuantity ); ?>" step='1' />

                <div class='pclbTotal'>
                    <p class='pclbTotalPrice'></p>

                    <label class='pclbTotalLabel'><?php echo wp_kses_post( $totalPriceLabel ); ?></label>
                </div>
            </div>
        </div>

        <?php $priceCalculatorStyle::$styles = []; // Empty styles
        return ob_get_clean();
    } // Render
}
PCLBPriceCalculator::instance();