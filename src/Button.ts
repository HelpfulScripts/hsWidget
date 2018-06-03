/**
 * # Button Widget
 * A simple button widget
 * 
 * ### Profile
 * invoked as `m(Button, {name:<string>, onclick:<function>});`
 * 
 * ### Attributes (node.attrs):
 * - `onclick:() => void` function to execute when button is clicked
 * - `name: string` name to show as button text
 * - `css: string` css class to assign to button tag
 * - `style: string` style string to apply to button tag
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let clicked = 0;
 * 
 * m.mount(root, {view: () => m('.hs-white', [
 *    m('h4', 'Please click:'),
 *    m(hswidget.Button, { desc: {
 *        name: 'click me',
 *        clicked: () => clicked++
 *    }}),
 * ])});
 * </file>
 * </example>
 * 
 */

/** */
import { Vnode }     from 'hslayout';
import { ToggleButton } from './ToggleButton';

/**
 * # Button Widget
 * A simple button widget
 * 
 * ### Profile
 * invoked as `m(Button, {name:<string>, onclick:<function>});`
 * 
 * ### Attributes (node.attrs):
 * attribtues as defined in {@link ToggleButton.ToggleButton `ToggleButton`}, 
 * except for `items` and `changed`, which are replaced by 
 * - `name: string` name to show as button text (in lieu of `items`)
 * - `clicked:() => void` function to execute when button is clicked
 */
export class Button extends ToggleButton {
    view(node: Vnode) {
        const desc = node.attrs.desc;
        desc.items = [desc.name || 'button'];
        desc.changed = desc.clicked;
        return super.view(node);
    }
}

