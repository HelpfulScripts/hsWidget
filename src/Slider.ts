/**
 * # Slider Widget
 * Shows a slider that can select a continuous or nominal value out of a range
 * 
 * ### Profile
 * invoked as `m(Slider, {
 *      range: [number,number] | string[],
 *      onchange: (v:number|string) => void
 * });`
 * 
 * ### Attributes (node.attrs):
 * - `onchange:(v:number|string) => void` function to execute when the slider has changed
 * - `range: [number,number] | string[]` range of values the slider can have; either continuous or nomninal
 * - `css: string` css class to assign to button tag
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let clicked = 0;
 * let radio = '';
 * let toggle = '';
 * 
 * m.mount(root, {view: () => m(hswidget.Slider, {
 *      label: 'This is a slider',
 *      range: ['on', 'off'],
 *      onchange
 * })});
 * </file>
 * </example>
 */

/** */
import { m, Vnode } from 'hslayout';


type SliderRange = Array<number|string>;

/**
 * # Slider Widget
 * Shows a slider that can select a continuous or nominal value out of a range
 * 
 * ### Profile
 * invoked as `m(Slider, {
 *      range: [number,number] | string[],
 *      onchange: (v:number|string) => void
 * });`
 * 
 * ### Attributes (node.attrs):
 * - `onchange:(v:number|string) => void` function to execute when the slider has changed
 * - `range: [number,number] | string[]` range of values the slider can have; either continuous or nomninal
 * - `css: string` css class to assign to button tag
 */
export class Slider {
    private range = <SliderRange>[];
    private value:number|string;
    private mousedown() { console.log('slider down'); }
    private mouseup()   { 
        console.log('slider up'); 
        this.value = 0;
    }
    protected renderSlider = renderSimpleSlider;

    view(node: Vnode): Vnode { 
        const css = node.attrs.css || '';
        this.range = node.attrs.range || [];
        return m(`.hs-slider ${css}`, {onmousedown:this.mousedown, onmouseup:this.mouseup}, [this.renderSlider()]);
    }
}

function renderSimpleSlider():Vnode {
    return m('.hs-slider-slot .hs-simple-slider-slot', m('.hs-slider-markers', this.range.map(renderSimpleMarker)));
}

function renderSimpleMarker(value: number|string, i:number, markers:SliderRange):Vnode {
    const share = i / (markers.length-1);
    const left = markers.length<2? 0 : 100*share;
    return m('.hs-slider-marker .hs-simple-slider-marker', {style: `left: ${left}%`}, renderSimpleLabel(value));
}

function renderSimpleLabel(value: number|string):Vnode {
    return m('.hs-slider-label .hs-simple-slider-label', value);
}

