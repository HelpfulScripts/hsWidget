import m                from "mithril";
import { Icon }         from './Icon';
import { Button, IconButton }       from './Button';
import { OnOffButton }  from './Button';
import { ToggleButton } from "./Button";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');


describe('Button', () => {
    let state = 0;
    let times = 0;

    const out = mq(m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', 'Simple Push Button:'),
        m(Button, {
            id: 'myButton',
            onclick:(newIndex:number) => {
                state = newIndex;
                times++;
            }, 
        },
        m(Icon, {mdi:'warn'}, `clicked ${times} times: ${state}`))
    ]));
           
    it('should have button', () => {
        out.should.have('.hs_button');
        out.should.have('.hs_button>.hs_icon');
        out.should.have('.hs_button#myButton');
    });
    it('should count clicks', () => {
        expect(times).toBe(0);

        out.click('.hs_button');
        expect(times).toBe(1);

        out.click('.hs_button');
        expect(times).toBe(2);

        out.trigger('.hs_button', 'onmousedown');
        out.should.have('.hs_pressed');
        out.trigger('.hs_button', 'onmouseup');
        out.should.not.have('.hs_pressed');
    });
});

describe('ToggleButton', () => {
    let state = 0;
    let times = 0;
    const states = ['Alpha', 'Beta', 'Gamma'];

    const out = mq(m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', 'Simple Push Button:'),
        m(ToggleButton, 
            { onclick:(newIndex) => { state = newIndex; times++;}},
            states.map(s => m(Icon, {mdi:'warn'}, `clicked ${times} times: ${states[state]}`))
        )
    ]));
           
    it('should have button', () => {
        out.should.have('.hs_button');
        out.should.have('.hs_button>.hs_icon');
    });
    it('should count clicks', () => {
        expect(times).toBe(0);
        expect(state).toBe(0);

        out.click('.hs_button');
        expect(times).toBe(1);
        expect(state).toBe(1);
        out.should.not.have('.state0');
        out.should.have('.state1');
        out.should.not.have('.state2');

        out.click('.hs_button');
        expect(times).toBe(2);
        expect(state).toBe(2);
        out.should.not.have('.state0');
        out.should.not.have('.state1');
        out.should.have('.state2');

        out.click('.hs_button');
        expect(times).toBe(3);
        expect(state).toBe(0);
        out.should.have('.state0');
        out.should.not.have('.state1');
        out.should.not.have('.state2');

        out.trigger('.hs_button', 'onmousedown');
        out.should.have('.hs_pressed');
        out.trigger('.hs_button', 'onmouseup');
        out.should.not.have('.hs_pressed');
    });
});
   

describe('OnOffButton', () => {
    let state = 0;
    let times = 0;
    const states = ['Alpha', 'Beta', 'Gamma'];

    const out = mq(m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', 'OnOffButton:'),
        m(OnOffButton, 
            { onclick:(newIndex) => { state = newIndex; times++;}},
            'OnOff'
        )
    ]));
           
    it('should have button', () => {
        out.should.have('.hs_button.hs_onoff_button');
    });
    it('should count clicks', () => {
        expect(times).toBe(0);
        expect(state).toBe(0);
        out.should.contain('OnOff');

        out.click('.hs_onoff_button');
        expect(times).toBe(1);
        expect(state).toBe(1);
        out.should.not.have('.state0');
        out.should.have('.state1');
        out.should.not.have('.state2');

        out.click('.hs_onoff_button');
        expect(times).toBe(2);
        expect(state).toBe(0);
        out.should.have('.state0');
        out.should.not.have('.state1');
        out.should.not.have('.state2');
    });
});
   

describe('IconButton', () => {
    let state = 0;
    let times = 0;
    const states = ['Alpha', 'Beta', 'Gamma'];

    const out = mq(m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', 'IconButton:'),
        m(IconButton, {
            onclick:(newIndex) => { state = newIndex; times++;},
            mdi: 'stop'
        })
    ]));
           
    it('should have button', () => {
        out.should.have('.hs_button.hs_icon_button');
        out.should.have('.hs_button>.hs_icon');
    });
    it('should count clicks', () => {
        expect(times).toBe(0);
        expect(state).toBe(0);

        out.click('.hs_icon_button');
        expect(times).toBe(1);
        expect(state).toBe(1);
        out.should.not.have('.state0');
        out.should.have('.state1');
        out.should.not.have('.state2');

        out.click('.hs_icon_button');
        expect(times).toBe(2);
        expect(state).toBe(0);
        out.should.have('.state0');
        out.should.not.have('.state1');
        out.should.not.have('.state2');
    });
});
   