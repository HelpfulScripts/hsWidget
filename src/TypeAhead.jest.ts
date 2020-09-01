import * as hswidget from './';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let hero = '';
const out = mq(m(hswidget.TypeAhead, {
    placeholder: 'favorite hero',
    onsubmit: (item:string) => hero = item,
    onkeydown: console.log,
    list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
}));

const myEvent = {
    target: {
        value:'result',
        firstChild: {data: 'Sup'},
        setSelectionRange: (n:number, length:number) => {}
    },
    code: <string|number>undefined
}; 

describe('Type Ahead', () => { 
    it ('should have DOM structure', () => {
        out.should.have('.hs_form');
        out.should.have('.hs_form input.hs_typeahead_input');
    });
    it('should type S', () => {
        myEvent.code = 83;
        out.trigger('.hs_form input', 'oninput', myEvent);
        myEvent.code = 'Enter';
        out.keydown('.hs_form input', 'Enter', myEvent);
        expect(hero).toBe('result');
    });
    it('should match', () => {
        expect(out).toMatchSnapshot();
    });
    it('should Backspace ', () => {
        myEvent.code = 'Backspace';
        out.keydown('.hs_form input', 'Enter', myEvent);
        myEvent.code = 83;

        out.trigger('.hs_form input', 'oninput', myEvent);
        expect(hero).toBe('result');
    });
});