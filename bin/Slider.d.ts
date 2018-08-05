import { Vnode } from 'hslayout';
export declare class Slider {
    private onchange;
    private range;
    private value;
    private pos;
    private mousedown;
    private mousemove;
    private mouseup;
    private notify;
    renderSlider: () => any;
    renderMarker: (value: string | number, i: number, markers: (string | number)[]) => any;
    renderLabel: (value: string | number) => any;
    view(node: Vnode): Vnode;
}
