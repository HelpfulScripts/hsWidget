/**
 * # Collapsible Widget
 * returns a Vnode that can be toggled to expand and contract by clicking on the first `component`.
 * 
 * Invoked as `m(Collapsible, <CollapsibleAttrs>, <content>)`
 * 
 * See {@link Collapsible.Collapsible Collapsible} and {@link Collapsible.CollapsibleAttrs CollapsibleAttrs}
 * 
 * `<content>`: `m.Child[]` array of text or Vnodes to show in the button; 
 * <content>[0] deterimines the `title` to display, all remaining array elements 
 * are part of the collapsible set beneath the title.
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * m.mount(root, {view: () => m('.hs-white', [
 *    m(hsWidget.Collapsible, { class:'.myExample' }, [
 *       m('.myTitle', 'click me to toggle'), 
 *       m('.myItem', 'body item1'), 
 *       m('.myItem', 'body item2'), 
 *       m('.myItem', 'body item3')
 *    ]),
 *    m('', 'This is a background text that will be pushed down by the Collapsible')
 * ])});
 * </file>
 * <file name='style.css'>
 * div { margin-top: 5px; }
 * .myTitle {
 *    display: inline-block;
 *    border-radius: 0px 4px;
 *    padding: 1px;
 *    border-bottom: 1px solid blue;
 *    width: auto;
 * }
 * </file>
 * </example>
 */

/** */
import m                from "mithril";
import { Vnode }        from './Widget';
import { WidgetAttrs }  from './Widget';
import { Widget }       from './Widget';

enum Expansion {
    closed  = 0,
    opening = 1,
    open    = 2,
    closing = 3,
}
 
export interface CollapsibleAttrs extends WidgetAttrs {
    /** indicates whether the `Collapsible` is initially expanded. */
    isExpanded?: boolean

    /** the header shows an arrow to the left, pointing right, or down if expanded. Defaults to `false`. */
    preArrow?: boolean;

    /** the header shows an arrow to the right, pointing left, or down if expanded. Defaults to `false`.  */
    postArrow?: boolean;

    /** the collapsing transition duration for opening and closing in ms. Defaults to 250. */
    transition?: number;
}

/**
 * ## Collapsible
 * returns a Vnode that can be toggled to expand and contract by clicking on the first `component`.
 * 
 * Invoked as `m(Collapsible, <CollapsibleAttrs>, <content>)`
 * 
 * See {@link Collapsible.Collapsible Collapsible}
 * 
 * `<content>`: `m.Child[]` array of text or Vnodes to show in the button; 
 * <content>[0] deterimines the `title` to display, all remaining array elements 
 * are part of the collapsible set beneath the title.
 */
export class Collapsible extends Widget {
    expanded: Expansion;
    maxHeight: number;
    toggle: () => void;
    oninit(node:Vnode<CollapsibleAttrs, this>) {
        node.state.expanded = node.attrs.isExpanded? Expansion.open : Expansion.closed;
        node.state.maxHeight = null;
        node.state.toggle = () => {
            switch (node.state.expanded) {
                case Expansion.open:
                case Expansion.opening:
                    node.state.expanded = Expansion.closing;
                    setTimeout(()=> {   // mark as closed after transition and redraw
                        node.state.expanded = Expansion.closed; 
                        m.redraw();
                    }, node.attrs.transition);
                    break;
                case Expansion.closed:
                case Expansion.closing:
                    node.state.expanded = Expansion.open;
                    break;
            }
        };
    }

    view(node:Vnode<CollapsibleAttrs, this>) {
        node.attrs.transition = node.attrs.transition || 250; // ms to animate opening and closing
        const components = <m.Child[]>node.children;
        const preArrow   = node.attrs.preArrow || false;
        const postArrow  = node.attrs.postArrow || false;
        const maxHeight  = (node.state.expanded===Expansion.closed || node.state.expanded===Expansion.closing)?'0' : `400px`;
        const title      = [components.shift()];
        if (preArrow) { title.unshift(m(`.hs-collapsible-pre .hs-collapsible-arrow-${node.state.expanded?'down' : 'right'}`)); }
        if (postArrow){ title.push(m(`.hs-collapsible-post .hs-collapsible-arrow-${node.state.expanded?'down' : 'left'}`)); }
        return m(`.hs-collapsible`, this.attrs(node.attrs, {}), [
            m('.hs-collapsible-title', { onclick:node.state.toggle}, title),
            m(`.hs-collapsible-content.hs_scrolly`, {
                class: node.state.expanded===Expansion.closed? undefined : 'hs-collapsible-expanded',
                style:`max-height:${maxHeight}; transition: max-height ${node.attrs.transition/1000}s ease-in-out`
            }, 
            // if closed: prune the render tree by using empty content array
            node.state.expanded===Expansion.closed? [] : components.map(c => m('',c)))
        ]);
    }
}
