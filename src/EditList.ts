/**
 * # EditList
 * Creates an extensible List of rows
 * ### Attributes:
 * - css: a css selector, typically a class selector: '.myclass'
 * - header?: `Vnode` otpional header row
 * - rows?: `any[]` optional array of the row data to be rendered. Each row data will be 
 *   provided to calls of `rowRender`,
 *   `EditList` ensures that there is always an empty row at the end of list so it can be extended
 * - sort?: `(rows) => number` optional sorting function for rows
 * - columnLayout?: optional array of column widths for use in `Layout`, defaults to '[ ]'
 * - rowRender?: `(rowData:any, index:number)=>Vnode[]` function returning a rendered row
 *   for the supplied row data. The calling program. If missing, a default renderer is provided.
 * - isEmpty: `(any[])=>boolean` a function to test if a content row is considered empty. The `row`
 *   to test is provided as paramater
 * - defaultRow: `any` the default (empty) content row, defaults to `{ }`. 
 *   This will be added as last element to `node.attrs.rowElements` to ensure an empty row is available.
 * - manualAdd: if truthy, prevents `EditList` from automatically adding new empty rows. 
 *   This makes the calling program responsible for adding rows to the list. 
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
 *      css: '.myLabel',
 *      header: 'List Header',
 *      defaultRow: '',
 *      rows: content1,
 *      isEmpty: (row) => !(row && row.length),  // undefined or empty string
 *      rowRender:(row, i) => m(hsWidget.EditLabel, {
 *          content: row || '', 
 *          placeholder: 'add a line...',
 *          update: value => content1[i] = value
 *      })
 *    }),
 *    m('h4', `complex content: '${content2.map(r => r.value).join(', ')}'`),
 *    m(hsWidget.EditList, {
 *      css: '.myLabel',
 *      header: 'List Header',
 *      defaultRow: {value:''},
 *      rows: content2,
 *      isEmpty: (row) => !(row.value && row.value.length),   // undefined or empty string
 *      rowRender:(row, i) => m(hsWidget.EditLabel, {
 *          content: row.value,
 *          placeholder: 'add a line...',
 *          update: value => {
 *              content2[i] = content2[i] || {};
 *              content2[i].value = value;
 *          }
 *      })
 *    })
 * ])});
 * 
 * 
 * </file>
 * <file name='style.css'>
 * .myLabel {  
 *    border: 1px solid #aaf; 
 *    margin: 5px;
 * }
 * h4 {
 *    padding-left:5px;
 * }
 * </file>
 * </example>
 */

/** */
import { m, Vnode } from 'hslayout';
import { Log }      from 'hsutil';  const log = new Log('EditList');
import { Layout }   from 'hslayout';

const defIsEmpty = (data:any[]) => (data && data[0])? false : true;
const defSort = () => 0;
const defRender = (row:any, i:number) => m('span', row.toString());

export class EditList {
    view(node:Vnode) {
        const css = node.attrs.css || '';
        const sort = node.attrs.sort || defSort;
        const rows = node.attrs.rows || [];
        const isEmpty = node.attrs.isEmpty || defIsEmpty;
        const render = node.attrs.rowRender || defRender;
        const def = node.attrs.defaultRow===undefined? {} : node.attrs.defaultRow;

        if (!node.attrs.manuelAdd) {
            const lastRowIndex = rows.length - 1;
            if (lastRowIndex<0 || !isEmpty(rows[lastRowIndex])) {
                rows.push(def);
            }
        }
        const content = [
            m('.hsedit_list_content', 
                rows.sort(sort).map((row:any, i:number) => m(Layout, {
                    css: '.hsedit_list_row',
                    columns: node.attrs.columnLayout || [],
                    content: render(row, i)
                }))
            )
        ];
        if (node.attrs.header) { 
            content.unshift(m('.hsedit_list_header', node.attrs.header));
        }
        return m(`.edit_list${css}`, content);
    }
}
