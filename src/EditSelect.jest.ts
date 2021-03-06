import m from "mithril";
import { EditSelect }    from './EditSelect';
const root = window.document.createElement("div");

const choices = ['pizza', 'chicken', 'fries'];
let selected = 'none';

describe('EditSelect', () => {
    describe('with initial', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m(EditSelect, {
                class: 'mySelect',
                initial: 'fries',
                update: (newValue:string) => selected = newValue
            }, choices)});
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });   
    describe('without initial', () => {
        beforeAll(()=>{
            m.mount(root, { view: () => m(EditSelect, {
                class: 'mySelect',
                update: (newValue:string) => selected = newValue
            }, choices)});
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });   
});