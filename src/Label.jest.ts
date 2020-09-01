// import * as hswidget from './';
import { Label }    from './Label';
import m from "mithril";

const root = window.document.createElement("div");

describe('Label', () => {
    describe('should have DOM structure', () => {
        beforeAll(() => {
            m.mount(root, { view: () => m(Label, {
                class: 'myLabel',
                style: 'text-align: right;',
            }, 'This is a label')});
        });
        it ('matches', () => {
            expect(root).toMatchSnapshot();
        });
    });
    describe('should work with defaults', () => {
        beforeAll(() => {
            m.mount(root, { view: () => m(Label)});
        });
        it ('matches', () => {
            expect(root).toMatchSnapshot();
        });
    });
});