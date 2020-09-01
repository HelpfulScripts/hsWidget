/**
 * # Pivot table widget
 * Creates a pivot view of a table. The view can be structured by providing several `by` headers. 
 * Each header can be viewed in context of the previous by expanding the collapsible rows.
 * 
 * ### Profile
 * invoked as `m(Pivot, { <PivotAttrs> })`.
 * 
 * See {@link Pivot.PivotAttrs PivotAttrs}
 * 
 * ### Example
 * <example height=400>
 * <file name='script.js'>
 * const headers = ['color', 'shape', 'Value', 'area'];
 * const table = [
 *      ['blue',  'square',   17, 'NW'],
 *      ['blue',  'square',    7, 'NW'],
 *      ['red',   'circle',   37, 'N'],
 *      ['blue',  'triangle', 22, 'S'],
 *      ['green', 'square',   18, 'NE'],
 *      ['green', 'cone',      9, 'SE'],
 *      ['blue',  'circle',   12, 'S']
 * ];
 * 
 * // ColumnAccess function: calculates the sum per row
 * const sums = (namedColumns, value) => {
 *      const colName = 'Sums';
 *      namedColumns[colName] = (namedColumns[colName]||0) + value; 
 *      return namedColumns;
 * }
 * sums.col = 'Value'; // provide 
 * 
 * m.mount(root, {view: () => m('.hs_white', [
 *    m('h3', 'Simple pivot (click rows to expand)'),
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'Sum',
 *          table: {data: table, header:headers},
 *          columns:[{Value: 'color'}, {Value: 'Sum'}],
 *          by: ['shape', 'area', 'color']
 *    }),
 *    m('h3', 'Simple pivot, defined headers'),
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'Sum',
 *          pivotHeader: ['Sum', 'red', 'green', 'blue'],
 *          table: {data: table, header:headers},
 *          columns:[{Value: 'color'}, {Value: 'Sum'}],
 *          by: ['shape', 'area']
 *    }),
 *    m('h3', 'Pivot using predefined aggregator functions'),
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'Aggregator Values',
 *          table: {data: table, header:headers},
 *          columns:[{Value: sums}, {Value:'>Max'}, {Value:'<Min'}, {area:'@Unique'}, {area:'#Count'}],
 *          by: ['shape', 'area']
 *    }),
 *    m('h3', m.trust('Pivot using `ColumnGenerator` functions')),
 *    m(hsWidget.Pivot, { 
 *          pivotName: 'Max Generator',
 *          table: {data: table, header:headers},
 *          columns:[{Value: sums}, {Value:maxAggregator}, {Value:'<Min'}, {area:'@Unique'}, {area:'#Count'}],
 *          by: ['shape', 'area']
 *    }),
 * ])});
 * 
 * function maxAggregator(aggregators, value, col, rowData) {
 *      aggregators['max'] = Math.max(aggregators['max'] || -1e99, value);
 *      return aggregators;
 * }
 * 
 * </file>
 * <file name='script.css'>
 * .hs_execution span { width: 10%; }
 * .hs_execution span.name { width: 30%; }
 * </file>
 * </example>
 * 
 */

 /** */
import m                    from "mithril";
import { Vnode }            from './Widget';
import { Widget }           from './Widget';
import { WidgetAttrs }      from './Widget';
import { Log }              from 'hsutil';  const log = new Log('Pivot');
import { Collapsible }      from './Collapsible';
import { formatLocale }     from 'd3';


export interface PivotAttrs extends WidgetAttrs {
    /** optional, the top left name of the pivot  */
    pivotName?:     string;
    /** optional, array of pivot table column headings */
    pivotHeader?:   PivotHeader;
    /** the source table data  */
    table:          { header:string[]; data:any[][]; }
    /** The table columns to translate into pivot columns. See {@link Pivot.ColumnSpec `ColumnSpec`} for details */
    columns:        ColumnSpec[];
    /** the sequence of table headers to sort by: */
    by:             string[];
}

/** 
 * A **key/value** pair specifying column contents in the pivot. 
 * - The `tableValueCol` **key** determines the table column from which to provide values to a `Valuator` function. 
 * - The **value** specifies the pivot column name, or a {@link Pivot.ColumnGenerator `ColumnGenerator`} function that generates values 
 * for one or several pivot column. Three forms are supported:
 *     - `string`: If the name exists in the table header, then values in the referenced table column are interpreted 
 *        as categories that will generate the columns in the pivot.
 *     - `string`: if the name does not exist in the table header, then it will be used as a new pivot column name that aggregates 
 *        over all values of a pivot row.
 *     - `ColumnGenerator`: returns a user-provided generator function that is called over all values of a pivot row.
 * 
 * The `string` form also takes an optional `prefix` (e.g. `>Month`) that can be used to specify a predefined aggregation function:
 * - '' (no prefix): calculate the sum of encountered values.
 * - '>': calculate the maximum of encountered values.
 * - '<': calculate the minimnum of encountered values.
 * - '@': calculate the count of uniquely encountered values.
 */
