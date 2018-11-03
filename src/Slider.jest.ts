import { Slider } from './Slider';
import { m }    from 'hslayout';

window = Object.assign(require('mithril/test-utils/domMock.js')(), require('mithril/test-utils/pushStateMock')());
const mq = require('mithril-query');

const handle = { 
    className: 'hs-slider-handle',
    clientWidth:20,
    offsetLeft:50,
    parentNode:null
};

const slot = {
    className: 'hs-slider-slot',
    clientWidth: 400,
    offsetLeft:10,
    lastChild: handle,
    parentNode: null
};

const slider = {
    className: 'hs-slider',
    offsetLeft:0,
    lastChild: slot
};

handle.parentNode = slot;
slot.parentNode = slider;

const event = {
    clientX: 315,
    offsetX: 100,
    currentTarget: slider,
    target: slider,
    stopPropagation: () => null,
    preventDefault: () => null
};
let evtResult;

describe('sliders', () => {
    describe('continuous', () => {
        const out = mq(m(Slider, {
            id:'mySlider1',
            range: [0, 100],
            onchange: v => evtResult = v
        }));
        it('renders', () => {
            out.should.have('.hs-slider');
            out.should.have('.hs-slider>.hs-slider-slot');
            out.should.have('.hs-slider>.hs-slider-slot>.hs-slider-marker');
        });
        it('reacts to mousedown', () => {
            out.mousedown('.hs-slider', event);
            expect(evtResult).toBe(22.5);
        });
        it('reacts to mousemove', () => {
            event.clientX = 700;
            out.trigger('.hs-slider', 'onmousemove', event);
            expect(evtResult).toBe(100);
        });
        it('reacts to mouseout', () => {
            event.offsetX = 20;
            out.mousedown('.hs-slider', event);
            event.clientX = -100;
            out.trigger('.hs-slider', 'onmouseout', event);
            expect(evtResult).toBe(0);
        });
    });

    describe('nominal', () => {
        const out = mq(m(Slider, {
            id:'mySlider1',
            range: ['one', 'two', 'three'],
            onchange: v => evtResult = v
        }));
        it('renders', () => {
            out.should.have('.hs-slider');
            out.should.have('.hs-slider>.hs-slider-slot');
            out.should.have('.hs-slider>.hs-slider-slot>.hs-slider-marker');
        });
        it('reacts to mousedown', () => {
            event.clientX = 40;
            out.mousedown('.hs-slider', event);
            expect(evtResult).toBe('one');
        });
        it('reacts to mousemove', () => {
            event.clientX = 400;
            out.trigger('.hs-slider', 'onmousemove', event);
            expect(evtResult).toBe('three');
        });
    });
});