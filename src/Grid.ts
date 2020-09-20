/**
 * # Grid widget
 * exposes CSS Grid Layout. 
 * 
 * ### Profile
 * invoked as 
 * - `m(Grid, <GridAttrs>, <content>);`
 * 
 * See {@link Grid.GridAttrs GridAttrs}
 * 
 * 
 * ### Example
 * <example height=250px><file name='script.js'>ximport='Grid.x.js'</file>
 * <file name='style.css'>
 * .gridExample { }
 * .colGrid { background-color:#eef; width:100%; height:100%; }
 * .rowGrid { background-color:#efe; padding:5px; width:100%; height:100%; }
 * .rowGrid .hs_grid_cell:nth-child(even) {background-color:#eee;}
 * .rowGrid .hs_grid_cell:nth-child(odd)  {background-color:#fff;}
 * .rowGrid div, .colGrid div { text-align:center; vertical-align:middle}
 * </file>
 * </example>
 * 
 */

/** */
import m                from "mithril";
import { Vnode }        from './Widget';
import { ViewResult }   from './Widget';
import { Widget }       from './Widget';
import { WidgetAttrs }  from './Widget';

export interface GridAttrs extends WidgetAttrs {
    /** grid row template. will be passed through as is to grid-template-rows command of the CSS Grid styling */
    rows?: string;
    /** grid row template. will be passed through as is to grid-template-columns command of the CSS Grid styling */
    columns?: string;
    /** grid-gap; the string will be passed through as is to the CSS Grid styling */
    gap?: string;
}


// type RC = 'row'|'col';

// const opp = {col:'row', row:'col'};

/**
 * # Grid
 */
export class Grid extends Widget {
    rc:string;
    gridFormat(a:GridAttrs) {
        // const template = {row:'rows', col:'columns'};
        // const isTmp = a.template!==undefined && a.template!=='';
        // const tmpRows = a.rows;
        // const tmpCols = a.columns || tmpRows? undefined : '';
        const cl = (a.rows===undefined && a.columns===undefined)? `hs_grid_auto_col` : (a.rows===undefined? 'hs_grid_col' : 'hs_grid_row');
        const st = (a.gap? `gap:${a.gap};`:'') +
                   (a.rows===undefined?   '' : `grid-template-rows:${a.rows};`) +
                   (a.columns===undefined?'' : `grid-template-columns:${a.columns};`);
        return [cl, st===''?undefined:st];
    }
    view(node: Vnode<GridAttrs, this>):ViewResult { 
        const a:GridAttrs = node.attrs;
        const [cl, st] = this.gridFormat(a);
        const childNodes = () => (<any[]>node.children).map((c,i) => typeof c==='string'? m(`.hs_grid_cell.child${i}`, c) : c);
        return m(`.hs_grid`, this.attrs(node.attrs, { class: cl, style:st}), childNodes());
    }
}

/**
 * # GridColumns 
 * Exposes the CSS Grid Layout to Typescript.
 * `m(Grid, <{@link Grid.GridAttrs `GridAttrs`}>, <content>);`
 */
// export class GridColumns extends Grid {
//     rc = 'col';
// }

/**
 * # GridRows 
 * Exposes the CSS Grid Layout to Typescript.
 * `m(Grid, <{@link Grid.GridAttrs `GridAttrs`}>, <content>);`
 */
// export class GridRows extends Grid {
//     rc = 'row';
// }
