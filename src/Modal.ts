/**
 * # Modal Widget
 * returns a Vnode that covers the entire window. 
 * 
 * ### Profile
 * invoked as `m(Modal, { <Attributes> })`
 * 
 * ### Attributes (node.attrs):
 * - `width?:  string` the `px` or `%` of the window width to use, or 'auto' if omitted.
 * - `height?: string` the `px` or `%` of the window height to use, or 'auto' if omitted.
 * - `content: Vnode` the mithril node to show as content of the modal
 * - `dismiss: ()=>void` a function that is called when the modal box is dismissed
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let showModal = false;
 * m.mount(root, {view: () => m('.hs-white', [
 *      m('h4', {onclick:() => showModal = true }, 'click me'),
 *      showModal? m(hswidget.Modal, { 
 *          width:  '300px',
 *          height: '200px',
 *          dismiss: () => showModal = false,
 *          content: m('', 'click border to release') 
 *      }) : undefined
 *    ])
 * });
 * </file>
 * </example>
 */

 /** */
import { m, Vnode}  from 'hslayout'; 
import { ToolbarButton } from './ToolbarButton';

export class Modal {
    view(node:Vnode) {
        const w = node.attrs.width  || 'auto';
        const h = node.attrs.height || 'auto';
        const attrs = { style: `width:${w}; height:${h};`};
        return m('.hs-modal-frame', [
            m('.hs-modal-background', { onclick: node.attrs.dismiss}, ''),
            m('.hs-modal-foreground', attrs, !node.attrs.content? 'modal pane' : [
                node.attrs.content,
                m(ToolbarButton, { onclick: node.attrs.dismiss, symbols:ToolbarButton.getSymbol('cross') }) 
            ])
        ]);
    }
}
