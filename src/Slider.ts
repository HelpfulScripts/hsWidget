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
 * let nom;
 * let con;
 * 
 * m.mount(root, {view: () => m('', [
 *   m('h4', `Nominal Slider: ${nom}`),
 *   m(hswidget.Slider, {
 *      range: ['one', 'two', 'three'],
 *      onchange: v => nom=v
 *   }),
 *   m('h4', `Continuous Slider: ${con}`),
 *   m(hswidget.Slider, {
 *      range: [0, 100],
 *      onchange: v => con=Math.floor(v*10)/10
 *   })
 * ])});
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
    private onchange: (value:string|number)=>void;
    private range = <SliderRange>[];
    private value:number = 0.5;   // reflects the slider position, 0...1
    private pos = {
        mouse: -1,      // <0: inactive; 0...n pixel: active
        slider:0        // 0...1 slider position
    };
    private mousedown(e:any) { 
        this.pos.mouse = e.clientX;
        this.pos.slider = this.value;
    }
    private mousemove(e:any)   { 
        if (this.pos.mouse>0) {
            const width = e.currentTarget.clientWidth;
            this.value = (e.clientX - this.pos.mouse) / width + this.pos.slider;
            this.notify(this.value);
console.log(`${e.clientX} - ${this.pos.mouse} / ${width} + ${this.pos.slider}`);            
        }
    }
    private mouseup(e:any)   { 
        this.mousemove(e);
        this.pos.mouse = -1;
        this.value = this.notify(this.value);
    }

    private notify(value:number|string):number {
        if ((this.range.length > 1) && (typeof this.range[0] ==='string')) {
            const v = Math.floor(this.value * (this.range.length-1) + 0.5);
            this.onchange(this.range[v]);
            return v / (this.range.length-1);
        } else {
            const numRange = <[number, number]>this.range;
            const v = Math.floor((numRange[0]*(1-this.value) + numRange[1]*this.value)*100)/100;
            this.onchange(Math.min(<number>this.range[1], Math.max(<number>this.range[0], v)));
            return this.value;
        }
}

    public renderSlider = (): Vnode =>
        m('.hs-slider-slot', [
            m('.hs-slider-markers', this.range.map(this.renderMarker)), 
            m('.hs-slider-handle', { style: `left:${100*this.value}%` })
        ])

    public renderMarker = (value: number|string, i:number, markers:SliderRange):Vnode => {
        const share = i / (markers.length-1);
        const left = markers.length<2? 0 : 100*share;
        return m('.hs-slider-marker', {style: `left: ${left}%`}, this.renderLabel(value));
    }

    public renderLabel = (value: number|string):Vnode =>
        m('.hs-slider-label', value);

    view(node: Vnode): Vnode { 
        const css = node.attrs.css || '';
        this.range = node.attrs.range || [];
        this.onchange = node.attrs.onchange;
        return m(`.hs-slider ${css}`, {
            onmousedown:this.mousedown.bind(this), 
            onmousemove:this.mousemove.bind(this), 
            onmouseup:this.mouseup.bind(this)
        },
        [this.renderSlider()]);
    }
}
