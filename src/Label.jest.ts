import * as hswidget from './';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

const out = mq(m(hswidget.Label, {
    css: '.myLabel',
    style: 'text-align: right;',
    text: 'This is a label'
}));

describe('Label', () => {
    it ('should have DOM structure', () => {
        out.should.have('.hs-label');
        out.should.have('.hs-label.myLabel');
        out.contains('This is a label');    
    });
});