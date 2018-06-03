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
 *    m(hswidget.Collapsible, { css:'.myExample', components: [
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
import { m, Vnode } from 'hslayout';

export class Collapsible {
    expanded = false;
    toggle() {
        this.expanded = !this.expanded;
    }
    view(node:Vnode) {
        const css        = node.attrs.css;
        const components = node.attrs.components;
        const preArrow   = node.attrs.preArrow;
        const postArrow  = node.attrs.postArrow;
        if (node.attrs.isExpanded!==undefined) {
            this.expanded = node.attrs.isExpanded;
        }
        const expCSS = this.expanded?'hs-collapsible-expanded':'';
        return m(`.hs-collapsible ${css} ${expCSS}`, { onclick:this.toggle.bind(this)}, [
            m('.hs-collapsible-title',[
                !preArrow? m('') : m(`.hs-collapsible-pre .hs-collapsible-arrow-${this.expanded?'down' : 'right'}`),
                components[0],
                !postArrow? m('') : m(`.hs-collapsible-post .hs-collapsible-arrow-${this.expanded?'down' : 'left'}`),
            ]),
            components[1]? m('.hs-collapsible-content', components[1].map((c:any) =>m('',c))) : undefined
        ]);
    }
}
