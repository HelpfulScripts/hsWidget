/**
 * # Options Button Widget
 * A simple options button widget, allowing any button to be pressed indpendently of others.
 * 
 * ### Profile
 * invoked as `m(OptionsButton, {name:<string>, onclick:<function>});`
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
 * let option = '';
 * 
 * m.mount(root, {view: () => m('.hs-white', [
 *    m('h4', `Select Option: ${option}`),
 *    m(hswidget.OptionsButtons, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        changed: (item) => option = item
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
import { anyItems }     from './Selector';
import { SelectorDesc } from './Selector';

/**
 * # Options Button Widget
 * A group of buttons with one or more selected
 * 
 * ### Profile
 * invoked as `m(OptionsButton, {desc: { items:[<string>], changed:<function>}});`
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
export class OptionsButton extends Selector {
    static viewGroup(css:string, node: Vnode) {
        const desc:SelectorDesc = Selector.init(node, anyItems);
        css = `${css} ${node.attrs.css || ''}`;
        const style = node.attrs.style || '';

        return m(css, {style:style}, m(Layout, {
            columns: [],
            content: desc.items.map((l:string, i:number) => Selector.renderItem(node, desc, i))
        }));
    }
    view(node: Vnode): Vnode { return OptionsButton.viewGroup('.hs-options-buttons', node); }
}

