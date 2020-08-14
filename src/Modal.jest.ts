import { Modal } from './Modal';
import m from "mithril";

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let dismissals = 0;
let showModal = false;
const isHidden = () => !showModal;

describe('ModalDialog', () => {
    describe('with intermal hiding', () => {
        const out = mq(m('.parent', {onclick: () => { showModal=true; }}, 
            m(Modal, {
                dismiss: () => { dismissals++; showModal=false; },
                hideModal: isHidden
            },
            `click on border or on the x to release ${dismissals}`)
        ));
        it ('should have DOM structure', () => {
            out.should.not.have('.hs_modal');
            out.should.have('.hs_no_modal');
        });
        it ('should open on trigger', () => {
            expect(dismissals).toBe(0);
            out.click('.parent');
            out.should.contain('click on border or on the x to release');    
            out.should.have('.hs_modal');
            out.should.have('.hs_modal>.hs_modal_background');
        });
        it('should close on clicking the x', () => {
            expect(dismissals).toBe(0);
            out.click('.hs_modal_background');
            expect(dismissals).toBe(1);
            out.should.not.have('.parent>.hs_modal');
            out.should.have('.parent>.hs_no_modal');
        });
    });
});