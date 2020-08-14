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
 * <file name='script.js'>ximport='Modal.x.js'</file>
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
    /** optional way of hiding a `Modal` until it is needed: */
    hideModal?: boolean
}

export class Modal {    
    view(node:Vnode) {
        const hidden = typeof node.attrs.hideModal === 'function'? node.attrs.hideModal() : typeof node.attrs.hideModal;
        return hidden? m('.hs_no_modal') : m('.hs_modal', [
            m('.hs_modal_background', { onclick: node.attrs.dismiss }),
            m('.hs_modal_foreground', [node.children])
        ]);
    }
}
