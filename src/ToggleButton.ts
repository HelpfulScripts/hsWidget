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
 *        clicked: (item) => toggle = item
 *    }})
 * ])});
 * </file>
 * </example>
 * 
 */

/** */
import { m, Vnode }     from 'hslayout';
import { Selector }     from './Selector';

/**
 * # ToggleButton Widget
 * A button widget that toggle through a set of items, or states and 
 * shows the current state as button title
 * 
 * ### Profile
 * invoked as `m(ToggleButton, {desc: { items:[<string>], clicked:<function>}});`
 * 
 * ### Attributes (node.attrs):
 * - `desc:` see {@link Selector.SelectorDesc SelectorDesc}
 *     - `clicked:(item:string) => void` function to execute when button is selected
 *     - `selectedItem?: number|string` the currently selected item, by index or name
 *     - `items: string[]` names of individual states to toggle through
 *     - `itemCss?:string[]` css to apply to each item;
 * - `css?: string` css class to assign to button group
 * - `style?: string` style string to apply to button tag
 */
export class ToggleButton extends Selector {
    oninit(node:Vnode) {
        super.oninit(node);
        node.state.toggleIndex = -1;
        node.state.mouseDownCSS = '';
        node.state.mouseDown = () => node.state.mouseDownCSS = '.hs-button-pressed';
        node.state.mouseUp   = () => node.state.mouseDownCSS = '';
    }
    view(node: Vnode): Vnode {
        const desc = node.state.desc;
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';

        // insert click update into passed click function
        const parentChanged = desc.clicked;
        desc.clicked = ((item:string) => {
            node.state.toggleIndex = (node.state.toggleIndex+1) % desc.items.length;
            item = desc.items[node.state.toggleIndex];
            node.state.updateSelected(node.state.items, item); // internal state update
            if (parentChanged) { parentChanged(item); }
        });

        if (node.state.toggleIndex<0) { node.state.toggleIndex = 0; }


        return m(`.hs-toggle-button${css}${node.state.mouseDownCSS}`, { style:style}, m('span', 
            Selector.renderItem(node, node.state.toggleIndex)
        ));
    }
}