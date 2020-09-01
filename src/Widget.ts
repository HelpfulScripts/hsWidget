/**
 * 
 */

import m from "mithril";
export type Vnode<AttrsType, StateType extends WidgetState> = m.Vnode<AttrsType, StateType>;
export type ViewResult = m.Children | null | void;


export interface WidgetAttrs {
    /** an optional CSS ID (e.g., `myWidget`) to define the main widget ID (-> `#myWidget`) */
    id?: string;

    /** an optional CSS class (e.g., `myWidget`) to add to the main widget class (->`.myWidget`) */
    class?: string;
    
    /** an optional pre-computed CSS style string to add to the main widget */
    style?: string;
}

interface WidgetState extends m.Lifecycle<WidgetAttrs, m.Lifecycle<WidgetAttrs, WidgetState>>  {
}

export abstract class Widget implements m.ClassComponent<WidgetAttrs>{
    /** 
     * returns a new objkect literal that can be used as a `node.attrs` object.
     * It merges any of the `WidgetsAttrs` from input `a` with fields provided in `others`.
     */
    protected attrs<A extends WidgetAttrs>(a:WidgetAttrs, others?:A):A {
        const attrs:A = others || <A>{};
        if (a.id)    { attrs.id = a.id; }
        if (a.class) { attrs.class = `${attrs.class||''} ${a.class}`; }
        if (a.style) { attrs.style = `${attrs.style||''} ${a.style}`; }
        return attrs;
    }
    abstract view(node: Vnode<WidgetAttrs, this>):ViewResult;
}


/** Mouse event hooks in Widget attributes. */
export interface MouseEventsAttrs {
    onclick?:     (event:Event) => void;
    onmousedown?: (event:Event) => void;
    onmouseup?:   (event:Event) => void;
}