import { m }            from "hslayout";
import { MenuPanel }    from './Menu';

const root = window.document.createElement("div");


describe('MenuPanel', () => {
    beforeEach(() =>
        m.mount(root, {view: () => m(MenuPanel, {
            items: ["one", "two", "three"],  
            defaultItem: "two",
            content: ['1st', '2nd', '3rd']
        })})
    );

    test('layout', () => expect(root).toMatchSnapshot());
});