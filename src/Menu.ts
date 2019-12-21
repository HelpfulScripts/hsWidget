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
 * ### Menu Example
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
 * 
 * ### MenuPanel Example
 * <example>
 * <file name='script.js'>
 * m.mount(root, {view: () => m(hsWidget.MenuPanel, {
 *    items: ["one", "two", "three"],  
 *    defaultItem: "two",
 *    content: ['1st', '2nd', '3rd']
 * })});
 *
 * </file>
 * <file name='style.css'>
 * .hs-menu { 
 *     background-color: #eef; 
 * } 
 * .hs-menu-panel { 
 *     background-color: #dde; 
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
import { m, Vnode }     from 'hslayout';
import { Layout }       from 'hslayout';
import { RadioButton }  from './RadioButton';


/**
 * Creates a simple menu with several items, as configured by the desc:SelectorDesc object passed as a parameter. 
 * 
 * Call as: 
 * ```
 * m(Menu, {desc: {
 *    items: ['One', 'Two', 'Three'],
 *    defaultItem: 'Two',
 *    clicked: item => ...  // set the maoin panel content for `item`
 * }})
 * ```
 */
export class Menu extends RadioButton {
    view(node: Vnode): Vnode {
        this.onupdate(node); 
        return RadioButton.viewGroup('.hs-menu', node); 
    }
}

/**
 * Creates a compound horizontal menu with several items and a panel directly below the menu items.
 * 
 * Call as: 
 * ```
 * m(MenuPanel, {
 *    items: ['One', 'Two', 'Three'],
 *    defaultItem: 'Two',
 *    content: [
 *      m('div', 'Main One'),
 *      m('div', 'Main One'),
 *      m('div', 'Main One')
 *    ]
 * })
 * ```
 */
export class MenuPanel extends Layout {
    private selected:number;
    oninit(node: Vnode) {
        this.selected = node.attrs.items.indexOf(node.attrs.defaultItem);
    }
    view(node: Vnode): Vnode { 
        let items = node.attrs.items;
        return m(Layout, {
            rows:["30px", "fill"],
            content:[
                m(Menu, { desc: {
                    items: items,
                    defaultItem: node.attrs.defaultItem,
                    clicked: (item:string) => this.selected = items.indexOf(item)
                }}),
                m(Layout, { css:'.hs-menu-panel', content: node.attrs.content[this.selected] })
            ]
        });
    }
}
