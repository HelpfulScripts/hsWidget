/**
 * # Menu Widget
 * Creates a simple menu with several items.
 * 
 * ## Menu
 * shows a group of menu items but does not manage display of content. 
 * invoked as `m(Menu, <MenuAttrs>, <content>);`.
 * `<content>`: a `string[]` or `Vnode[]` that determines the menu button number and content.
 * 
 * ### Profile
 * When a button in the group is clicked, the `onclick` method is called with three parameters:
 * - the index (0, n-1) of the button clicked, 
 * - the new state of that button, 
 * - the array of all button states
 * 
 * ## MenuPanel
 * shows a group of menu items and manages the display of the corresponding children. 
 * invoked as `m(MenuPanel, <MenuAttrs>, <content>);`.
 * `<content>`: a `{button: }[]` array that determines the menu button number and content.
 * 
 * ### Profile
 * When a button in the group is clicked, the `onclick` method is called with three parameters:
 * - the index (0, n-1) of the button clicked, 
 * - the new state of that button, 
 * - the array of all button states
 * 
 * See {@link Menu.MenuAttrs MenuAttrs}
 * 
 * ### Menu Example
 * Creates a menu of items with a callback for changes in the menu selection. 
 * The calling program is responsible for acting on the changes, e.g. rendering them.
 * <example>
 * <file name='script.js'>
 * const items = ['One', 'Two', 'Three'];
 * const content   = ['1st', '2nd', '3rd'];
 * let  theContent = `default content: ${content[1]}`;
 * 
 * m.mount(root, {view: () => m('div', [
 *      m('div.mySeparate', 'inline menu example:'),
 *      m(hsWidget.Menu, {
 *          onclick: index => theContent = content[index] + ' content',
 *          initial: 1
 *      }, items),
 *      m('div.mySeparate', 'Content: not managed by `Menu`:'),
 *      m('.myMenuContent', theContent)
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
 * .hs_selectable { 
 *     background-color: #f4f4e8; 
 * }
 * .hs_selected { 
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
 *    menu: ["one", "two", "three"],  
 *    defaultItem: "two",
 *    content: ['1st', '2nd', '3rd'].map(c => `${c} managed by 'MenuPanel'`)
 * })});
 *
 * </file>
 * <file name='style.css'>
 * .hs_menu { 
 *     background-color: #eef; 
 * } 
 * .hs_menu-panel { 
 *     background-color: #dde; 
 * } 
 * .hs_selectable { 
 *     background-color: #f4f4e8; 
 * }
 * .hs_selected { 
 *     background-color: #eed; 
 *     border-width:0px;
 * }
 * </file>
 * </example>
 */

 /** */
import m                        from "mithril";
import { RadioButtons }         from './Optionbuttons';
import { RadioButtonsAttrs }    from './Optionbuttons';
import { Vnode, ViewResult }    from './Widget';
import { Widget }               from './Widget';
import { WidgetAttrs }          from './Widget';
import { GridRows }             from "./Grid";
import { GridAttrs }            from "./Grid";

/** the attritbutes accepted by a {@link Menu.Menu `Menu`} dialog. */
export interface MenuAttrs extends RadioButtonsAttrs {
    /** a function, called when the bitton is clicked */
    onclick: (buttonIndex:number, newState:number, states:number[])=>void;

    /** the initial state of the button */
    initial?: number;
}

/**
 * Creates a simple menu with several items and a callback for changes in the menu selection. 
 * The calling program is responsible for acting on the changes, e.g. rendering them.
 */
export class Menu extends RadioButtons {
    view(node: Vnode<MenuAttrs, this>):ViewResult {
        node.attrs.class = `${node.attrs.class? node.attrs.class:''} hs_menu`;
        return super.view(node);
    }
}


export interface MenuItem {
    menu: m.Child;
    content: m.Child;
}

/** the attritbutes accepted by a {@link Menu.MenuPanel `MenuPanel`} dialog. */
export interface MenuPanelAttrs extends WidgetAttrs {
    menu?: m.Child[];
    initial: number;
}


/**
 * Creates a compound horizontal menu with several items and a panel directly below the menu items.
 */
export class MenuPanel extends Widget {
    selected: number;
    change: (index:number) => void;
    oninit(node: Vnode<MenuPanelAttrs, this>) {
        node.state.selected = 0;
        node.state.change = (index:number) => node.state.selected = index;
    }
    view(node: Vnode<MenuPanelAttrs, this>):m.Children { 
        const children = <m.Child[]>node.children
        return m(GridRows, this.attrs<GridAttrs>(node.attrs, { template:'30px auto' }),[
            // the menu bar:
            m(Menu, <MenuAttrs>{
                onclick:node.state.change, 
                initial: node.attrs.initial || 0
            }, node.attrs.menu),
            // and the attached panel:
            children[node.state.selected]
        ]);
    }
}
