import { m }      from 'hslayout';
import { EditList }    from './EditList';
const root = window.document.createElement("div");

const content1 = [''];

describe('EditList', () => {
    beforeAll(()=>{
        m.mount(root, { view: () => m(EditList, {
            rows: content1,
        })});
    });

    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});