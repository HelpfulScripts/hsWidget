export interface SelectorDesc {
    items: string[];
    itemCss?: string[];
    defaultItem?: string | number;
    changed: (item: string) => void;
    mouseDown?: (item: string) => void;
    mouseUp?: (item: string) => void;
}
export interface SelectableDesc {
    title: string;
    isSelected: boolean;
    css?: string;
    style?: string;
    clicked?: (item: string) => void;
    mouseDown?: (item: string) => void;
    mouseUp?: (item: string) => void;
}
export declare type selectFn = (items: {
    string: SelectableDesc;
}, title: string) => void;
export declare function oneOfItems(items: {
    string: SelectableDesc;
}, title: string): void;
export declare function anyItems(items: {
    string: SelectableDesc;
}, title: string): void;
export declare abstract class Selector {
    private updateSelected;
    protected selectedItem: string;
    private items;
    init(desc: SelectorDesc, updateSelected?: selectFn): SelectorDesc;
    checkSelectedItem(desc: SelectorDesc): void;
    internalStateUpdate(desc: SelectorDesc, item: string): void;
    renderItem(desc: SelectorDesc, i: number): any;
}
export declare function selectable(childDesc: SelectableDesc): any;
