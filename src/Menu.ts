/**
 * # Menu Widget
 * Creates a simple menu with several items.
 * 
 * ### Profile
 * invoked as `m(Menu, { desc:<MenuDesc> })`
 * 
 * ### Attributes (node.attrs):
 * - `desc:` {@link Menu.MenuDesc MenuDesc}
 *     - `items: string[]`                  the items on the menu
 *     - `clicked: (item:string) => void`   called when item clicked
 *     - `defaultItem?: number|string`      the currently selected item, by index or name
 *     - `itemCSS?: string[]`               css to apply to items;
 * - `css?: string`                         css class to assign to button group
 * - `style?: string`                       style string to apply to button tag
 * - `size?: string | string[]`             sizes to layout menu items; 
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * const items = ['One', 'Two', 'Three'];
 * const content   = ['1st', '2nd', '3rd'];
 * let  theContent = content[1];
 * 
 * m.mount(root, {view: () => m(hsLayout.Layout, {
 *     rows:["30px", "fill"],
 *     content:[
 *         m(hsWidget.Menu, {desc: {
 *             items: items,
 *             defaultItem: 'Two',
 *             clicked: item => 
 *                theContent = content[items.indexOf(item)]
 *         }}),
 *         m(hsLayout.Layout, { css:'myMain', content: theContent })
 *     ]
 * })});
 *
 * </file>
 * <file name='style.css'>
 * .myMain { 
 *    border:1px solid #ddd;
 *    border-top: 0px solid #ddd;
 * } 
 * .hs-selectable { 
 *     background-color: #f4f4e8; 
 * }
 * .hs-selected { 
 *     background-color: #eed; 
 *     border-width:0px;
 * }
 * </file>
 * </example>
 */

 /** */
import { Vnode }        from './mithril';
import { RadioButton }  from './RadioButton';


/**
 * Creates a simple menu with several items, as configured by the desc:SelectorDesc object passed as a parameter. 
 */
export class Menu extends RadioButton {
    view(node: Vnode): Vnode { return RadioButton.viewGroup('.hs-menu', node); }
}
