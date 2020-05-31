/**
 * # EditList
 * Creates an auto-extending list of editable rows. The widget is simple to apply yet highly configurable
 * even to more complex situations. See examples below.
 * 
 * ### Attributes:
 * - **rows**: `any[]` array of the row data to be rendered. Each row data will be 
 *      provided to calls of `rowRender`.`EditList` ensures that there is always an 
 *      empty row at the end of list so it can be extended
 * - **rowRender**?: `(rowData:any, index:number)=>Vnode[]` function returning a rendered row
 *      for the supplied row data. If missing, a default renderer is supplied for a variety of situations.
 *      Updated values will be reflected in the provided `rows` array.
 * - **css**?: an optional css selector, typically a class selector: '.myclass'
 * - **header**?: `Vnode` otpional header row. If missing, no header row will be shown. 
 * - **collapsible**?: `boolean` makes the list collapsible. This requires `header` to be set. Defaults to `true`.
 * - **sort**?: `(rows) => number` optional sorting function for rows; As a default, no sorting happens.
 * - **columnLayout**?: optional array of column widths for use in `Layout`, defaults to `[ ]`
 * - **isEmpty**?: `(any[])=>boolean` a function to test if a content row is considered empty. The `row`
 *      to test is provided as paramater
 * - **isExpanded**?: `boolean` if `true`, will auto expand the list
 * - **defaultRow**?: `any` the default (empty) content row, defaults to `''`. 
 *      This will be added as last element to `node.attrs.rowElements` to ensure an empty row is available.
 * - **expandRows**?: `(rows:any[], def:any, isEmpty:IsTest)=>void` if truthy, prevents `EditList` from automatically adding new empty rows. 
 *      This makes the calling program responsible for adding rows to the list. 
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * let content1 = [''];
 * let content2 = [];
 * 
 * m.mount(root, {view: () => m('div', [
 *    m('h4', `simple content: '${content1.join(', ')}'`),
 *    m(hsWidget.EditList, {
 *      rows: content1,
 *    }),
 * 
 *    m('h4', `complex content: '${content2.map(r => `${r.value}:${r.selected}`).join(', ')}'`),
 *    m(hsWidget.EditList, {
 *      css: '.myList',
 *      header: 'List Header',
 *      defaultRow: {value:'', selected:''},
 *      rows: content2,
 *      isEmpty: (row) => !(row.value && row.value.length),   // undefined or empty value
 *      columnLayout: ['70%', '30%'],
 *      rowRender:(row, i) => [
 *          m(hsWidget.EditLabel, {
 *              css: '.myListElement',
 *              content: row.value,
 *              placeholder: 'description',
 *              update: value => {
 *                  content2[i] = content2[i] || {};
 *                  content2[i].value = value;
 *              }
 *          }),
 *          m(hsWidget.EditSelect, {
 *              css: '.myListElement',
 *              selected: row.value,
 *              from: ['high', 'med', 'low'],
 *              update: value => {
 *                  content2[i] = content2[i] || {};
 *                  content2[i].selected = value;
 *              }
 *          }),
 *       ]
 *    })
 * ])});
 * 
 * 
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
import { m, Vnode }     from 'hslayout';
import { Log }          from 'hsutil';  const log = new Log('EditList');
import { Layout }       from 'hslayout';
import { EditLabel }    from './EditLabel';
import { Collapsible }  from './Collapsible';

interface IsTest { (val:Row): boolean; }

interface RowRender { (row:Row, rowNum:number): Vnode; }

/** semantic type alias for the `row` data structure. */
type Row = any;

/** 
 * the default `isEmpty` test: returns true if either `row` is undefined, or if its length is 0 or undefined.
 * This test matches situations where the row is a simple `string`, or an `array` of `any`s.
 */
const defIsEmpty:IsTest = (row:Row) => (row && row.length)? false : true;

/**
 * returns the default row-`render` function: 
 * - if `row` is an array or an object literal, turn each element into an `EditLabel`
 * - otherwise treat `row` as a primitive and turn it into an EditLabel.  
 */
const defaultRender = (rows:Row[]):RowRender =>  {
    return (row:Row, rowNum:number):Vnode => {
        if (row.map) {
            return row.map((e:string, i:number) => m(EditLabel, {
                content: e,
                placeholder: 'add...',
                update: (newValue:string) => row[i] = newValue
            }));
        } else if (Object.prototype.toString.call(row) === '[object Object]') { // an object literal
            return Object.keys(row).map((e:string) => m(EditLabel, {
                content: row[e],
                placeholder: 'add...',
                update: (newValue:string) => row[e] = newValue
            }));
        } else { // a primitive
            return m(EditLabel, {
                content: row,
                placeholder: 'add...',
                update: (newValue:string) => rows[rowNum] = newValue
            });
        }
    };
};

function adjustListRowHeight(dom:any, indent='') { 
    const height = Math.max(...Array.from(dom.childNodes).map((n:Vnode) => 
        parseInt(window.getComputedStyle(n).height)
    ));
    if (dom && !dom.classList.contains('hsedit_list_content')) {
        dom.style.height = height>0? `${height}px` : 'auto';
    }
}

export class EditList {
    view(node:Vnode) {
        const css        = node.attrs.css || '';
        const sort       = node.attrs.sort || (()=>0);
        const rows:Row[] = node.attrs.rows;
        const isEmpty    = node.attrs.isEmpty || defIsEmpty;
        const isExpanded = node.attrs.isExpanded || false;
        const render     = node.attrs.rowRender || defaultRender(rows);
        const def:Row    = node.attrs.defaultRow===undefined? '' : node.attrs.defaultRow;
        const expandRows = node.attrs.expand || expand;
        const collapsible= node.attrs.collapsible===undefined? true : node.attrs.collapsible;

        if (!rows) { log.warn(`EditList${css} rows array is missing`); }
        if (!rows || !rows.map) { log.warn(`EditList${css} rows must be an array`); }
        expandRows(rows, def, isEmpty);
        const content = [
            m('.hsedit_list_content', {
                onupdate(node:Vnode) { adjustListRowHeight(node.dom); },
            },
                rows.sort(sort).map((row:any, i:number) => m(Layout, {
                    css: '.hsedit_list_row',
                    onupdate(node:Vnode) { adjustListRowHeight(node.dom); },
                    columns: node.attrs.columnLayout || [],
                    content: render(row, i)
                }))
            )
        ];
        if (collapsible && node.attrs.header) {
            return m(Collapsible, {
                css: `.edit_list${css}`,
                isExpanded: isExpanded,
                components: [
                    m('.hsedit_list_header', node.attrs.header),
                    content
                ]
            });
        } else {
            if (node.attrs.header) { 
                content.unshift(m('.hsedit_list_header', node.attrs.header));
            }
            return m(`.edit_list${css}`, content);
        }
    }
}

function expand(rows:any[], def:any, isEmpty:IsTest) {
    if (rows) {
        const lastRowIndex = rows.length - 1;
        if (lastRowIndex<0 || !rows[lastRowIndex] || !isEmpty(rows[lastRowIndex])) {
            rows.push(def);
        }
    }
}