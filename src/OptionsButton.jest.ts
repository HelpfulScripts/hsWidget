import * as hswidget from '.';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let options = {'1st':false, '2nd':false, '3rd':false};
const out = mq(m(hswidget.OptionsButton, { desc: {
    items: ['1st', '2nd','3rd'], changed: (item) => options[item] = !options[item]
}}));

describe('OptionsButton', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-options-buttons');
        out.should.have('.hs-options-buttons>.hs-layout');
        out.should.have(3, '.hs-options-buttons>.hs-layout>.hs-layout');    
    });
    it('should select 1st', () => {
        out.click('.hs-layout:nth-child(1)>.hs-selectable');
        expect(options).toEqual({'1st':true, '2nd':false, '3rd':false});
    });
    it('should select 2nd', () => {
        out.click('.hs-layout:nth-child(2)>.hs-selectable');
        expect(options).toEqual({'1st':true, '2nd':true, '3rd':false});
    });
    it('should deselect 1st', () => {
        out.click('.hs-layout:nth-child(1)>.hs-selectable');
        expect(options).toEqual({'1st':false, '2nd':true, '3rd':false});
    });
    it('should click 3rd', () => {
        out.click('.hs-layout:nth-child(3)>.hs-selectable');
        expect(options).toEqual({'1st':false, '2nd':true, '3rd':true});
    });
});