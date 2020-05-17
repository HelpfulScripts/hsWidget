/**
 * # Abstract Selector
 * Creates a Selector with several Selectables.
 * The `updateModel` property determines how selecting an item affects 
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
import { Log }      from 'hsutil'; const log = new Log('Selector');
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
export type selectionModel = (items:SelectableDesc[], title:string) => SelectableDesc;

/** 
 * called to update selection after the item with title `title` was selected.
 * `oneOfItems` ensures that `title` will be selected and all others deselected
 */
export function oneOfItems(items:SelectableDesc[], title:string):SelectableDesc {
    if (items.length) {
        items.forEach((item:SelectableDesc) => { 
            item.isSelected = (item.title===title); 
        });
        if (items[0] && !items.some((item:SelectableDesc) => item.isSelected)) { 
            items[0].isSelected = true; 
        }
        return items.filter((item:SelectableDesc) => item.isSelected)[0];
    }
    return undefined;
}

/** 
 * called to update selection after the item with title `title` was selected.
 * `anyItems` ensures that `title` will be selected independant of all others
 */
export function anyItems(items:SelectableDesc[], title:string):SelectableDesc {
    if (items[title]) {
        items[title].isSelected = !items[title].isSelected; 
        return items[title];
    }
    return undefined;
}

export interface SelectorState {
    /** 
     * determines which function to use to updatye selections after events.
     * Pre-configured function include:
     * - oneOfItems: default; only one item of the set can be selected at a time
     * - anyItem: each item can individually be selected. Pressing an item again will deselect it.
     */
    updateModel: selectionModel;
    /** instance variable, keeping a list of menu items and a `select` function for tracking which item is selected. */
    items: SelectableDesc[];
    events: (e:any)=>void;
    itemClicked?: (item:string) => string;
    defaultItem?: string;
}


/**
 * Abstract base class fopr menu and button selectors. 
 */
export abstract class Selector {
    /**
     * takes care of copying menu items from `attrs` to `state`. This generates a redraw when the items change
     * @param node 
     */
    updateItems(node:Vnode) {
        const items = node.attrs.desc.items || [];
        items.map((itm:string, i:number) => {
            const item = node.state.items[itm] || {
                title: itm, 
                isSelected: false 
            };
           node.state.items[i] = item;
           node.state.items[''+itm] = item;
        });
        if (node.state.length > items.length) {
            log.warn(`avoid numeric selectors: ${items.join(', ')}`);
        }
    }

    /**
     * called when component is initialized, setting the internal state of the selector from
     * parameters passed in the `attrs` field. Currently supported attributes:
     * - clicked:   an event callback to notify of a click event; 
     * - mouseUp:   an event callback to notify of a mouseUp event; 
     * - mouseDown: an event callback to notify of a mouseDown event; 
     * @param node then node to be initiailized
     * @param model model to use for state update; either `oneOfItems` (the default) or `anyItems`
     */
    init(node: Vnode, model=oneOfItems) {
        node.state.updateModel = model;
        node.state.items = <SelectableDesc[]>[];
        node.state.itemClicked = (item:string) => item;
        // node.state.defaultItem = node.attrs.desc.defaultItem;
        node.state.mouseDown = node.attrs.desc.mouseDown;
        node.state.mouseUp   = node.attrs.desc.mouseUp;
        node.state.clicked   = node.attrs.desc.clicked || ((item:string) => console.log(`missing clicked() function for selector item ${item}`));
        this.updateItems(node);
    }

    oninit(node: Vnode) { 
        this.init(node); 
    }
    onupdate(node: Vnode) { 
        if (node.attrs.desc.defaultItem) { node.state.updateModel(node.state.items, node.attrs.desc.defaultItem); }
        this.ensureSelected(node);
        this.updateItems(node); 
    }

    /**
     * ensures that at least one item is selected. If none is selected,
     * 
     * @param node 
     */
    protected ensureSelected(node: Vnode) {
        if(node.state.items && !node.state.items.some((i:SelectableDesc) => i.isSelected) &&node.state.items.length>0) { 
            if (node.attrs.desc.defaultItem &&node.state.items[node.attrs.desc.defaultItem]) { 
               node.state.items[node.attrs.desc.defaultItem].isSelected = true; 
            } else if (node.state.items[0]) { 
               node.state.items[0].isSelected = true; 
            } 
        }
    }


    /**
     * render an item of the Selector group
     * @param node the node holding the group state
     * @param i index of item to render
     */
    protected renderItem(node: Vnode, i:number) {
        const reactor = (callback:(itm:string)=>void) => (title:string) => {
            node.state.updateModel(node.state.items, title); // internal state update
            title = node.state.itemClicked(title);
            if (typeof callback === 'function') { 
                callback(title);  // trigger any external actions from the selection
            }     
        }; 
        if (i<0) { log.debug(()=>`illegal render index ${i} ${node.state.items.map((i:any)=>i.title).join('|')}`); i = 0; }
        const item:SelectableDesc = node.state.items[i];
        const title:string = item? item.title : '';
        const itemCss      = item? item.css : '';

        // Selector.checkSelectedItem(node, desc);
        return renderSelectable({ 
            title: title, 
            css: itemCss,        // possibly undefined
            isSelected:(node.state.items && node.state.items[title])?node.state.items[title].isSelected : false, 
            mouseDown:node.state.mouseDown,
            mouseUp:node.state.mouseUp,
            clicked: reactor(node.state.clicked)
        });
    }
    abstract view(node: Vnode): Vnode;
}

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