export interface ColumnSpec {[tableValueCol:string]: string|ColumnGenerator}

/**
 * A function that will be called for each row of data to produce values for one or several columns in the pivot table.
 * The `ColumnGenerator` function is responsible to `name` those columns in the `aggregators` parameter.
 * Call parameters:
 * - `aggregators`: am Objet literal mapping pivot column names to an `Aggregator`. The generator can add new column mappings 
 * that will show in the pivot table.
 * - `value`: the value for the table row being processed, as specified by `tableValueCol` in the `ColumnSpec`
 * - `col`: optional column index into the table row providing `value`.
 * - `rowData`: optional complete table row being processed.
 */
export interface ColumnGenerator {
    (aggregators:{[name:string]:Aggregator}, value:number|string, col?:number, rowData?:Array<number|string>):void;
}

/**
 * Interface describing an Aggregator.
 * Numeric aggregators accumulate on numbers, e.g. 'sum', 'min', or 'max'
 * Categorical aggregators aggregate on an object literal, with each 
 * category instance represented by a number, e.g. the number of occurrences.
 */
export type Aggregator = number | {[name:string]:number};



/**
 * array of pivot table column headings. 
 * Array elements take one of two forms:
 * - <string>: a simple string to print; must match the title inferred from the table
 * - {<oldKey>: <string>}: translate the inferred title to a new title
 */
export type PivotHeader = Array<string | {[oldkey:string]:string}>;




