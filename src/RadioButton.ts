/**
 * # Radio Button Widget
 * A simple radio button widget, allowing one button to be pressed at a time
 * 
 * ### Profile
 * invoked as `m(RadioButton, {name:<string>, onclick:<function>});`
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
 * let radio = '';
 * let toggle = '';
 * 
 * m.mount(root, {view: () => m('.hs-white', [
 *    m('h4', `Select Radio Station: ${radio}`),
 *    m(hswidget.RadioButtons, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        changed: (item) => radio = item
 *    }})
 * ])});
 * </file>
 * </example>
 * 
 */

/** */
import { m, Vnode }     from 'hslayout';
import { Layout }       from 'hslayout';
import { Selector }     from './Selector';
import { oneOfItems }   from './Selector';
import { SelectorDesc } from './Selector';

/**
 * # Radio Button Widget
 * A group of buttons with one or none selected
 * 
 * ### Profile
 * invoked as `m(RadioButton, {desc: { items:[<string>], changed:<function>}});`
 * 
 * ### Attributes (node.attrs):
 * - `desc:` see {@link Selector.SelectorDesc SelectorDesc}
 *     - `changed:(item:string) => void`    function to execute when button is selected
 *     - `selectedItem?: number|string`     the currently selected item, by index or name
 *     - `items: string[]`                  names to individual buttons to show
 *     - `itemCss?:string[]`                css to apply to each item;
 * - `css?: string`                         css class to assign to button group
 * - `style?: string`                       style string to apply to button tag
 */
export class RadioButton extends Selector {
    oninit(node:Vnode) {
        super.oninit(node);
        Selector.init(node, oneOfItems);
    }
    static viewGroup(css:string, node: Vnode) {
        const desc:SelectorDesc = node.attrs.desc;
        css = `${css} ${node.attrs.css || ''}`;
        const style = node.attrs.style || '';

        return m(css, {style:style}, m(Layout, {
            columns: [],
            content: desc.items.map((l:string, i:number) => Selector.renderItem(node, desc, i))
        }));
    }
    view(node: Vnode): Vnode { return RadioButton.viewGroup('.hs-radio-buttons', node); }
}

