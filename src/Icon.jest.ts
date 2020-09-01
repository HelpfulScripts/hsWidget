import m                from "mithril";
import { Icon }         from './Icon';


const root = window.document.createElement("div");
describe('Icon', () => {
    beforeAll(()=>{
        m.mount(root, {view: () => 
            m('.white', {style:'background-color: white;'}, 
                Object.keys(Icon.predefined).map(k => m(Icon, { mdi:k}, k))
            )
        });
    });
    it('should match snapshot', () => {
        expect(root).toMatchSnapshot();
    });
});
   