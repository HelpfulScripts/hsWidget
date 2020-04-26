import { m, Vnode }     from 'hslayout';
import { EditLabel }    from './EditLabel';
import { Log }          from 'hsnode';  const log = new Log('EditLabel.jest');
import $                from 'jquery';

// window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
// const mq = require('mithril-query');

let label = '';

// describe('EditLabel', () => { 
//     const out = mq(m(EditLabel, {
//         css: '#myLabel',
//         placeholder: 'favorite hero',
//         update: (item:string) => label = item,
//         content: label
//     }));
//     it ('should have DOM structure', () => {
//         out.should.have('span.hsedit_label');
//         out.click('#myLabel');
//         const first = out.first('#myLabel');
//         out.click('#myLabel');
//         out.should.have('input');
//     });
// });

// describe('EditDate', () => { 
//     console.log(`EditDate...`);
//     const EditDate = require('./').EditDate;
//     let out = mq(m(EditDate, {
//         placeholder: 'favorite hero',
//         update: (item:string) => label = item,
//         content: label
//     }));
//     it ('should have DOM structure', () => {
//         out.should.have('span.hsedit_label');
//     });
// });

const root = window.document.createElement("div");

describe('EditLabel', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m(EditLabel, {
            css: '#myLabel',
            placeholder: 'favorite hero',
            update: (item:string) => label = item,
            content: label
        })});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});