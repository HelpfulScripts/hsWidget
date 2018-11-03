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
        slider:0,       // 0...1 last slider position
        notified:''     // last notifed value
    };
    private getTargetOffset(e:any):number {
        let target:any = e.target;
        let leftOffset = 0;
        while (target.className.trim() !== e.currentTarget.className.trim()) {
            leftOffset += target.offsetLeft;
            target = target.parentNode;
        }
        return leftOffset - target.lastChild.offsetLeft;
    }
    private getValue(e:any) {
        e.stopPropagation();
        e.preventDefault();
        const slotWidth = e.currentTarget.lastChild.clientWidth;
        this.value = (e.clientX - this.pos.mouse) / slotWidth + this.pos.slider;
console.log(`value: cx=${e.clientX} ox=${this.pos.mouse} sw=${slotWidth} hw=${this.pos.slider} v=${this.value} `);            
        return this.notify();
    }
    private mousedown(e:any) { 
        const offset = this.getTargetOffset(e);
        this.pos.mouse = e.clientX;
        if (['hs-slider', 'hs-slider-slot'].indexOf(e.target.className.trim())>=0) { 
            const slotWidth = e.currentTarget.lastChild.clientWidth;
            const handleWidth = e.currentTarget.lastChild.lastChild.clientWidth;
            this.pos.mouse -= handleWidth/2;
            this.value = (e.offsetX - handleWidth/2 + offset) / slotWidth; 
console.log(`down: cx=${e.clientX} ox=${e.offsetX} sw=${slotWidth} hw=${handleWidth} o=${offset} v=${this.value} `);            
        }
        this.pos.slider = this.value;
        this.getValue(e);
    }
    private mousemove(e:any)   { 
        if (this.pos.mouse>0) {
            this.getValue(e);
            if (this.value > 1 || this.value < 0) { this.mouseup(e); }
        }
    }
    private mouseup(e:any)   { 
        if (this.pos.mouse>0) {
            this.value = this.getValue(e);
            this.pos.mouse = -1;
        }
    }

    private mouseout(e:any) {
        if (this.pos.mouse>0 && e.target.className.trim() === 'hs-slider') {
            this.mouseup(e);
        }
    }

    private notify():number {
        if ((this.range.length > 1) && (typeof this.range[0] ==='string')) {
            const v = Math.floor(this.value * (this.range.length-1) + 0.5);
            if (this.pos.notified !== this.range[v]) {
                this.onchange(this.range[v]); // notify change hook
                this.pos.notified = <string>this.range[v];
            }
            // return a snap to valid value
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
        const share = i / (markers.length-1); // pos (0...1) of marker along slider
        const left = markers.length<2? 0 : 100*share;
        return m('.hs-slider-marker', {style: `left: ${left}%`}, this.renderLabel(value));
    }

    public renderLabel = (value: number|string):Vnode =>
        m('.hs-slider-label', value);

    view(node: Vnode): Vnode { 
        const id = node.attrs.id;
        const css = node.attrs.css || '';
        this.range = node.attrs.range || [];
        this.onchange = node.attrs.onchange;
        return m(`.hs-slider ${css}`, {
            id:id,
            onmousedown:this.mousedown.bind(this), 
            onmousemove:this.mousemove.bind(this), 
            onmouseup:this.mouseup.bind(this),
            onmouseout:this.mouseout.bind(this)
        },
        [this.renderSlider()]);
    }
}
