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
 * - `dismiss: () => void` an optional function that is called when the modal box is dismissed.
 * - `setTrigger: (trigger:()=>void)=>void` required; a function that that receives a trigger function 
 *      to be called in order to trigger the modal box. See below for an implementation example.
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let dismissals = 0;
 * let trigger;
 * m.mount(root, {view: () => m('.hs-white', [
 *      m('h4', {onclick:() => trigger()}, `click me (dismissed ${dismissals} times)`),
 *      m(hsWidget.Modal, { 
 *          setTrigger: (t) => trigger = t,
 *          width:  '300px',
 *          height: '200px',
 *          dismiss: () => dismissals++,
 *          content: m('', 'click border to release') 
 *      })
 *    ])
 * });
 * </file>
 * </example>
 */

 /** */
import { m, Vnode}  from 'hslayout'; 
import { ToolbarButton } from './ToolbarButton';

export class Modal {    
    oninit(node:Vnode) {
        node.state.id = Math.floor(Math.random()*1000);
        node.state.showModal = false;
    }
    view(node:Vnode) {
        const trigger = () => {
            node.state.showModal = true;
            m.redraw();
        };
        const dismiss = () => {
            node.state.showModal = false;
            if (node.attrs.dismiss) { node.attrs.dismiss(); }
        };
        const w = node.attrs.width  || 'auto';
        const h = node.attrs.height || 'auto';
        const attrs = { style: `width:${w}; height:${h};`};
        if (node.attrs.setTrigger) { node.attrs.setTrigger(trigger); }
        else { console.log(`required attribute function 'setTrigger' is not defined`); }
        return !node.state.showModal? m('span') : m('.hs-modal-frame', [
            m('.hs-modal-background', { onclick: dismiss}, ''),
            m('.hs-modal-foreground', attrs, !node.attrs.content? 'modal pane' : [
                node.attrs.content,
                m(ToolbarButton, { onclick: dismiss, symbols:ToolbarButton.getSymbol('cross') }) 
            ])
        ]);
    }
}
