import * as widgets from './';
import m from "mithril";

const root = window.document.createElement("div");

const single = widgets.ToolbarButton.getSymbol('cross');
const multiple = [
    widgets.ToolbarButton.getSymbol('cross'),
    widgets.ToolbarButton.getSymbol('up')
];

describe('Toolbar', () => {
    beforeAll(()=>{
        m.mount(root, {view: () => m('', [
            m('.myPositioned', [
                 m(widgets.ToolbarButton, { symbols:single, onclick:()=>{} })
            ]),
            m('.myPositioned', [
                m(widgets.ToolbarButton, { symbols:multiple, onclick:()=>{} })
            ])
        ])});
    });
    it('creates', () => {
        expect(root).toMatchSnapshot();
    });
});
