import * as hswidget from './';
import { m }    from 'hslayout';
// import { newLog }  from 'hsnode'; const log = newLog('Button.jest');

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

const content   = ['1st', '2nd', '3rd'];
let out;

describe('Collapsible', () => {
    describe('no arrows', () => {
        beforeAll(() => {
            out = mq(m(hswidget.Collapsible, { 
                css:'.myCollapsible', 
                isExpanded: false,
                components: [m('.myTitle', 'click me to toggle - both arrows'), content]
            }));
        });
        it ('should have DOM structure', () => {
            out.should.have('.hs-collapsible.myCollapsible');
            out.should.not.have('.hs-collapsible.myCollapsible.hs-collapsible-expanded');
            out.should.have('.hs-collapsible>.hs-collapsible-title');
            out.should.have('.hs-collapsible>.hs-collapsible-title>div');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-pre');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-arrow-right');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.myTitle');
            out.should.have('.hs-collapsible>.hs-collapsible-title>div');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-post');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-arrow-left');
            out.should.have('.hs-collapsible>.hs-collapsible-content');
        });
        it('should click', () => {
            out.click('.myCollapsible', null, false);
            out.should.have('.hs-collapsible.myCollapsible.hs-collapsible-expanded');
            out.should.have('.hs-collapsible>.hs-collapsible-title>div');
            out.should.have('.hs-collapsible>.hs-collapsible-title>div');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-pre');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-arrow-down');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-post');
            out.should.not.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-arrow-down');
        });
    });
    describe('double arrows', () => {
        beforeAll(() => {
            out = mq(m(hswidget.Collapsible, { 
                css:'.myCollapsible', 
                preArrow:true, 
                postArrow:true, 
                isExpanded: false,
                components: [m('.myTitle', 'click me to toggle - both arrows'), content]
            }));
        });
        it ('should have DOM structure', () => {
            out.should.have('.hs-collapsible.myCollapsible');
            out.should.not.have('.hs-collapsible.myCollapsible.hs-collapsible-expanded');
            out.should.have('.hs-collapsible>.hs-collapsible-title');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-pre.hs-collapsible-arrow-right');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.myTitle');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-post.hs-collapsible-arrow-left');
            out.should.have('.hs-collapsible>.hs-collapsible-content');
        });
        it('should click', () => {
            out.click('.myCollapsible', null, false);
            out.should.have('.hs-collapsible.myCollapsible.hs-collapsible-expanded');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-pre.hs-collapsible-arrow-down');
            out.should.have('.hs-collapsible>.hs-collapsible-title>.hs-collapsible-post.hs-collapsible-arrow-down');
        });
    });
});