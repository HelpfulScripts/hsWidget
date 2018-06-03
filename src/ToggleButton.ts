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
 * let radio = '';
 * let toggle = '';
 * 
 * m.mount(root, {view: () => m('.hs-white', [
 *    m('h4', `Please Toggle: (currently ${toggle})`),
 *    m(hswidget.ToggleButton, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        changed: (item) => toggle = item
 *    }})
 * ])});
 * </file>
 * </example>
 * 
 */

/** */
import { m, Vnode }     from 'hslayout';
import { Selector }     from './Selector';
import { oneOfItems }   from './Selector';

/**
 * # ToggleButton Widget
 * A button widget that toggle through a set of items, or states and 
 * shows the current state as button title
 * 
 * ### Profile
 * invoked as `m(ToggleButton, {desc: { items:[<string>], changed:<function>}});`
 * 
 * ### Attributes (node.attrs):
 * - `desc:` see {@link Selector.SelectorDesc SelectorDesc}
 *     - `changed:(item:string) => void` function to execute when button is selected
 *     - `selectedItem?: number|string` the currently selected item, by index or name
 *     - `items: string[]` names of individual states to toggle through
 *     - `itemCss?:string[]` css to apply to each item;
 * - `css?: string` css class to assign to button group
 * - `style?: string` style string to apply to button tag
 */
export class ToggleButton extends Selector {
    private toggleIndex = -1;
    private mouseDown = '';
    view(node: Vnode): Vnode {
        const desc = this.init(node.attrs.desc, oneOfItems);
        node.attrs.desc = undefined;
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';

        // insert click update into passed click function
        const parentChanged = desc.changed;
        desc.changed = ((item:string) => {
            this.toggleIndex = (this.toggleIndex+1) % desc.items.length;
            item = desc.items[this.toggleIndex];
            this.internalStateUpdate(desc, item);
            if (parentChanged) { parentChanged(item); }
        });

        if (this.toggleIndex<0) { this.toggleIndex = 0; }

        desc.mouseDown = () => this.mouseDown = '.hs-button-pressed';
        desc.mouseUp   = () => this.mouseDown = '';

        return m(`.hs-toggle-button${css}${this.mouseDown}`, { style:style}, m('span', 
            this.renderItem(desc, this.toggleIndex)
        ));
    }
}