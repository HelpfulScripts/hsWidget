window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());

const handle = { 
    className: 'hs-slider-handle',
    clientWidth:20,
    parentNode:<any>null
};

const slot = {
    className: 'hs-slider-slot',
    clientWidth: 400,
    offsetLeft:10,
    lastChild: handle,
    parentNode: <any>null
};

const slider = {
    className: 'hs-slider',
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
            out.should.have('.hs-slider');
            out.should.have('.hs-slider>.hs-slider-slot');
            out.should.have('.hs-slider>.hs-slider-slot>.hs-slider-marker');
        });
        it('reacts to mousedown', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs-slider', 'onmousedown', myEvent);
            expect(evtResult).toBe(27.5);
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs-slider', 'onmousedown', myEvent);
            myEvent.clientX = 700;
            out.trigger('.hs-slider', 'onmousemove', myEvent);
            expect(evtResult).toBe(100);
        });
        it('reacts to mouseout', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.trigger('.hs-slider', 'onmousedown', myEvent);
            myEvent.clientX = 250;
            out.trigger('.hs-slider', 'onmouseout', myEvent);
            expect(evtResult).toBe(37.5);
            myEvent.clientX = 700;
            out.trigger('.hs-slider', 'onmousemove', myEvent);
            expect(evtResult).toBe(37.5);
        });
    });

    describe('nominal', () => {
        const out = mq(m(Slider, {
            id:'mySlider1',
            range: ['one', 'two', 'three'],
            onchange: (v:any) => evtResult = v
        }));
        it('renders', () => {
            out.should.have('.hs-slider');
            out.should.have('.hs-slider>.hs-slider-slot');
            out.should.have('.hs-slider>.hs-slider-slot>.hs-slider-marker');
        });
        it('reacts to mousedown', () => {
            myEvent.clientX = 210;
            myEvent.offsetX = 120;
            out.mousedown('.hs-slider', myEvent);
            expect(evtResult).toBe('two');
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 190;
            out.trigger('.hs-slider', 'onmousemove', myEvent);
            expect(evtResult).toBe('one');
        });
        it('reacts to mousemove', () => {
            myEvent.clientX = 410;
            out.trigger('.hs-slider', 'onmousemove', myEvent);
            expect(evtResult).toBe('three');
        });
    });
});