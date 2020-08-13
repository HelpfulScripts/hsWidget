/**
 * # Modal Widget
 * returns a modal Vnode with variable content. The `Modal's` background covers the entire window. 
 * 
 * ### Profile
 * invoked as `m(Modal, { <Attributes> }, content)`
 * 
 * ### Attributes (node.attrs): {@link Modal.ModalAttrs `ModalAttrs`}
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let dismissals = 0;
 * let modal = false;
 * m.mount(root, {view: () => m('.hs-white', [
 *      m('h4', {onclick:() => modal=true}, `click me (dismissed ${dismissals} times)`),
 *      !modal? m('') : m(hsWidget.Modal, { 
 *          dismiss: () => { dismissals++; modal = false; }
 *      }, m('', 'click border to release'))
 *    ])
 * });
 * </file>
 * </example>
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;

/** the attritbutes accepted by a {@link Modal.Modal `Modal`} dialog. */
export interface ModalAttrs {
    /** 
     * a function that will be called to dismiss the modal dialog. 
     * For example, clicking in the background will trigger a call to this function.
     */
    dismiss: ()=>void;
}

export class Modal {    
    view(node:Vnode) {
        return m('.hs-modal', [
            m('.hs-modal-background', { onclick: node.attrs.dismiss }),
            m('.hs-modal-foreground', [node.children])
        ]);
    }
}
