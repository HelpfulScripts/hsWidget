import {Button} from './';
window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');
const m = require("mithril");

let clicked=0;

describe('Button', () => {
    describe('with settings', () => {
        const out = mq(m(Button, { desc: { 
            name: 'click me', 
            clicked: () => clicked++ 
        }}));
        it ('should have DOM structure', () => {
            out.should.have('.hs-toggle-button');
            out.should.have('.hs-toggle-button>span');
            out.should.have('.hs-toggle-button>span>.hs-selectable');
            out.should.contain('click me');
        });
        it('should click', () => {
            out.click('.hs-selectable', null, true);
            expect(clicked).toBe(1);
        });
    });
    describe('with defaults', () => {
        const out = mq(m(Button, { desc: { 
            clicked: () => clicked++ 
        }}));
            it ('should have DOM structure', () => {
            out.should.have('.hs-toggle-button');
            out.should.have('.hs-toggle-button>span');
            out.should.have('.hs-toggle-button>span>.hs-selectable');
            out.should.contain('button');
        });
        it('should click', () => {
            out.click('.hs-selectable', null, true);
            expect(clicked).toBe(2);
        });
    });
});