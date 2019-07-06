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
 * - `onchange:(v:number|string) => void` function to execute when the slider has clicked
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
 *   m(hsWidget.Slider, {
 *      range: ['one', 'two', 'three'],
 *      onchange: v => nom=v
 *   }),
 *   m('h4', `Continuous Slider: ${con}`),
 *   m(hsWidget.Slider, {
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
    oninit(node:Vnode) {
        node.state = {
            range: <SliderRange>[],
            value: 0.5,     // reflects the slider position, 0...1
            mouse: -1,      // <0: inactive; 0...n pixel: active
            slider:0,       // 0...1 last slider position
            notified:'',    // last notifed value
            onchange: () => {}
        };
    }
    view(node: Vnode): Vnode { 
        const id = node.attrs.id;
        const css = node.attrs.css || '';
        node.state.range = node.attrs.range || [];
        node.state.onchange = node.attrs.onchange;
        return m(`.hs-slider ${css}`, {
            id:id,
            onmousedown:(e:any) => mousedown(e, node), 
            onmousemove:(e:any) => mousemove(e, node), 
            onmouseup:(e:any)   => mouseup(e, node),
            onmouseout:(e:any)  => mouseout(e, node)
        },
        [renderSlider(node)]);
    }

    
}

function renderSlider(node:Vnode): Vnode {
    return m('.hs-slider-slot', [
        m('.hs-slider-markers', node.state.range.map(renderMarker)), 
        m('.hs-slider-handle', { style: `left:${100*node.state.value}%` })
    ]);
}

function renderMarker(value: number|string, i:number, markers:SliderRange):Vnode {
    const share = i / (markers.length-1); // pos (0...1) of marker along slider
    const left = markers.length<2? 0 : 100*share;
    return m('.hs-slider-marker', {style: `left: ${left}%`}, renderLabel(value));
}

function renderLabel(value: number|string):Vnode {
    return m('.hs-slider-label', value);
}



function getTargetOffset(e:any):number {
    let target:any = e.target;
    let leftOffset = 0;
    while (target.className.trim() !== e.currentTarget.className.trim()) {
        leftOffset += target.offsetLeft;
        target = target.parentNode;
    }
    return leftOffset - target.lastChild.offsetLeft;
}

function getValue(e:any, node:Vnode) {
    e.stopPropagation();
    e.preventDefault();
    const slotWidth = e.currentTarget.lastChild.clientWidth;
    node.state.value = (e.clientX - node.state.mouse) / slotWidth + node.state.slider;
    return notify(node);
}

function mousedown(e:any, node:Vnode) { 
    const offset = getTargetOffset(e);
    node.state.mouse = e.clientX;
    if (['hs-slider', 'hs-slider-slot'].indexOf(e.target.className.trim())>=0) { 
        const slotWidth = e.currentTarget.lastChild.clientWidth;
        const handleWidth = e.currentTarget.lastChild.lastChild.clientWidth;
        node.state.mouse -= handleWidth/2;
        node.state.value = (e.offsetX - handleWidth/2 + offset) / slotWidth; 
    }
    node.state.slider = node.state.value;
    getValue(e, node);
}

function mousemove(e:any, node:Vnode)   { 
    if (node.state.mouse>0) {
        getValue(e, node);
        if (node.state.value > 1 || node.state.value < 0) { mouseup(e, node); }
    }
}

function mouseup(e:any, node:Vnode)   { 
    if (node.state.mouse>0) {
        node.state.value = getValue(e, node);
        node.state.mouse = -1;
    }
}

function mouseout(e:any, node:Vnode) {
    if (node.state.mouse>0 && e.target.className.trim() === 'hs-slider') {
        mouseup(e, node);
    }
}

function notify(node:Vnode):number {
    if ((node.state.range.length > 1) && (typeof node.state.range[0] ==='string')) {
        const v = Math.floor(node.state.value * (node.state.range.length-1) + 0.5);
        if (node.state.notified !== node.state.range[v]) {
            node.state.onchange(node.state.range[v]); // notify change hook
            node.state.notified = <string>node.state.range[v];
        }
        // return a snap to valid value
        return v / (node.state.range.length-1);
    } else {
        const numRange = <[number, number]>node.state.range;
        const v = Math.floor((numRange[0]*(1-node.state.value) + numRange[1]*node.state.value)*100)/100;
        node.state.onchange(Math.min(<number>node.state.range[1], Math.max(<number>node.state.range[0], v)));
        return node.state.value;
    }
}