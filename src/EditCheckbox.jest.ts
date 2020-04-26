import { m }      from 'hslayout';
import { EditCheckbox }    from './EditCheckbox';
const root = window.document.createElement("div");

let selected = '';

describe('EditCheckbox', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m(EditCheckbox, {
            css: '.mySelect',
            update: (newValue:string) => selected = newValue
        })});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});