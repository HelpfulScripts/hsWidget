import { Collapsible }  from './Collapsible';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());


describe('Collapsible', () => {
    const mq = require('mithril-query');
    const content   = ['1st', '2nd', '3rd'];
    
    describe('no arrows', () => {
        const out = mq(m(Collapsible, { 
            class:'myCollapsible', 
            isExpanded: false,
        },[
            m('.myTitle', 'click me to toggle - no arrows'), 
            ...content
        ])); 
        it ('should have DOM structure', () => {
            // out.log('.hs-collapsible-content');
            out.should.have('.myTitle');
            out.should.have('.myCollapsible');
            expect(out.first('.hs-collapsible-content').attrs.style).toBe('max-height:0; transition: max-height 0.25s ease-in-out');
            out.should.contain('click me to toggle - no arrows');
        });
        it ('should not have arrows', () => {
            out.should.not.have('.hs-collapsible-arror-right');
            out.should.not.have('.hs-collapsible-arror-left');
        });
        it ('should respond to click', () => {
            out.click('.hs-collapsible-title'); 
            expect(out.first('.hs-collapsible-content').attrs.style).toBe('max-height:400px; transition: max-height 0.25s ease-in-out');
        });
    });
    describe('double arrows', () => {
        const out = mq(m(Collapsible, { 
            class:'myCollapsible', 
            preArrow:true, 
            postArrow:true, 
            isExpanded: false,
        },[
            m('.myTitle', 'click me to toggle - both arrows'), 
            ...content
        ])); 
        
        it ('should have DOM structure', () => {
            out.should.have('.myTitle');
            out.should.not.have('.hs-collapsible-expanded');
            out.should.have('.hs-collapsible-arrow-right');
            out.should.have('.hs-collapsible-arrow-left');
        });
    });
});