const locale = formatLocale({
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
type HeaderMap = string[];

interface ColumnSpecifier {
    gen: ColumnGenerator;
    tableValueCol: number;
}

interface Valuator {
    fn:ValuatorFn;
    name:string;
}

interface ValuatorFn {
    (acc:Aggregator, value:number|string, colIndex:number, rowdata?:number[]|string[]): Aggregator;
}



const pivots: {[name:string]:PivotStruct} = {};

interface Values {
    cols: { [colVal:string]: Aggregator };
    rows: { [rowName:string]: Values; };
}

/** sum of numeric values */
const sum:ValuatorFn = (acc:number, value:number) => (acc===undefined? 0 : acc) + value;

/** min of numeric values */
const min:ValuatorFn = (acc:number, value:number) => Math.min(acc===undefined? 1e99 : acc, value);

/** max of numeric values */
const max:ValuatorFn = (acc:number, value:number) => Math.max(acc===undefined? -1e99 : acc, value);

/** count of unique categories */
const count:ValuatorFn = (acc:Aggregator, value:string) => {
    acc = acc || {};
    acc[value] = (acc[value] || 0) + 1;
    return acc;
}

/** count of unique categories */
const unique:ValuatorFn = (acc:Aggregator, value:string) => {
    acc = acc || {};
    acc[value] = 1;
    return acc;
}

/**
 * decodes an element of the `values` attribute in `Pivot` and returns an aggregator function for the 
 * specified column in the `table` attribute.
 * @param tableValueCol the column name reference, as provided by `header`. `index` allows for a prefix that specifies
 * the type of aggregator function to use:
 * - '<': calculates the minimum of all numeric values in the column
 * - '>': calculates the maximum of all numeric values in the column
 * - '@': calculates the count of all unique alphanumeric values in the column
 * - otherwise: calculates the sum of all numeric values in the column
 * As an alternative, `index` may directly specifiy an {@link AggFn `AggFn`} in user code.
 * @param header 
 */
// const getValueAccessFn = (tableValueCol:string):Valuator => {
const getValueAccessFn = (tableValueCol:string):Valuator => {
    try {
    let fn:ValuatorFn;
    let col:string;
    switch(tableValueCol.charAt(0)) {
        case '<': col = tableValueCol.slice(1); fn = min;    break;
        case '>': col = tableValueCol.slice(1); fn = max;    break;
        case '@': col = tableValueCol.slice(1); fn = unique; break;
        case '#': col = tableValueCol.slice(1); fn = count;  break;
        default:  col = tableValueCol; fn = sum;    break;
    }
    // return fn;
    return {fn:fn, name:col};
} catch(e) { log.error(e); }
}


const getColAccessFn = (c:ColumnSpec, header:string[]):ColumnSpecifier => {
    const [valColName, valueAccess] = Object.entries(c)[0];
    const valCol = header.indexOf(valColName);
    if (valCol<0) log.warn(`could not find valueCol '${valColName}' in [${header.join(', ')}]`);

    const cs:ColumnSpecifier = { gen:undefined, tableValueCol:valCol};
    if (typeof valueAccess ==='function') { // a ColumnGenerator
        cs.gen = <ColumnGenerator>valueAccess; 
    } else {                                // string reference to column; 
        // const aggFn = typeof valueAccess ==='string'? getValueAccessFn(valueAccess) : valueAccess;
        const aggFn = getValueAccessFn(valueAccess);
        const pivotCol = header.indexOf(aggFn.name);
        cs.gen = (aggregators:{[name:string]:Aggregator}, value:number|string, col:number, rowData:number[]|string[]):{[name:string]:Aggregator} => {
            try {
            const pivotValue = pivotCol<0? aggFn.name : rowData[pivotCol];
            aggregators[pivotValue] = aggFn.fn(aggregators[pivotValue], value, col, rowData); 
            return aggregators;
            } catch(e) { 
                log.error(e);
            }
        }
    }
    return cs;
}

function getValues(table:any[][], byRow:number, colsAccess:ColumnSpecifier[]):Values {
    const result:Values = {cols:{}, rows:{}};
    table.forEach(rowData => {
        const rowName = rowData[byRow];
        result.rows[rowName] = result.rows[rowName] || {cols:{}, rows:{}};
        colsAccess.map(colAccess => colAccess.gen(result.cols, rowData[colAccess.tableValueCol], colAccess.tableValueCol, rowData));
    });
    return result;
}

function createPivot(table:any[][], header:string[], by:string[], columns:Array<ColumnSpec>):PivotStruct {
    const createColumns = (rowName:string, table:any[][], byRows:number[], colsAccess:ColumnSpecifier[]):PivotStruct => {
        const byRow = byRows.shift();
        const values = getValues(table, byRow, colsAccess);
        const filter = (by:string) => (row:any[]) => row[byRow]===by;
        const rows = Object.keys(values.rows);
        return {
            name:rowName,
            values: values,
            tree: rows.length===0? undefined : rows.sort().map((by:string) => (!by || by==='undefined')? undefined :
                createColumns(by, table.filter(filter(by)), byRows.slice(), colsAccess)
            )
        }
    };
    const colsAccess:ColumnSpecifier[] = columns.map((c:ColumnSpec) => getColAccessFn(c, header));
    const byRows:number[] = by.map((c:string) => header.indexOf(c));
    return (table.length===0 || header.length===0)? undefined : createColumns('&nbsp;', table, byRows.slice(), colsAccess)
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
                    oldHeaders[ni] = newKey; 
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
    const parts:Vnode<PivotAttrs, Pivot>[] = !values? [] : colSequence.map(c => {
        let val:any = values.cols[c];
        val = val===undefined? '' : 
            typeof val!=='object'? val : Object.keys(val).reduce((acc, v)=>
                typeof val[v]==='string'? `${acc||val[v]}` : (acc||0)+val[v], undefined);
        return m('span.hs_right', typeof val==='number'?format(val):val); 
    });
    parts.unshift(m('span.name', m.trust(pivot.name)))  // trust in case name includes html
    return m(`.row`, parts);
}

const showByColumns = (pivot:PivotStruct, level:number, colSequence:HeaderMap, expanded=false):m.Children =>
    m(Collapsible, { class:`pivot_row mon${level}`, isExpanded:expanded}, [
        makeRow(pivot, level, colSequence),
        ...pivot.tree.sort((a, b) => a.name>b.name? 1 : a.name<b.name? -1 : 0).map(p => p? showByColumns(p, level+1, colSequence, false) : undefined)
    ]); 


export class Pivot extends Widget {
    id: number;
    oninit(node:Vnode<PivotAttrs, this>) {
        node.state.id = Math.floor(Math.random()*100000);   // create unique `pivots` hash
    }
    view(node:Vnode<PivotAttrs, this>) {
        const table:any  = node.attrs.table;
        const tableData:any[][] = table.data;
        const tableHeader:string[] = table.header;
        const pivotName:string = node.attrs.pivotName || '';
        const pivotHeader:PivotHeader = <PivotHeader>node.attrs.pivotHeader;

        const pivot = pivots[node.state.id] = pivots[node.state.id] || createPivot(tableData, tableHeader, node.attrs.by, node.attrs.columns);
        const [oldHeaders, newHeaders] = makeHeaders(pivot, pivotHeader);
        return m('.hs_pivot', this.attrs(node.attrs, {}), [
            m(`.row.mon_header`, [m('span.name', pivotName), ...newHeaders.map(h => m('span.hs_right', h))]),
            showByColumns(pivot, 0, oldHeaders, true)
        ]);
    }
}
