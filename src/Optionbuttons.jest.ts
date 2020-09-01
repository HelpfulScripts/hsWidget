import m                    from "mithril";
import { OptionButtons }    from './Optionbuttons';
import { RadioButtons }     from './Optionbuttons';
import { Icon }             from "./Icon";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

const states = [
    {text:`important`, icon:'info' },
    {text:`urgent`,    icon:'warn' },
    {text:`immediate`, icon:'stop' },
];


describe('OptionButtons', () => {
    let times = 0;
    let index = 0;
    let optionStates:number[] = [-1, -1, -1];

    const out = mq(m('', { style:'background-color:white; padding:20px 20px;'}, [
        m(OptionButtons, { 
                initial: [0, 0, 1],
                onclick:(newIndex, newState, states) => {
                    times++;
                    index = newIndex;
                    optionStates = states.slice();
                }, 
            }, 
            // the button content to show
            states.map(s => m(Icon, {mdi:s.icon}, s.text))
        ),
    ]));

    it('should have button', () => {
        out.should.have('.hs_button');
        out.should.have('.hs_option_buttons');
        expect(optionStates[0]).toBe(-1);
        expect(optionStates[1]).toBe(-1);
        expect(optionStates[2]).toBe(-1);
    });
    
    it('should activate first button', () => {
        out.click('.index0');
        expect(optionStates[0]).toBe(1);
        expect(optionStates[1]).toBe(0);
        expect(optionStates[2]).toBe(1);

        out.should.have('.index0.state1');
        out.should.have('.index1.state0');
        out.should.have('.index2.state1');
    });
    
    it('should deactivate third button', () => {
        out.click('.index2');
        expect(optionStates[0]).toBe(1);
        expect(optionStates[1]).toBe(0);
        expect(optionStates[2]).toBe(0);

        out.should.have('.index0.state1');
        out.should.have('.index1.state0');
        out.should.have('.index2.state0');
    });
    
    it('should deactivate first button', () => {
        out.click('.index0');
        expect(optionStates[0]).toBe(0);
        expect(optionStates[1]).toBe(0);
        expect(optionStates[2]).toBe(0);

        out.should.have('.index0.state0');
        out.should.have('.index1.state0');
        out.should.have('.index2.state0');
    });
});

describe('RadioButtons', () => {
    let times = 0;
    let index = 0;
    let radioStates:number[] = [-1, -1, -1];

    const out = mq(m('', { style:'background-color:white; padding:20px 20px;'}, [
        m(RadioButtons, { 
                class:'simple',
                onclick:(newIndex, newState, states) => {
                    times++;
                    index = newIndex;
                    radioStates = states;
                }, 
            }, 
            // the button content to show
            states.map(s => m(Icon, {mdi:s.icon}, s.text))
        ),
    ]));

    it('should have button', () => {
        out.should.have('.hs_button');
        out.should.have('.hs_option_buttons');
        expect(radioStates[0]).toBe(-1);
        expect(radioStates[1]).toBe(-1);
        expect(radioStates[2]).toBe(-1);
    });
    
    it('should activate first button', () => {
        out.click('.index0');
        expect(radioStates[0]).toBe(1);
        expect(radioStates[1]).toBe(0);
        expect(radioStates[2]).toBe(0);

        out.should.have('.index0.state1');
        out.should.have('.index1.state0');
        out.should.have('.index2.state0');
    });
    
    it('should activate third button', () => {
        out.click('.index2');
        expect(radioStates[0]).toBe(0);
        expect(radioStates[1]).toBe(0);
        expect(radioStates[2]).toBe(1);

        out.should.have('.index0.state0');
        out.should.have('.index1.state0');
        out.should.have('.index2.state1');
    });
    
    it('should activate second button', () => {
        out.click('.index1');
        expect(radioStates[0]).toBe(0);
        expect(radioStates[1]).toBe(1);
        expect(radioStates[2]).toBe(0);

        out.should.have('.index0.state0');
        out.should.have('.index1.state1');
        out.should.have('.index2.state0');
    });
});
