import { GridColumns }  from './Grid';
import { GridRows}      from './Grid';
import m                from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');


describe('Grid', () => {
    const cells = ['1', '2', '3', '4', '5'];
    const out = mq(m(GridColumns, { 
        class: 'colGrid',
        gap:"5px 5px",
        template:'50px auto 50px',
    }, [
        '<',
        m(GridRows, {class:'rowGrid'}, cells),
        '>'
    ]));
    it ('should have DOM structure', () => {
        out.should.have('.hs_grid.colGrid');
        expect(out.rootNode.attrs.style).toBeDefined();
        expect(out.rootNode.attrs.style).toContain('grid-template-columns:50px auto 50px;');
        expect(out.rootNode.attrs.style).toContain('gap:5px 5px;');

        out.should.have('.hs_grid.colGrid .child0');
        out.should.have('.hs_grid.colGrid .rowGrid');
        out.should.have('.hs_grid.colGrid .child2');

        out.should.have('.rowGrid .child0');
        out.should.have('.rowGrid .child4');
        out.should.not.have('.rowGrid .child5');

    });
});
