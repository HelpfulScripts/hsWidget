/**
 * # Pivot table widget
 * Creates a pivot view of a table. The view can be structured by providing several `by` headers. 
 * Each header can be viewed in context of the previous by expanding the collapsible rows.
 * 
 * ### Profile
 * invoked as `m(Pivot, {...attributes });`
 * 
 * ### Attributes (node.attrs):
 * - `pivotName?:string`, optional, the top left name of the pivot 
 * - `pivotHeader?: PivotHeader`, optional, array of pivot table column headings
 * - `table: {data: <string|number>[][], header:string[] }`, the source table data and header 
 * - `values:string`, the values table column to aggregate
 * - `columns:<string|ColumnAccess>[]`, the table columns to translate into pivot columns.
 *    These can be either the column header name, or a callback function `fn` of type {@link Pivot.ColumnAccess `ColumnAccess`}.
 *    In the latter case, if `fn.col` is a header name, its column index will be passed into fn for convenience.
 * - `by:string[]` the sequence of table headers to sort by:
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * const headers = ['color', 'shape', 'Value', 'area'];
 * const table = [
 *      ['blue',  'square',   17, 'NW'],
 *      ['red',   'circle',   37, 'N'],
 *      ['blue',  'triangle', 22, 'S'],
 *      ['green', 'square',   18, 'NE'],
 *      ['green', 'cone',      9, 'SE'],
 *      ['blue',  'circle',   12, 'S']
 * ];
 * 
 * // ColumnAccess function: calculates the sum per row
 * const sums = (rowData, valueAccess, namedColumns, col) => {
 *      const colName = 'Sums';
 *      namedColumns[colName] = (namedColumns[colName]||0) + rowData[col]; 
 *      return namedColumns;
 * }
 * sums.col = 'Value';
 * 
 * m.mount(root, {view: () => m('.hs-white', [
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'click to expand rows',
 *          table: {data: table, header:headers},
 *          values:'Value',
 *          columns:['shape'],
 *          by: ['color', 'area']
 *    }),
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'by Area',
 *          pivotHeaders: ['Sums', 'red', 'green', 'blue'],
 *          table: {data: table, header:headers},
 *          values:'Value',
 *          columns:[sums, 'color'], // use `ColumnAccess` function and string column
 *          by: ['area', 'shape']
 *    }),
 * ])});
 * </file>
 * <file name='script.css'>
 * .hs-execution span { width: 10%; }
 * .hs-execution span.name { width: 30%; }
 * </file>
 * </example>
 * 
 */

 /** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import { Log }              from 'hsutil';  const log = new Log('Pivot');
import { Collapsible }      from './Collapsible';
import { formatLocale }     from 'd3';

export const locale = formatLocale({
    decimal: ".",
    thousands: " ",
    grouping: [3],
    currency: ['','TEUR']
});

const format = locale.format(',.0~f');

interface PivotStruct {
    name: string;
    values: Values,
    tree: PivotStruct[]
}

/**
 * array of pivot table column headings. 
 * Array elements take one of two forms:
 * - <string>: a simple string to print; must match the title inferred from the table
 * - {<oldKey>: <string>}: translate the inferred title to a new title
 */
export type PivotHeader = Array<string | {[oldkey:string]:string}>;

type HeaderMap = string[];


export interface ValueAccess {
    (acc:Accumulator, rowdata:number[]|string[], col:number): Accumulator;
    col?: number;
}

export interface ColumnAccess {
    (rowData:number[]|string[], valueAccess:ValueAccess, namedColumns:{[name:string]:Accumulator}, col:number): {[name:string]:Accumulator};
    col?: number|string;
}


const pivots: {[name:string]:PivotStruct} = {};

export type Accumulator = number | {[name:string]:number};
interface Values {
    cols: { [colVal:string]: Accumulator };
    rows: { [rowName:string]: Values; };
}


const sum:ValueAccess = (acc:Accumulator, rowdata:number[]|string[], col:number) => 
    (<number>acc || 0) + <number>rowdata[col];

const min:ValueAccess = (acc:Accumulator, rowdata:number[]|string[], col:number) =>
    Math.min(<number>acc || 1e99, <number>rowdata[col]);

const max:ValueAccess = (acc:Accumulator, rowdata:number[]|string[], col:number) =>
    Math.max(<number>acc || -1e99, <number>rowdata[col]);

const count:ValueAccess = (acc:Accumulator, rowdata:number[]|string[], col:number) => {
    acc = acc || {};
    acc[rowdata[col]] = (acc[rowdata[col]] || 0) + 1;
    return acc;
}

/**
 * call as `colAccess(rowData, col, valueAccess, result.cols)`
 * @param rowdata 
 * @param namedColumns 
 */
function colAccess(rowData:number[]|string[], valueAccess:ValueAccess, namedColumns:{[name:string]:Accumulator}, col:number):{[name:string]:Accumulator} {
    const colName = ''+rowData[col];
    namedColumns[colName] = valueAccess(namedColumns[colName], rowData, valueAccess.col);
    return namedColumns;
}

function getValues(table:any[][], byRow:number, valueAccess:ValueAccess, colsAccess:Array<ColumnAccess>):Values {
    const result:Values = {cols:{}, rows:{}};
    table.forEach(rowData => {
        const rowName = rowData[byRow];
        result.rows[rowName] = result.rows[rowName] || {cols:{}, rows:{}};
        colsAccess.map(col => col(rowData, valueAccess, result.cols, <number>col.col));
    });
    return result;
}

