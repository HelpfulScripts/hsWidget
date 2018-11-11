/**
 * # Abstract Selector
 * Creates a Selector with several Selectables.
 * The `updateSelected` property determines how selecting an item affects 
 * the `isSelected` status of all other items. Preconfigured options are
 * -&nbsp; {@link Selector.oneOfItems oneOfItems} allows only one selection at a time
 * -&nbsp; {@link Selector.anyItems   anyItems} allows mutliple selections
 * 
 * 
 * ### Invocation
 * implementation dependant
 * 
 * ### Attributes (node.attrs):
 * - desc: {@link Selector.SelectorDesc SelectorDesc}
 *     - items: string[];                // the items on the selector
 *     - defaultItem?: number|string;    // the initial selected item, by index or name
 *     - changed: (item:string) => void; // called when selection changed
 *     - itemCss?:string[];              // css to apply to items;
 */

 /** */
import { m, Vnode } from 'hslayout';

/** passed into Menu from the calling application */
export interface SelectorDesc {
    /** the items on the menu */
    items: string[];
    /** optional array of css styles; each will be applied to the respective item  */
    itemCss?: string[];
    /** the initial selected item */
    defaultItem?: string|number;
    /** the function to call when the selection changes */
    changed: (item:string) => void;
    /** the function to call if this item receives a mouseDown event */
    mouseDown?: (item:string) => void;
    /** the function to call if this item receives a mouseUp event */
    mouseUp?: (item:string) => void;
}

/** interface of the parameter passed to a `Selectable` */
export interface SelectableDesc {
    /** the item's title */
    title: string;
    /** the item's select status */
    isSelected: boolean;
    /** optional css class to use */
    css?: string;
    /** optional style string to apply */
    style?: string;
    /** the function to call if this item is clicked */
    clicked?: (item:string) => void;
    /** the function to call if this item receives a mouseDown event */
    mouseDown?: (item:string) => void;
    /** the function to call if this item receives a mouseUp event */
    mouseUp?: (item:string) => void;
}

export type selectFn = (items:{string:SelectableDesc}, title:string) => void;

/** 
 * called to update selection after the item with title `title` was selected.
 * `oneOfItems` ensures that `title` will be selected and all others deselected
 */
export function oneOfItems(items:{string:SelectableDesc}, title:string):void {
    Object.keys(items).forEach((key:string) => { 
        items[key].isSelected = (key===title); 
    });
}

/** 
 * called to update selection after the item with title `title` was selected.
 * `anyItems` ensures that `title` will be selected independant of all others
 */
export function anyItems(items:{string:SelectableDesc}, title:string):void {
    if (!items[title]) { 
        console.log(`adding item ${title}`);
        items[title] = {isSelected: false};
    }
    items[title].isSelected = !items[title].isSelected; 
}


/**
 * Creates a simple menu with several items, as configured by the desc:SelectorDesc object passed as a parameter. 
 */
export abstract class Selector {
    oninit(node: Vnode) {
        node.state = {
            /** 
             * determines which function to use to updatye selections after events.
             * Pre-configured function include:
             * - oneOfItems: default; only one item of the set can be selected at a time
             * - anyItem: each item can individually be selected. Pressing an item again will deselect it.
             */
            updateSelected: [oneOfItems, anyItems][0],
            // selectedItem: <string>undefined,
            /** instance variable, keeping a list of menu items and a `select` function for tracking which item is selected. */
            items: <{string:SelectableDesc}>{},
        };
        node.attrs.desc.items.map((i:string) => node.state.items[i] = {
            title: i, 
            isSelected: false 
        });
    }

    static init(node: Vnode, updateSelected:selectFn = oneOfItems):SelectorDesc {
        const desc:SelectorDesc = node.attrs.desc;
        node.state.updateSelected = updateSelected;
        desc.items = desc.items || [];
        desc.changed = desc.changed || ((item:string) => console.log(`missing changed() function for menu item ${item}`));
        // Selector.checkSelectedItem(node, desc);
        return desc;
    };

    /** ensures that `selectedItem` is defined and is a string */
    // static checkSelectedItem(node: Vnode, desc:SelectorDesc) {
    //     if (node.state.selectedItem === undefined) {
    //         if (typeof desc.defaultItem === 'number') { 
    //             node.state.selectedItem = desc.items[desc.defaultItem % desc.items.length];
    //         } else {
    //             node.state.selectedItem = desc.defaultItem || desc.items[0];
    //         }
    //     }
    // }

    static internalStateUpdate(node: Vnode, item:string) {
        // node.state.selectedItem = item;
        // Selector.checkSelectedItem(node, desc);
        node.state.updateSelected(node.state.items, item); // local housekeeping: make sure the item's style shows correct selection
    }

    /**
     * render an item of the Selector group
     * @param node the node holding the group state
     * @param desc the items descriptor
     * @param i index of item to render
     */
    static renderItem(node: Vnode, desc:SelectorDesc, i:number) {
        const reactor = (callback:(itm:string)=>void) => (item:string) => {
            Selector.internalStateUpdate(node, item);
            if (typeof callback === 'function') { 
                callback(item);  // trigger any actions from the selection
            }     
        }; 
        const title:string = desc.items[i] || '';
        const itemCss = desc.itemCss || [];

        // Selector.checkSelectedItem(node, desc);
        return selectable({ 
            title: title, 
            css: itemCss[i],        // possibly undefined
            // isSelected: node.state.selectedItem? (l.toLowerCase() === node.state.selectedItem.toLowerCase()) : false, 
            isSelected: node.state.items[title]? node.state.items[title].isSelected : false, 
            mouseDown: reactor(desc.mouseDown),
            mouseUp: reactor(desc.mouseUp),
            clicked: reactor(desc.changed)
        });
    }
    abstract view(node: Vnode): Vnode;
};

/**
 * Creates a Selectable as part of the `Selector`, 
 * as configured by the desc:SelectableDesc object passed as a parameter.
 * Selectables can be in one of two states, selected or not selected. 
 * @return an `.hs-selectable` node
 */
export function selectable(childDesc:SelectableDesc) {
    const css           = childDesc.css || '';
    const cssSelected   = `${childDesc.isSelected?'hs-selected': ''}`;
    const onclick       = childDesc.clicked?   () => { childDesc.clicked(childDesc.title); }   : undefined;
    const onmousedown   = childDesc.mouseDown? () => { childDesc.mouseDown(childDesc.title); } : undefined;
    const onmouseup     = childDesc.mouseUp?   () => { childDesc.mouseUp(childDesc.title); }   : undefined;
    return m(`.hs-selectable ${css} ${cssSelected}`, 
        { style: childDesc.style, onclick:onclick, onmousedown:onmousedown, onmouseup:onmouseup },
        childDesc.title
    );
}
