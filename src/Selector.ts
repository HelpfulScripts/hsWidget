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
 *     - clicked: (item:string) => void; // called upon user selection
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
    clicked: (item:string) => void;
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

/**
 * a function used to notify listeners of a selection event.
 * @param items the list of selectable items
 * @param title the name of the current selection
 */
export type selectionModel = (items:SelectableDesc[], title:string) => void;

/** 
 * called to update selection after the item with title `title` was selected.
 * `oneOfItems` ensures that `title` will be selected and all others deselected
 */
export function oneOfItems(items:SelectableDesc[], title:string):void {
    items.forEach((item:SelectableDesc) => { 
        item.isSelected = (item.title===title); 
    });
}

/** 
 * called to update selection after the item with title `title` was selected.
 * `anyItems` ensures that `title` will be selected independant of all others
 */
export function anyItems(items:SelectableDesc[], title:string):void {
    // if (!items[title]) { 
    //     console.log(`adding item ${title}`);
    //     items[title] = {isSelected: false};
    // }
    items[title].isSelected = !items[title].isSelected; 
}

export interface SelectorState {
    /** 
     * determines which function to use to updatye selections after events.
     * Pre-configured function include:
     * - oneOfItems: default; only one item of the set can be selected at a time
     * - anyItem: each item can individually be selected. Pressing an item again will deselect it.
     */
    updateSelected: selectionModel;
    /** instance variable, keeping a list of menu items and a `select` function for tracking which item is selected. */
    items: SelectableDesc[];
    events: (e:any)=>void;
}


/**
 * Abstract base class fopr menu and button selectors. 
 */
export abstract class Selector {
    /**
     * called when component is initialized, setting the internal state of the selector from
     * parameters passed in the `attrs` field. Currently supported attributes:
     * - clicked:   an event callback to notify of a click event; 
     * - mouseUp:   an event callback to notify of a mouseUp event; 
     * - mouseDown: an event callback to notify of a mouseDown event; 
     * @param node then node to be initiailized
     * @param model model to use for state update; either `oneOfItems` (the default) or `anyItems`
     */
    oninit(node: Vnode, model=oneOfItems) {
        node.state = <SelectorState>{
            updateSelected: model,
            items: <SelectableDesc[]>[],
            events: {}
        };
        const desc = node.attrs.desc;
        if (desc.mouseDown) { node.state.events.mouseDown = desc.mouseDown; }
        if (desc.mouseUp)   { node.state.events.mouseUp = desc.mouseUp; }
        if (desc.clicked)   { node.state.events.clicked = desc.clicked; }
        const items = node.attrs.desc.items || [];
        items.map((i:string) => {
            const item = {
                title: i, 
                isSelected: false 
            };
            node.state.items.push(item);
            node.state.items[i] = item;
        });
        if (node.attrs.defaultItem) { 
            node.state.updateSelected(node.state.items, node.attrs.defaultItem); 
        }
        node.attrs.desc.clicked = node.attrs.desc.clicked || ((item:string) => console.log(`missing clicked() function for selector item ${item}`));
    }

    /**
     * render an item of the Selector group
     * @param node the node holding the group state
     * @param desc the items descriptor
     * @param i index of item to render
     */
    protected static renderItem(node: Vnode, i:number) {
        const reactor = (callback:(itm:string)=>void) => (item:string) => {
            node.state.updateSelected(node.state.items, item); // internal state update
            if (typeof callback === 'function') { 
                callback(item);  // trigger any external actions from the selection
            }     
        }; 
        const item:SelectableDesc = node.state.items[i];
        const title:string = item.title || '';
        const itemCss = item.css || '';

        // Selector.checkSelectedItem(node, desc);
        return renderSelectable({ 
            title: title, 
            css: itemCss,        // possibly undefined
            // isSelected: node.state.selectedItem? (l.toLowerCase() === node.state.selectedItem.toLowerCase()) : false, 
            isSelected: node.state.items[title]? node.state.items[title].isSelected : false, 
            mouseDown: reactor(node.state.mouseDown),
            mouseUp: reactor(node.state.mouseUp),
            clicked: reactor(node.state.clicked)
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
export function renderSelectable(d:SelectableDesc) {
    const onclick       = d.clicked?   () => { d.clicked(d.title); }   : undefined;
    const onmousedown   = d.mouseDown? () => { d.mouseDown(d.title); } : undefined;
    const onmouseup     = d.mouseUp?   () => { d.mouseUp(d.title); }   : undefined;
    return m(`.hs-selectable ${d.css || ''} ${d.isSelected?'hs-selected': ''}`, 
        { style: d.style, onclick:onclick, onmousedown:onmousedown, onmouseup:onmouseup },
        d.title
    );
}
