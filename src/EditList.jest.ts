import m from "mithril";
import { EditList }    from './EditList';

describe('EditList', () => {
    describe('Collapsible', () => {
        const root = window.document.createElement("div");
        const content1 = [''];
            
        beforeAll(()=>{
            m.mount(root, { view: () => 
                m(EditList, {header: 'list', isExpanded:true}, content1)
            });
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });
    describe('Non-Collapsible with header', () => {
        const root = window.document.createElement("div");
        const content1 = [''];
            
        beforeAll(()=>{
            m.mount(root, { view: () => m(EditList, {
                header: 'list',
                collapsible: false,
            }, content1)});
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });
    describe('Non-Collapsible, no header', () => {
        const root = window.document.createElement("div");
        const content1 = [''];
            
        beforeAll(()=>{
            m.mount(root, { view: () => m(EditList, {
                collapsible: false,
            }, content1)});
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });
});