import m from "mithril";
import { EditLabel }    from './EditLabel';
import { EditDate }     from './EditLabel';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let label = '';

describe('EditLabel', () => { 
    const out = mq(m(EditLabel, {
        id: 'myLabel',
        placeholder: 'favorite hero',
        update: (item:string) => label = item,
    }, label));
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
        out.click('#myLabel');
        out.keyup('#myLabel', 65);
        const first = out.first('#myLabel');
        // out.keyup('#myLabel', 13, {target:first});
        // out.click('#myLabel');
        out.should.have('input');

    });
});

describe('EditDate', () => { 
    let out = mq(m(EditDate, {
        placeholder: 'favorite hero',
        update: (item:string) => label = item,
    }, label));
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
    });
});

// const root = window.document.createElement("div");

// describe('EditLabel', () => {
//     beforeAll(()=>{
//         m.mount(root, { view: () => m(EditLabel, {
//             id: 'myLabel',
//             placeholder: 'favorite hero',
//             update: (item:string) => label = item,
//         }, label)});
//     });

//     it('should match snapshot', () => {
//         expect(root).toMatchSnapshot();
//     });
// });