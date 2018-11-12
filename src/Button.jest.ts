import {Button} from './';
window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
// const Button = require('./').Button;
const mq = require('mithril-query');
const m = require("mithril");

let clicked=0;
const out = mq(m(Button, { desc: { 
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
        expect(clicked).toBe(1);
    });
});