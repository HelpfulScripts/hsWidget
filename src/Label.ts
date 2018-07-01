/**
 * # Label Widget
 * Shows a text label
 * 
 * ### Profile
 * invoked as `m(Label, {text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `name: string` name to show as button text
 * - `css: string` css class to assign to button tag
 * - `style: string` style string to apply to button tag
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * m.mount(root, {view: () => m(hswidget.Label, {
 *      css: '.myLabel', 
 *      style: 'text-align: right;',
 *      text: 'This is a <b>label</b>'
 * })});
 * </file>
 * <file name='style.css'>
 * .myLabel {  
 *    background-color: white; 
 *    margin: 5px;
 * }
 * </file>
 * </example>
 * 
 */

/** */
import { m, Vnode }     from 'hslayout';

/**
 * # Label 
 * A text label
 * 
 * ### Profile
 * invoked as `m(Label, {text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `text?: string` the label text; 
 */
export class Label {
    view(node: Vnode): Vnode { 
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const text  = node.attrs.text || 'unspecified';
        return m(`.hs-label ${css}`, { style:style }, m.trust(text)); 
    }
}

