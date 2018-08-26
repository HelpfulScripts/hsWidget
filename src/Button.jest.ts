import * as hswidget from './';
import { m }    from 'hslayout';
// import { newLog }  from 'hsnode'; const log = newLog('Button.jest');

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let clicked=0;
const out = mq(m(hswidget.Button, { desc: { 
    name: 'click me', 
    clicked: () => clicked++ 
}}));

describe('Button', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-toggle-button');
        out.should.have('.hs-toggle-button>span');
        out.should.have('.hs-toggle-button>span>.hs-selectable');
    });
    it('should click', () => {
        out.click('.hs-selectable', null, true);
        expect(clicked,).toBe(1);
    });
});