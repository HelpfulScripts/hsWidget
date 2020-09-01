import m                from "mithril";
import { EditCheckbox } from './EditCheckbox';
const root = window.document.createElement("div");

let selected = false;

describe('EditCheckbox', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m(EditCheckbox, {
            id: 'mySelect',
            class: 'mySelect',
            initial: true,
            update: (newValue:boolean) => selected = newValue
        })});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});


window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

describe('EditCheckbox', () => {
    let state = true;
    let times = 0;

    const out = mq(m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', 'EditCheckbox:'),
        m(EditCheckbox, {
                id: 'myCheckbox',
                initial: true,
                update: (checked:boolean) => {
                    state = checked;
                    times++;
                }, 
            },
            'Please choose:'
        )
    ]));
           
    it('should have checkbox', () => {
        out.should.have('.hs_edit_checkbox');
        out.should.have('.hs_edit_checkbox#myCheckbox');
        out.should.have('input');
        out.should.have('label');
        out.should.contain('Please choose:');
    });
           
    it('should uncheck', () => {
        out.click('input');
        expect(times).toBe(1);
        expect(state).toBe(false);
    });
           
    it('should recheck', () => {
        out.click('input');
        expect(times).toBe(2);
        expect(state).toBe(true);
    });
});