import m from "mithril";
import { EditTextarea }    from './EditTextarea';
const root = window.document.createElement("div");

let content = '';

describe('EditTextarea', () => {
    beforeAll(()=>{
        m.mount(root, {view: () => m('div', [
           m('h3', 'Edit Label Example'),
           m('div', [
             m('span', `current content: '${content}'`),
             m(EditTextarea, {
                 class: 'myLabel',
                 placeholder: 'Enter Value',
                 update: (newValue:string) => content = newValue
             }, content)
           ])
        ])});    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});