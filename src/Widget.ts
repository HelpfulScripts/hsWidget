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
     * returns a new object literal that can be used as a `node.attrs` object.
     * It merges any of the `WidgetsAttrs` from input `a` with fields provided in `others`.
     * In an extended class, call as follow:
     * ```
     * return m(<selector>, this.attrs(node.attrs, {
     *      param1: value1,
     *      param2: value2
     * }))
     * ```
     * If `others` contains elements of `WidgetAttrs`, then
     * - `id` is used from `a`
     * - `class` is added to any definition in `a`
     * - `style` is added to any definition in `a`
     * @param a the provided `attrs` object, e.g. from `node.attrs`
     * @param others new attributes to add to the resulting `attrs` object. 
     */
    protected attrs<A extends WidgetAttrs>(a:WidgetAttrs, others?:A):A {
        const attrs:A = others || <A>{};
        if (a.id)    { attrs.id = a.id; }
        if (a.class) { attrs.class = [attrs.class||'', a.class].join(' '); }
        if (a.style) { attrs.style = [attrs.style||'', a.style].join(' '); }
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

export interface EnabledWidgetAtrrs extends WidgetAttrs {
    disable?: boolean;
}

export abstract class EnabledWidget  extends Widget {
    enabled = true;
    enable(set:boolean) { this.enabled = set; }
    protected attrs<A extends EnabledWidgetAtrrs>(a:EnabledWidgetAtrrs, others?:A):A {
        const attrs = super.attrs(a, others);
        attrs.class = [attrs.class, this.enabled?'' : 'hs_disabled'].join(' ');
        return attrs;
    }
}