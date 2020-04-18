import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let label = '';

describe('EditLabel', () => { 
    console.log(`EditLabel...`);
    const EditLabel = require('./').EditLabel;
    let out = mq(m(EditLabel, {
        placeholder: 'favorite hero',
        update: (item:string) => label = item,
        content: label
    }));
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
    });
    it ('should become editable', () => {
        out.click('.hsedit_label');
        console.log(out.first('.hsedit_label'));
        out.should.have('input.hsedit_label');
    });
});

describe('EditDate', () => { 
    console.log(`EditDate...`);
    const EditDate = require('./').EditDate;
    let out:any;
    beforeAll(() => {
        out = mq(m(EditDate, {
            placeholder: 'favorite hero',
            update: (item:string) => label = item,
            content: label
        }));
    });
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
    });
});