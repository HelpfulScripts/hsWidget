import m        from "mithril";
import { Grid } from "./Grid";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');


describe('Grid', () => {
    describe('columns', () => {
        const cells = ['1', '2', '3', '4', '5'];
        const out = mq(m(Grid, { 
            class: 'colGrid',
            gap:"5px 5px",
            columns:'50px auto 50px',
        }, [
            '<',
            m(Grid, {class:'rowGrid', rows:''}, cells),
            '>'
        ]));
        it ('should have DOM structure', () => {
            out.should.have('.hs_grid.colGrid');
            expect(out.rootNode.attrs.style).toBeDefined();
            expect(out.rootNode.attrs.style).toContain('grid-template-columns:50px auto 50px;');
            expect(out.rootNode.attrs.style).toContain('gap:5px 5px;');
            expect(out.rootNode).toMatchSnapshot();

            out.should.have('.hs_grid.colGrid .child0');
            out.should.have('.hs_grid.colGrid .rowGrid');
            out.should.have('.hs_grid.colGrid .child2');

            out.should.have('.rowGrid .child0');
            out.should.have('.rowGrid .child4');
            out.should.not.have('.rowGrid .child5');

        });
    });
    describe('rows', () => {
        const cells = ['1', '2', '3', '4', '5'];
        const out = mq(m(Grid, { 
            class: 'colGrid',
            gap:"5px 5px",
            rows:'50px auto 50px',
        }, [
            '<',
            m(Grid, {class:'rowGrid', rows:''}, cells),
            '>'
        ]));
        it ('should have DOM structure', () => {
            out.should.have('.hs_grid.colGrid');
            expect(out.rootNode.attrs.style).toBeDefined();
            expect(out.rootNode.attrs.style).toContain('grid-template-rows:50px auto 50px;');
            expect(out.rootNode.attrs.style).toContain('gap:5px 5px;');
            expect(out.rootNode).toMatchSnapshot();

            out.should.have('.hs_grid.colGrid .child0');
            out.should.have('.hs_grid.colGrid .rowGrid');
            out.should.have('.hs_grid.colGrid .child2');

            out.should.have('.rowGrid .child0');
            out.should.have('.rowGrid .child4');
            out.should.not.have('.rowGrid .child5');

        });
    });
    describe('nested', () => {
        const cells = ['1', '2', '3', '4', '5'];
        const out = mq(m(Grid, { 
            class: 'colGrid',
            style:'background-color:#ffe; padding:20px 0;',
            gap:"5px 5px",
            columns:'50px auto auto 50px', 
        }, [
            '<',
            m(Grid, {class:'rowGrid', rows:'' }, cells),
            m(Grid, {class:'rowGrid', rows:'' }, cells),
            '>'
        ]));
        it ('should have DOM structure', () => {
            out.should.have('.hs_grid.colGrid');
            expect(out.rootNode.attrs.style).toBeDefined();
            expect(out.rootNode.attrs.style).toContain('grid-template-columns:50px auto auto 50px;');
            expect(out.rootNode.attrs.style).toContain('gap:5px 5px;');
            expect(out.rootNode).toMatchSnapshot();

            out.should.have('.hs_grid.colGrid .child0');
            out.should.have('.hs_grid.colGrid .rowGrid');
            out.should.have('.hs_grid.colGrid .child2');

            out.should.have('.rowGrid .child0');
            out.should.have('.rowGrid .child4');
            out.should.not.have('.rowGrid .child5');

        });
    });
});
