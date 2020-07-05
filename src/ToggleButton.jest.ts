import * as hswidget from './';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let toggle = '';
const out = mq(m(hswidget.ToggleButton, { desc: {
    items: ['1st', '2nd','3rd'], clicked: (item:string) => toggle = item
}}));

describe('ToggleButton', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-toggle-button');
        out.should.have('.hs-toggle-button>span');
        out.should.have(1, '.hs-toggle-button>span>.hs-selectable');    
    });
    it('should click 2nd', () => {
        out.click('.hs-selectable');
        expect(toggle).toBe('2nd');
    });
    it('should click 3rd', () => {
        out.click('.hs-selectable');
        expect(toggle).toBe('3rd');
    });
    it('should click 1st', () => {
        out.click('.hs-selectable');
        expect(toggle).toBe('1st');
    });
    it('should hear mouseDown', () => {
        out.trigger('.hs-selectable', 'onmousedown');
        out.should.have('.hs-toggle-button.hs-button-pressed');
    });
    it('should hear mouseUp', () => {
        out.trigger('.hs-selectable', 'onmouseup');
        out.should.not.have('.hs-toggle-button.hs-button-pressed');
    });
});