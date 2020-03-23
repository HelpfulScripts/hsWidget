import * as hswidget from './';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let label = '';

describe('EditLabel', () => { 
    let out:any;
    beforeAll(() => {
        out = mq(m(hswidget.EditLabel, {
            placeholder: 'favorite hero',
            update: (item:string) => label = item,
            content: label
        }));
    });
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
    });
    // it('should type S', () => {
    //     out.click('span.hsedit_label');

    //     out.keyup('span.hsedit_label', 'A');
    //     out.keyup('span.hsedit_label', 'Enter');
    //     expect(label).toBe('A');
    // });
});

describe('EditDate', () => { 
    let out:any;
    beforeAll(() => {
        out = mq(m(hswidget.EditDate, {
            placeholder: 'favorite hero',
            update: (item:string) => label = item,
            content: label
        }));
    });
    it ('should have DOM structure', () => {
        out.should.have('span.hsedit_label');
    });
    // it('should type S', () => {
    //     out.click('span.hsedit_label');
    //     out.keydown('span.hsedit_label', 'A');
    //     out.keyup('span.hsedit_label', 'Enter');
    //     expect(label).toBe('A');
    // });
});