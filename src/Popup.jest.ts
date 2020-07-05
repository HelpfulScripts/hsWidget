import m from "mithril";
import { Popup }    from './Popup';
const root = window.document.createElement("div");


describe('EditCheckbox', () => {
    beforeAll(()=>{
        m.mount(root, {view: () => m('.hs-white', [
            m('h4', Popup.arm(`popup content`), `hover over me`),
            m(Popup, {})
          ])
       });
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});