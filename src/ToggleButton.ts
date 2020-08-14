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
 *    m(hsWidget.ToggleButton, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        clicked: (item) => toggle = item
 *    }})
 * ])});
 * </file>
 * </example>
 * 
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import { Selector, SelectableDesc, SelectorAttrs } from './Selector';


export interface ToggleButtonAttrs extends SelectorAttrs {
    /** the css style to apply */
    css: string;
    /** an explicit style string to apply */
    style: string;
}
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
    mouseDownCSS = '';

    oninit(node:Vnode) {
        super.oninit(node);
        node.state.mouseDown = () => this.mouseDownCSS = '.hs-button-pressed';
        node.state.mouseUp   = () => this.mouseDownCSS = '';
        node.state.itemClicked= (title:string):string => {
            const i = node.state.items.map((i:SelectableDesc)=> i.title).indexOf(title);
            const newTitle = node.state.items[(i+1) % node.state.items.length].title;
            node.state.items[title].isSelected = false;
            node.state.items[newTitle].isSelected = true;
            return newTitle;
        };
    }

    view(node: Vnode): Vnode {
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const i = node.state.items.findIndex((i:SelectableDesc) => i.isSelected);

        return m(`.hs-toggle-button ${css} ${node.state.mouseDownCSS}`, { style:style}, m('span', 
            this.renderItem(node, i)
        ));
    }
}