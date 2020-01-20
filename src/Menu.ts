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
 * - `sizes?: string[]`                     sizes to layout menu items; 
 * 
 * ### Menu Example
 * Creates a menu of items with a callback for changes in the menu selection. 
 * The calling program is responsible for acting on the changes, e.g. rendering them.
 * <example>
 * <file name='script.js'>
 * const items = ['One', 'Two', 'Three'];
 * const content   = ['1st', '2nd', '3rd'];
 * let  theContent = `default content: ${content['2nd']}`;
 * 
 * m.mount(root, {view: () => m('div', [
 *      m('div.mySeparate', 'inline menu example:'),
 *      m(hsWidget.Menu, {
 *          desc: {
 *              items: items,
 *              defaultItem: 'Two',
 *              clicked: item => 
 *                  theContent = content[items.indexOf(item)] + ' content'
 *          },
 *          sizes: ['60px', 'fill']
 *      }),
 *      m('div.mySeparate', 'Content: not managed by `Menu`:'),
 *      m(hsLayout.Layout, { 
 *          css:'myMenuContent', 
 *          content: theContent 
 *      })
 * ])});
 *
 * </file>
 * <file name='style.css'>
 * .mySeparate { 
 *    background-color: #eee;
 *    padding: 5px;
 * }
 * .myMenuContent { 
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
 * Self-contained `Menu` with content panel. 
 * <example>
 * <file name='script.js'>
 * m.mount(root, {view: () => m(hsWidget.MenuPanel, {
 *    items: ["one", "two", "three"],  
 *    defaultItem: "two",
 *    content: ['1st', '2nd', '3rd'].map(c => `${c} managed by 'MenuPanel'`)
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
 * Creates a simple menu with several items and a callback for changes in the menu selection. 
 * The calling program is responsible for acting on the changes, e.g. rendering them.
 * ### node attributes:
 * - desc:
 *     - items: `string[]` the menu items to render
 *     - defaultItem?: `numer|string` optional default item, either as index in `items` 
 *       or directly as the content of an element in `items`
 *     - clicked: `(item:string) => void` a callback for when a menu item was clicked. 
 *       `Menu` takes care of updating the menu items and the calling 
 *       program needs to react to the change in any further rendering of content.
 *     - itemCSS?: `string[]`  optional item-wise css styles to apply.
 * - css?:   `string`   optional css style to apply to the menu bar
 * - style?: `string`   optional styles to apply to each menu item
 * - sizes?: `string[]` optional width settings to pass to the menu `Layout`.
 * 
 * #### Call as: 
 * ```
 * m(Menu, {desc: {
 *    items: ['One', 'Two', 'Three'],
 *    defaultItem: 'Two',
 *    clicked: item => ...  // callback to set the main panel content for `item`
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
 * ### node attributes:
 * - items: `string[]` menu items to render
 * - defaultItem: `number|string` the item, or its index in `items` to select by default
 * - content: `node[]` array of contents to show, must be the same length as `items`
 * - css?: `string` optional css style to apply to the menu bar
 * - style?: `string` optional styles to apply to each menu item
 * - sizes?: `string[]` optional width settings to pass to the menu `Layout`.
 * 
 * #### Call as: 
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
                m(Menu, { 
                    desc: {
                        items: items,
                        defaultItem: node.attrs.defaultItem,
                        clicked: (item:string) => this.selected = items.indexOf(item)
                    },
                    css: node.attrs.css,        // possibly undefined
                    style: node.attrs.style,    // possibly undefined
                    sizes: node.attrs.sizes     // possibly undefined
                }),
                m(Layout, { css:'.hs-menu-panel', content: node.attrs.content[this.selected] })
            ]
        });
    }
}
