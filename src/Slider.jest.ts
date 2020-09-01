window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());

const handle = { 
    className: 'hs_slider_handle',
    clientWidth:20,
    parentNode:<any>null
};

const slot = {
    className: 'hs_slider_slot',
    clientWidth: 400,
    offsetLeft:10,
    lastChild: handle,
    parentNode: <any>null
};

const slider = {
    className: 'hs_slider',
    offsetLeft:0,
    lastChild: slot
};

handle.parentNode = slot;
slot.parentNode = slider;

const myEvent = {
    clientX: 315,
    offsetX: 100,
    currentTarget: slider,
    target: slider,
    stopPropagation: ():void => {},
    preventDefault: ():void => {}
};
let evtResult:any;

describe('sliders', () => {
    const Slider = require('./Slider').Slider;
    const mq = require('mithril-query');
    const m = require("mithril");

    describe('continuous', () => {
        // const sl = {view: () => };
        const out = mq(m(Slider, {
            id:'mySlider1',
            range: [0, 100],
            onchange: (v:any) => evtResult = v
        }));
        it('renders', () => {
            out.should.have('.hs_slider');
            out.should.have('.hs_slider>.hs_slider_slot');
            out.should.have('.hs_slider>.hs_slider_slot>.hs_slider_marker');
        });
        it('reacts to mousedown', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs_slider', 'onmousedown', myEvent);
            expect(evtResult).toBe(27.5);
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs_slider', 'onmousedown', myEvent);
            myEvent.clientX = 700;
            out.trigger('.hs_slider', 'onmousemove', myEvent);
            expect(evtResult).toBe(100);
        });
        it('reacts to mouseout', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs_slider', 'onmousedown', myEvent);
            myEvent.clientX = 250;
            out.trigger('.hs_slider', 'onmouseout', myEvent);
            expect(evtResult).toBe(37.5);
            myEvent.clientX = 700;
            out.trigger('.hs_slider', 'onmousemove', myEvent);
            expect(evtResult).toBe(37.5);
        });
    });

    describe('nominal', () => {
        const out = mq(m('div', m(Slider, {
            id:'mySlider1',
            range: ['one', 'two', 'three'],
            onchange: (v:any) => evtResult = v
        })));
        it('renders', () => {
            out.should.have('.hs_slider');
            out.should.have('.hs_slider>.hs_slider_slot');
            out.should.have('.hs_slider>.hs_slider_slot>.hs_slider_marker');
        });
        it('reacts to mousedown', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.mousedown('.hs_slider', myEvent);
            expect(evtResult).toBe('two');
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 190;
            out.trigger('.hs_slider', 'onmousemove', myEvent);
            expect(evtResult).toBe('one');
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 410;
            out.trigger('.hs_slider', 'onmousemove', myEvent);
            expect(evtResult).toBe('three');
        });
        it('reacts to mouseup', () => {
            myEvent.clientX = 410;
            out.trigger('.hs_slider', 'onmouseup', myEvent);
            expect(evtResult).toBe('three');
        });
    });
    describe('default range', () => {
        const out = mq(m('div', m(Slider, {
            id:'mySlider1',
            onchange: (v:any) => evtResult = v
        })));
        it('renders', () => {
            out.should.have('.hs_slider');
            out.should.have('.hs_slider>.hs_slider_slot');
        });
    });
});