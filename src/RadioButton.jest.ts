import * as hswidget from './';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let radio = 'xx';
const out = mq(m(hswidget.RadioButton, { desc: {
    items: ['1st', '2nd','3rd'], clicked: (item:string) => radio = item
}}));

describe('RadioButton', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-radio-buttons');
        out.should.have('.hs-radio-buttons>.hs-layout');
        out.should.have(3, '.hs-radio-buttons>.hs-layout>.hs-layout');    
        out.should.have('.hs-layout:nth-child(1)>.hs-selectable');    
    });
    it('should click 1st', () => {
        out.click('.hs-layout:nth-child(1)>.hs-selectable');
        expect(radio).toBe('1st');
    });
    it('should click 2nd', () => {
        out.click('.hs-layout:nth-child(2)>.hs-selectable');
        expect(radio).toBe('2nd');
    });
    it('should click 3rd', () => {
        out.click('.hs-layout:nth-child(3)>.hs-selectable');
        expect(radio).toBe('3rd');
    });
});