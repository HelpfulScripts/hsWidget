import m from "mithril";
import { Pivot, Aggregator, PivotAttrs, ColumnGenerator }    from './Pivot';
const root = window.document.createElement("div");

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
const sums:ColumnGenerator = (namedColumns:{[name:string]:Aggregator}, value: number):void => {
     const colName = 'Sums';
     namedColumns[colName] = (<number>namedColumns[colName]||0) + value; 
}

describe('Pivot', () => {
    describe('sum', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m('.hs_white', [
                m(Pivot, <PivotAttrs>{ 
                      pivotName: 'click to expand rows',
                      table: {data: table, header:headers},
                      columns:[{Value:'>sums'}, {Value:'shape'}],
                      by: ['color', 'area']
                }),
             ])});
        });
    
        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });    
    });
    describe('max and generator', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m('.hs_white', [
                m(Pivot, <PivotAttrs>{ 
                      pivotName: 'by Area',
                      pivotHeaders: ['Sums', 'red', 'green', 'blue'],
                      table: {data: table, header:headers},
                      columns:[{'Value':sums}, {'Value':'>color'}], // use `ColumnAccess` function and string column
                      by: ['area', 'shape']
                }),
             ])});
        });
    
        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });    
    });
    describe('min', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m('.hs_white', [
                m(Pivot, <PivotAttrs>{ 
                      pivotName: 'by Area',
                      pivotHeaders: ['Sums', 'red', 'green', 'blue'],
                      table: {data: table, header:headers},
                      columns:[{'Value':'<color'}], // use `ColumnAccess` function and string column
                      by: ['area', 'shape']
                }),
             ])});
        });
    
        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });    
    });
    describe('count', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m('.hs_white', [
                m(Pivot, { 
                      pivotName: 'by Area',
                      table: {data: table, header:headers},
                      columns:[{'Value':'@color'}], // use `ColumnAccess` function and string column
                      by: ['area', 'shape']
                }),
             ])});
        });
    
        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });    
    });
});

