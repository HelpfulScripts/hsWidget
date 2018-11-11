import * as hswidget from './';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

let dismissals = 0;
let trigger: ()=> {};

describe('ModalDialog', () => {
    const out = mq(m('#parent', {
            onclick: () => trigger()
        }, 
        m(hswidget.Modal, {
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
        // out.log('#parent');
        expect(dismissals).toBe(1);
        out.should.not.have('#parent>.hs-modal-frame');
        out.should.have('#parent>span');
    });
});