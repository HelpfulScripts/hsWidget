/**
 * # Collapsible Widget
 * returns a Vnode that can be toggled to expand and contract by clicking on the first `component`.
 * 
 * ### Invocation
 * invoked as 
 * ```
 * m(Collapsible, { css:<string>, isExpanded:true, components:[
 *     m('div', 'the title'),
 *     ['body item1', 'body item2', 'body item3']
 * ]})
 * ```
 * 
 * ### Attributes (node.attrs):
 * - `css`: optional; the css class to assign to the entire Collapsible div
 * - `isExpanded`: optional; boolean indicating if the Collapsible is initially expanded
 * - `components`: array of two components: 
 *     - `component[0]` is the title of the Collapsible. This will remain visible and can be clicked 
 *       on to expand or contract the remaining components
 *     - `component[1]` an array of Vnodes that will be collapsed or expanded.
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * m.mount(root, {view: () => m('.hs-white', [
 *    m(hsWidget.Collapsible, { css:'.myExample', components: [
 *       m('.myTitle', 'click me to toggle'), [
 *          m('.myItem', 'body item1'), 
 *          m('.myItem', 'body item2'), 
 *          m('.myItem', 'body item3')
 *       ]
 *    ]}),
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
import m from "mithril";
type Vnode = m.VnodeDOM<any, any>;

const transition = 250; // ms to animate opening and closing

enum Expansion {
    closed  = 0,
    opening = 1,
    open    = 2,
    closing = 3,
}
 
export class Collapsible {
    oninit(node:Vnode) {
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
                    }, transition);
                    break;
                case Expansion.closed:
                case Expansion.closing:
                    node.state.expanded = Expansion.open;
                    break;
            }
        };
    }

    view(node:Vnode) {
        const css        = node.attrs.css;
        const components = node.attrs.components;
        const preArrow   = node.attrs.preArrow;
        const postArrow  = node.attrs.postArrow;
        const maxHeight  = (node.state.expanded===Expansion.closed || node.state.expanded===Expansion.closing)?'0' : `400px`;
        const title = [components[0]];
        if (preArrow) { title.unshift(m(`.hs-collapsible-pre .hs-collapsible-arrow-${node.state.expanded?'down' : 'right'}`)); }
        if (postArrow){ title.push(m(`.hs-collapsible-post .hs-collapsible-arrow-${node.state.expanded?'down' : 'left'}`)); }
        return m(`.hs-collapsible ${css}`, [
            m('.hs-collapsible-title', { onclick:node.state.toggle}, title),
            m(`.hs-collapsible-content.scrolly`, {style:`max-height:${maxHeight}; transition: max-height ${transition/1000}s ease-in-out`}, 
            // if closed: prune the render tree by using empty content array
            node.state.expanded===Expansion.closed? [] : components[1].map((c:any) =>m('',c)))
        ]);
    }
}