function createPivot(table:any[][], header:string[], accumulator:ValueAccess, byRows:number[], colsAccess:ColumnAccess[]):PivotStruct {
    const createColumns = (rowName:string, table:any[][], byRows:number[], accumulator:ValueAccess, colsAccess:ColumnAccess[]):PivotStruct => {
        const byRow = byRows.shift();
        const values = getValues(table, byRow, accumulator, colsAccess);
        const filter = (by:string) => (row:any[]) => row[byRow]===by;
        const rows = Object.keys(values.rows);
        return {
            name:rowName,
            values: values,
            tree: rows.length===0? undefined : rows.sort().map((by:string) =>
                (!by || by==='undefined')? undefined :
                    createColumns(by, table.filter(filter(by)), byRows.slice(), accumulator, colsAccess)
            )
        }
    };
    return (table.length===0 || header.length===0)? undefined : createColumns('&nbsp;', table, byRows.slice(), accumulator, colsAccess)
}

/**
 * decodes an element of the `values` attribute in `Pivot` and returns an aggregator function for the 
 * specified column in the `table` attribute.
 * @param index the column name reference, as provided by `header`. `index` allows for a prefix that specifies
 * the type of aggregator function to use:
 * - '<': calculates the minimum of all numeric values in the column
 * - '>': calculates the maximum of all numeric values in the column
 * - '@': calculates the count of all unique alphanumeric values in the column
 * - otherwise: calculates the sum of all numeric values in the column
 * As an alternative, `index` may directly specifiy an {@link AggFn `AggFn`} in user code.
 * @param header 
 */
const indexAggregator = (index:string|ValueAccess, header:string[]):ValueAccess => {
    let fn:ValueAccess;
    if (typeof index === 'function') { return index; }
    switch(index.charAt(0)) {
        case '<': fn = min; fn.col = header.indexOf(index.slice(1)); return fn;
        case '>': fn = max; fn.col = header.indexOf(index.slice(1)); return fn;
        case '@': fn = count; fn.col = header.indexOf(index.slice(1)); return fn;
        default:  fn = sum; fn.col = header.indexOf(index); return fn;
    }
}

function makeHeaders(pivot:PivotStruct, pivotHeader:PivotHeader) {
    const oldHeaders:HeaderMap = [];
    const newHeaders:HeaderMap = [];
    if (pivotHeader) { 
        pivotHeader.map((newKey, ni) => {
            if (typeof newKey === 'object') {
                const oldKey = Object.keys(newKey)[0];
                oldHeaders[ni] = oldKey; 
                newHeaders[ni] = newKey[oldKey]; // substitute key 
            } else {
                if (pivot.values.cols[newKey]!==undefined) {
                    oldHeaders[ni] = newKey; 
                    newHeaders[ni] = newKey;     
                } else {
                    oldHeaders[ni] = undefined; 
                    newHeaders[ni] = newKey;     
                }
            }
        });
    } else {
        Object.keys(pivot.values.cols).map((oldKey, i) => oldHeaders[i] = newHeaders[i] = oldKey);
    }
    return [oldHeaders, newHeaders];
}

const makeRow = (pivot:PivotStruct, level:number, colSequence:HeaderMap) => {
    const values = pivot.values;
    const parts:Vnode[] = [m('span.name', m.trust(pivot.name))];    // trust in case name includes html
    if (values) { 
        parts.push(...colSequence.map(c => {
            let val:any = values.cols[c];
            val = val===undefined? '' : typeof val==='object'? Object.keys(val).length : <number>val;
            return m('span.right', format(val)); 
        }));
    }
    return m(`.row`, parts);
}

const showByColumns = (pivot:PivotStruct, level:number, colSequence:HeaderMap, expanded=false):Vnode =>
    m(Collapsible, { css:`.pivot_row.mon${level}`, isExpanded:expanded, components: [
        makeRow(pivot, level, colSequence),
        pivot.tree.sort((a, b) => a.name>b.name? 1 : a.name<b.name? -1 : 0).map(p => p? showByColumns(p, level+1, colSequence, false) : undefined)
    ]}); 

export class Pivot {
    view(node:Vnode) {
        const table:any  = node.attrs.table;
        const tableData:any[][] = table.data;
        const tableHeader:string[] = table.header;
        const pivotName:string = node.attrs.pivotName || '';
        const pivotHeader:PivotHeader = <PivotHeader>node.attrs.pivotHeader;

        if (!pivots[pivotName]) { 
            const accumulator:ValueAccess = indexAggregator(node.attrs.values, tableHeader);
            const colsAccess:ColumnAccess[]   = node.attrs.columns.map((c:any) => {
                if (typeof c ==='function') { 
                    if (typeof c.col === 'string') { 
                        c.col = tableHeader.indexOf(c.col); 
                        if (c.col<0) log.warn(`could not find ColumnAccess col`);
                    }
                    return c; 
                } else { // string reference to column; should exist in `tableHeader`
                    const ca:ColumnAccess = colAccess;
                    ca.col = tableHeader.indexOf(c);
                    if (ca.col<0) {
                        log.warn(`no table header '${c}' found in [${tableHeader.join(',')}]`);
                    }
                    return ca;
                }
            });
            const byRows:number[] = node.attrs.by.map((c:string) => tableHeader.indexOf(c));
            pivots[pivotName] =createPivot(tableData, tableHeader, accumulator, byRows, colsAccess); 
        }

        const pivot = pivots[pivotName];
        if (pivot) {
            const [oldHeaders, newHeaders] = makeHeaders(pivot, pivotHeader);
            return m('.pivot', [
                m(`.row.mon_header`, [m('span.name', pivotName), ...newHeaders.map(h => m('span.right', h))]),
                showByColumns(pivot, 0, oldHeaders, true)
            ]);
        } else {
            return  m('', '...');
        }
    }
}
