import m from "mithril";
import { Pivot, Accumulator, ValueAccess }    from './Pivot';
const root = window.document.createElement("div");

const content1 = [''];

const headers = ['color', 'shape', 'Value', 'area'];
const table = [
     ['blue',  'square',   17, 'NW'],
     ['red',   'circle',   37, 'N'],
     ['blue',  'triangle', 22, 'S'],
     ['green', 'square',   18, 'NE'],
     ['green', 'cone',      9, 'SE'],
     ['blue',  'circle',   12, 'S']
];

// ColumnAccess function: calculates the sum per row
const sums = (rowData:number[]|string[], valueAccess:ValueAccess, namedColumns:{[name:string]:Accumulator}, col:number):{[name:string]:Accumulator} => {
     const colName = 'Sums';
     namedColumns[colName] = (<number>namedColumns[colName]||0) + <number>rowData[col]; 
     return namedColumns;
}
sums.col = 'Value';

describe('Pivot', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m('.hs-white', [
            m(Pivot, { 
                  pivotName: 'click to expand rows',
                  table: {data: table, header:headers},
                  values:'Value',
                  columns:['shape'],
                  by: ['color', 'area']
            }),
            m(Pivot, { 
                  pivotName: 'by Area',
                  pivotHeaders: ['Sums', 'red', 'green', 'blue'],
                  table: {data: table, header:headers},
                  values:'Value',
                  columns:[sums, 'color'], // use `ColumnAccess` function and string column
                  by: ['area', 'shape']
            }),
         ])});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});

