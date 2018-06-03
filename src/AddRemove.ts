/**
 * # AddRemove Buttons
 * Adds `+` and `-` buttons to add or remove items from a list.
 * 
 * ### Profile
 * invoked as 
 * ```
 *  m('div', [
 *      m('div', 'main content row'),
 *      m(AddButton, { onclick:<addFunction> })
 *  ]),
 * ```
 * 
 * ### Attributes (node.attrs):
 * - `onclick`: function to call when button is pressed 
 */

 /** */
import { m, Vnode}      from 'hslayout';

export class AddButton {
    view(node:Vnode):Vnode {
        return m('.hs-add-button', { onclick:node.attrs.onclick }, '');
    }
}

export class RemoveButton {
    view(node:Vnode):Vnode {
        return m('.hs-remove-button', { onclick:node.attrs.onclick }, '');
    }
}