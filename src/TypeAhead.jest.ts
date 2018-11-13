import * as hswidget from './';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let hero = '';
const out = mq(m(hswidget.TypeAhead, { desc: {
    placeholder: 'favorite hero',
    onsubmit: item => hero = item,
    onkeydown: console.log,
    list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
}}));

const myEvent = {
    target: {
        value:'result',
        setSelectionRange: (n, length) => {}
    },
    code:''
};

describe('RadioButton', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-form');
        out.should.have('.hs-form input.hs-typeahead-input');
    });
    it('should type S', () => {
        myEvent.code = 'KeyS';
        out.keydown('.hs-form input', 83, myEvent);
        myEvent.code = 'Enter';
        out.keydown('.hs-form input', 13, myEvent);
        expect(hero).toBe('');
    });
});