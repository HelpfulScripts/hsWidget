import { Menu } from './Menu';
import { m }    from 'hslayout';

const left  = ['0%', '25%', '50%', '75%'];
const right = ['75%', '50%', '25%', '0%'];
const items = ['1a', '2a', '3a', '4a'];

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

describe('Menu', () => {
    const out = mq(m(Menu, { desc: {
        items: items,
        clicked: (item:string) => { console.log('selected'); }
    }}));

    test ('DOM structure', () => {
        out.should.have('.hs-menu');
        out.should.have('.hs-menu>.hs-layout');
        out.should.have(4, '.hs-menu>.hs-layout>.hs-layout');    
        out.should.have('.hs-layout:nth-child(1)>.hs-selectable');    
    });

    items.forEach((item, i) => {
        const node = `.hs-menu>.hs-layout>.hs-layout:nth-child(${i+1})`;
        test(`item ${i+1}`, () => {
            out.should.have(`${node}`);
            out.should.have(1, `${node}>.hs-selectable`);
            const style = out.find(`${node}`)[0].attrs.style;
            expect(style).toContain(`left: ${left[i]}`);
            expect(style).toContain(`right: ${right[i]}`);
            expect(style).toContain(`top:0%`);
            expect(style).toContain(`bottom:0%`);
            if (!i) { out.should.have(1, `${node}>.hs-selected`); }
            else   { out.should.not.have(`${node}>.hs-selected`); }
            expect(out.find(`${node}>.hs-selectable`)[0].text).toBe(item);
        });

    });
});
