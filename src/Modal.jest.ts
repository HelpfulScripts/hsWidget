import { Modal } from './Modal';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let dismissals = 0;
let showModal = true;

describe('ModalDialog', () => {
    describe('with settings', () => {
        const out = mq(m('#parent', {onclick: () => { showModal=true; }}, 
            showModal? m(Modal, {
                dismiss: () => { dismissals++; showModal=false; },
                content: m('', `click on border or on the x to release ${dismissals}`)
            }) : m('.noModal')
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.noModal');
            out.should.have('#parent>.hs-modal');
        });
        it ('should open on trigger', () => {
            expect(dismissals).toBe(0);
            out.click('#parent');
            // out.log('#parent');
            out.should.have('.hs-modal');
            out.should.have('.hs-modal>.hs-modal-background');
            out.should.contain('click on border or on the x to release 0');    
        });
        it('should close on clicking the x', () => {
            expect(dismissals).toBe(0);
            out.click('.hs-modal>.hs-modal-background'/*, undefined, false*/);
            expect(dismissals).toBe(1);
            out.should.not.have('#parent>.hs-modal');
            out.should.have('#parent>span');
        });
    });
    xdescribe('with defaults', () => {
        let trigger: ()=> {};
        const out = mq(m('#parent', {onclick: () => trigger()}, 
        m(Modal, {
            setTrigger: (t:()=> {}) => trigger = t
        })
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.hs-modal');
        });
        it ('should open on trigger', () => {
            expect(dismissals).toBe(1);
            out.click('#parent');
            out.should.have('#parent>.hs-modal');
            out.should.have('.hs-modal>.hs-modal-background');
            out.should.have('.hs-modal>.hs-modal-foreground[style="width:auto; height:auto;"]');
            out.should.contain('modal pane');    
        });
    });
    xdescribe('missing trrigger', () => {
        let trigger: ()=> {};
        const out = mq(m('#parent', {onclick: () => trigger()}, 
        m(Modal, {
        })
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.hs-modal');
        });
    });
});