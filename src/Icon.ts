/**
 * # Icon Widget
 * Shows an icon with optional text label
 * 
 * ### Profile
 * invoked as `m(Icon, {mdi:<string> , text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `text: string` name to show as button text
 * - `mdi: string` MDI icon name (see: https://materialdesignicons.com/)
 * - `css: string` css class to assign to button tag
 * - `style: string` style string to apply to button tag
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * m.mount(root, {view: () => m(hsWidget.Label, {
 *      css: '.myLabel', 
 *      style: 'text-align: right;',
 *      text: 'This is a <b>label</b>',
 *      mdi: 'leaf'
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
 * # Icon 
 * An MDI icon with text
 * 
 * ### Profile
 * invoked as `m(Icon, {mdi:<string>, text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `text?: string` the label text; 
 */
export class Icon {
    view(node: Vnode): Vnode { 
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const text  = node.attrs.text || 'unspecified';
        const mdi   = node.attrs.mdi;
        return m(`.hs-label ${css}`, { style:style }, m.trust(text)); 
    }
}

