import { m }      from 'hslayout';
import { EditSelect }    from './EditSelect';
const root = window.document.createElement("div");

const choices = ['pizza', 'chicken', 'fries'];
let selected = 'none';

describe('EditSelect', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m(EditSelect, {
            css: '.mySelect',
            from: choices,
            selected: selected,
            update: (newValue:string) => selected = newValue
        })});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});