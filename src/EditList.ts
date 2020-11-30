/**
 * # EditList
 * Creates an auto-extending list of editable rows. The widget is simple to apply yet highly configurable
 * even to more complex situations. See examples below.
 * 
 * ### Profile
 * invoked as `m(EditList, { <EditListAttrs> }, <content>)`.
 * 
 * See {@link EditList.EditListAttrs EditListAttrs}
 * `<content>`: {@link EditList.Row 'Row[]`} array of the row data to be rendered. Each row data will be 
 * provided to calls of `rowRender`.`EditList` ensures that there is always an 
 * empty row at the end of list so it can be extended 
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * ximport='EditList.x.js'
 * </file>
 * <file name='style.css'>
 * .myList {  
 *    border: 1px solid #aaf; 
 *    margin: 5px;
 * }
 * .myListElement {
 *    display: inline-block;
 *    width: 100%;
 * }
 * h4 {
 *    padding-left:5px;
 * }
 * </file>
 * </example>
 */

/** */
import m from "mithril";
import { Log }          from 'hsutil';  const log = new Log('EditList');
import { EditLabel }    from './EditLabel';
import { Collapsible }  from './Collapsible';
import { Widget }       from "./Widget";
import { WidgetAttrs }  from "./Widget";
import { Vnode }        from "./Widget";

interface IsTest { (val:ListRow): boolean; }

export interface RowRender { (row:ListRow, rowNum:number): m.Children; }

/** semantic type alias for the `row` data structure. */
export type ListRow = any | any[];      // m.Children;

/** 
 * the default `isEmpty` test: returns true if either `row` is undefined, or if its length is 0 or undefined.
 * This test matches situations where the row is a simple `string`, or an `array` of `any`s.
 */
const defIsEmpty:IsTest = (row:ListRow) => (!row || !row.length || row==='')? true : false;

/**
 * returns the default row-`render` function: 
 * - if `row` is an array or an object literal, turn each element into an `EditLabel`
 * - otherwise treat `row` as a primitive and turn it into an EditLabel.  
 */
const defaultRender = (rows:ListRow[]):RowRender =>  {
    return (row:ListRow, rowNum:number):m.Children => {
        if ((<m.ChildArray>row).map) {
            return (<m.ChildArray>row).map((e:string, i:number) => m(EditLabel, {
                placeholder: 'add...',
                update: (newValue:string) => row[i] = newValue
            }, e));
        } else if (typeof row === 'object') { // an object literal
            return Object.keys(row).map((e:string) => m(EditLabel, {
                placeholder: 'add...',
                update: (newValue:string) => row[e] = newValue
            }, row[e]));
        } else { // a primitive
            return m(EditLabel, {
                placeholder: 'add...',
                update: (newValue:string) => rows[rowNum] = newValue
            }, row);
        }
    };
};

// function adjustListRowHeight(dom:any, indent='') { 
//     const height = Math.max(...Array.from(dom.childNodes).map((n:Element) => 
//         parseInt(window.getComputedStyle(n).height)
//     ));
//     if (dom && !dom.classList.contains('hsedit_list_content')) {
//         dom.style.height = height>0? `${height}px` : 'auto';
//     }
// }

/** expand rows to always show one empty row */
function expand(rows:any[], def:any, isEmpty:IsTest) {
    if (rows) {
        const lastRowIndex = rows.length - 1;
        if (lastRowIndex<0 || rows[lastRowIndex]===undefined || !isEmpty(rows[lastRowIndex])) {
            rows.push(def);
        }
    }
}

/** */
export interface EditListAttrs extends WidgetAttrs {
    /** 
     * an array of row elements used. If specified, `rows` takes precedent over 
     * `<content>` children. Otherwise row elements must be specified as `<content>` children.
     */
    rows?: any[];

    /** optional sorting function for rows; As a default, no sorting happens. */
    sort?: (a:any, b:any) => number;

    /** 
     * function that attributes a row as 'empty'. The default defines empty as an undefined `row`, 
     * or a row with 0 length.
     */
    isEmpty?: (row:ListRow) => boolean;

    /** makes the list collapsible. This requires `header` to be set. Defaults to `true`. */
    collapsible?: boolean;

    /** 
     * a {@link EditList.RowRender `RowRender`} function returning a rendered row
     * for the supplied row data. The default is {@link EditList.defaultRender defaultRender},
     * covering a variety of situations.
     */
    rowRender?: RowRender;

    /** if `true`, the list will be initially expanded. Defaults to `false'. */
    isExpanded?: boolean;

    /** 
     * the default (empty) content row, defaults to `''` 
     * This will be added as last element to `node.attrs.rowElements` to ensure an empty row is available.
     */
    defaultRow?: ListRow;

    /** 
     * if truthy, prevents `EditList` from automatically adding new empty rows. 
     * This makes the calling program responsible for adding rows to the list. 
     */
    expand?:(rows:any[], def:any, isEmpty:IsTest)=>void;

    /** column template for `Grid` within a row. Defaults to '' (equal-width columns) */
    columnTemplate?: string;

    /** optional header row. If missing, no header row will be shown.  */
    header?: m.Children;
}

export class EditList extends Widget {
    view(node:Vnode<EditListAttrs, this>) {
        // if ((<m.Child[]>node?.children)?.length>0) { log.warn('node.children is not supported by EditList')}
        const sort       = node.attrs.sort || (()=>0);
        const rows:ListRow[] = node.attrs.rows ?? <m.Child[]>node?.children;
        const isEmpty    = node.attrs.isEmpty || defIsEmpty;
        const isExpanded = node.attrs.isExpanded || false;
        const render     = node.attrs.rowRender || defaultRender(rows);
        const def:ListRow    = node.attrs.defaultRow===undefined? '' : node.attrs.defaultRow;
        const expandRows = node.attrs.expand || expand;
        const collapsible= node.attrs.collapsible===undefined? true : node.attrs.collapsible;

        if (!rows) { log.warn(`EditList rows array is missing`); }
        if (!rows || !rows.map) { log.warn(`EditList rows must be an array`); }
        expandRows(rows, def, isEmpty);
        const content = rows.sort(sort).map((row:any, i:number) => render(row, i));
        if (node.attrs.header) { content.unshift(m('.header', node.attrs.header)); }

        return collapsible? 
            m(Collapsible, this.attrs(node.attrs, {
                class: `hs_edit_list`,
                isExpanded: isExpanded,
            }), content)
          : m(`.hs_edit_list`, this.attrs(node.attrs, {}), content);
    }
}

