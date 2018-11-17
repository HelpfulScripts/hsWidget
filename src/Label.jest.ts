import * as hswidget from './';
import { m }    from 'hslayout';

const root = window.document.createElement("div");

describe('Label', () => {
    describe('should have DOM structure', () => {
        beforeAll(() => {
            m.mount(root, { view: () => m(hswidget.Label, {
                css: '.myLabel',
                style: 'text-align: right;',
                text: 'This is a label'
            })});
        });
        it ('matches', () => {
            expect(root).toMatchSnapshot();
        });
    });
    describe('should work with defaults', () => {
        beforeAll(() => {
            m.mount(root, { view: () => m(hswidget.Label, {
            })});
        });
        it ('matches', () => {
            expect(root).toMatchSnapshot();
        });
    });
});