/**
 * # Modal widget
 * returns a modal Vnode with variable content. The `Modal's` background covers the entire window. 
 * 
 * ### Profile
 * invoked as `m(Modal, { <ModalAttrs> }, content)`.
 * 
 * See {@link Modal.ModalAttrs ModalAttrs}
 * 
 * ### Example
 * <example><file name='script.js'>ximport='Modal.x.js'</file></example>
 */

/** */
import m                from 'mithril';
import { Vnode }        from './Widget';
import { Widget }       from './Widget';
import { WidgetAttrs }  from './Widget';

/** the attritbutes accepted by a {@link Modal.Modal `Modal`} dialog. */
export interface ModalAttrs extends WidgetAttrs {
    /** 
     * a function that will be called to dismiss the modal dialog. 
     * For example, clicking in the background will trigger a call to this function.
     */
    dismiss: ()=>void;

    /** optional way of showing or hiding a `Modal` until it is needed: */
    showModal?: ()=>boolean;
}


export class Modal extends Widget {    
    /** if `true`, the Modal dialog will be shown; otherwise hidden. */
    showModal: boolean;

    /** will hide the Modal dialog if it is visible. */
    hide: ()=>void;
    oninit(node:Vnode<ModalAttrs, this>) {
        node.state.showModal = false;
        node.state.hide = () => node.state.showModal = false;
    }
    view(node:Vnode<ModalAttrs, this>) {
        // visibility is controlled by showModal, or explicitely in user function
        node.state.showModal = node.attrs.showModal? node.attrs.showModal() : true;
        return !node.state.showModal? m('.hs_no_modal') : m('.hs_modal', this.attrs(node.attrs), [
            m('.hs_modal_background', { onclick: () => {
                node.state.hide();
                node.attrs.dismiss(); 
            }}),
            m('.hs_modal_foreground', node.children)
        ]);
    }
}
