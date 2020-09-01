import { Menu, MenuPanel } from './Menu';
import m from "mithril";

const left  = ['0%', '25%', '50%', '75%'];
const right = ['75%', '50%', '25%', '0%'];
const items = ['1a', '2a', '3a', '4a'];

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

describe('Menu', () => {
    const out = mq(m(Menu, {
        onclick: (item:number) => { console.log('selected'); }
    }, items));

    test ('DOM structure', () => {
        out.should.have('.hs_menu');
        out.should.have(4, '.hs_menu>.hs_button');
        out.should.have(3, '.hs_menu>.hs_button.state0');    
        out.should.have(1, '.hs_menu>.hs_button.state1');    
    });
});

const root = window.document.createElement("div");

describe('MenuPanel', () => {
    beforeEach(() =>
        m.mount(root, {view: () => m(MenuPanel, {
            menu: ["one", "two", "three"],  
            initial: 1
        }, ['1st', '2nd', '3rd'])})
    );

    test('layout', () => expect(root).toMatchSnapshot());
});