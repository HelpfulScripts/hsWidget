import m from "mithril";
import { EditList }    from './EditList';

describe('EditList', () => {
    describe('Collapsible', () => {
        const root = window.document.createElement("div");
        const content1 = [''];
            
        beforeAll(()=>{
            m.mount(root, { view: () => m(EditList, {
                header: 'list', isExpanded:true,
                rows:content1
            })});
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
                rows: content1
            })});
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
                rows:content1
            })});
        });

        it('should match snapshot', () => {
            expect(root).toMatchSnapshot();
        });
    });
});