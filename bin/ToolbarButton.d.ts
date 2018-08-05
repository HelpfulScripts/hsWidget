import { Vnode } from 'hslayout';
export declare const ButtonSymbols: {
    cross: {
        sym: string;
    };
    minus: {
        sym: string;
    };
    plus: {
        sym: string;
    };
    dLeft: {
        sym: string;
    };
    dRight: {
        sym: string;
    };
    left: {
        sym: string;
    };
    right: {
        sym: string;
    };
    leftTri: {
        sym: string;
    };
    rightTri: {
        sym: string;
    };
    upTri: {
        sym: string;
    };
    downTri: {
        sym: string;
    };
    up: {
        sym: string;
    };
    down: {
        sym: string;
    };
    lArrow: {
        sym: string;
    };
    rArrow: {
        sym: string;
    };
    uArrow: {
        sym: string;
    };
    dArrow: {
        sym: string;
    };
    empty: {
        sym: string;
    };
    emptySlash: {
        sym: string;
    };
    oSlash: {
        sym: string;
    };
    o: {
        sym: string;
    };
    lines3: {
        sym: string;
    };
    sum: {
        sym: string;
    };
    ellipsis: {
        sym: string;
    };
    vertEllips: {
        sym: string;
    };
    bullet: {
        sym: string;
    };
    enter: {
        sym: string;
    };
    again: {
        sym: string;
    };
    start: {
        sym: string;
    };
    end: {
        sym: string;
    };
};
export declare class ToolbarButton {
    protected symbols: string;
    constructor(symbols?: string);
    static getSymbol(name: string): any;
    view(node: Vnode): any;
}
