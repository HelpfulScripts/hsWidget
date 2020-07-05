import { Modal } from './Modal';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let dismissals = 0;

describe('ModalDialog', () => {
    describe('with settings', () => {
        let trigger: ()=> {};
        const out = mq(m('#parent', {onclick: () => trigger()}, 
            m(Modal, {
                width:  '300px',
                height: '200px',
                dismiss: () => dismissals++,
                setTrigger: (t:()=> {}) => trigger = t,
                content: m('', `click on border or on the x to release ${dismissals}`)
            })
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.hs-modal-frame');
        });
        it ('should open on trigger', () => {
            expect(dismissals).toBe(0);
            out.click('#parent');
            out.should.have('#parent>.hs-modal-frame');
            out.should.have('.hs-modal-frame>.hs-modal-background');
            out.should.have('.hs-modal-frame>.hs-modal-foreground[style="width:300px; height:200px;"]');
            out.should.have('.hs-modal-frame>.hs-modal-foreground>.hs-corner-button');
            out.should.have('.hs-modal-frame>.hs-modal-foreground>.hs-corner-button[onclick]');
            out.should.contain('click on border or on the x to release');    
        });
        it('should close on clicking the x', () => {
            expect(dismissals).toBe(0);
            out.click('.hs-modal-frame>.hs-modal-foreground>.hs-corner-button', null, false);
            expect(dismissals).toBe(1);
            out.should.not.have('#parent>.hs-modal-frame');
            out.should.have('#parent>span');
        });
    });
    describe('with defaults', () => {
        let trigger: ()=> {};
        const out = mq(m('#parent', {onclick: () => trigger()}, 
        m(Modal, {
            setTrigger: (t:()=> {}) => trigger = t
        })
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.hs-modal-frame');
        });
        it ('should open on trigger', () => {
            expect(dismissals).toBe(1);
            out.click('#parent');
            out.should.have('#parent>.hs-modal-frame');
            out.should.have('.hs-modal-frame>.hs-modal-background');
            out.should.have('.hs-modal-frame>.hs-modal-foreground[style="width:auto; height:auto;"]');
            out.should.contain('modal pane');    
        });
    });
    describe('missing trrigger', () => {
        let trigger: ()=> {};
        const out = mq(m('#parent', {onclick: () => trigger()}, 
        m(Modal, {
        })
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('#parent>.hs-modal-frame');
        });
    });
});