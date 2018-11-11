import { Menu } from './Menu';
import { m } from './mithril';

const left  = ['0%', '25%', '50%', '75%'];
const right = ['75%', '50%', '25%', '0%'];
const title = ['1a', '2a', '3a', '4a'];

const root = window.document.createElement("div");

describe('hsMenu', () => {
    let menu:any;
    let cn:any;
    beforeEach(() => new Promise((resolve)=>{
        const md = { 
            items: title,
            clicked: (item:string) => { console.log('selected'); }
        };
        m.mount(root, {view: () => m(Menu, { desc: md }) }); 
        menu = root.childNodes[0]; // class: hs-menu
        const layout = menu.childNodes[0];
        cn = layout.childNodes;
        resolve();
    }));

    describe('Menu', () => {
        test('creation', ()=> expect(menu).toBeDefined());
        test('is menu', ()=> expect(menu.className.indexOf('hs-menu')).not.toBe(-1));
        test('is not a layout', ()=> expect(menu.className.indexOf('hs-layout')).toEqual(-1));
    });

    describe('Menu Items', () => {
        test("has 4 menu items", () => {
            return expect(cn.length).toEqual(4);
        });
        describe('for all children', ()=> Promise.resolve(title)
            .then((t) => t.map((c:any, i:any) => {
                const item = cn[i].childNodes[0];
                Promise.all([
                    test(`item ${i+1} layout has class hs-layout`, () => expect(c.className).toContain('hs-layout')),
                    test(`item ${i+1} layout has 1 child`, () => expect(c.childNodes.length).toEqual(1)),
                    test(`item ${i+1} layout left is ${left[i]}`, () => expect(c.style.left).toEqual(left[i])),
                    test(`item ${i+1} layout right is ${right[i]}`, () => expect(c.style.right).toEqual(right[i])),
                    test(`item ${i+1} layout top is 0%`, () => expect(c.style.top).toEqual('0%')),
                    test(`item ${i+1} layout bottom i8s 0%`, () => expect(c.style.bottom).toEqual('0%')),
                    test(`item ${i+1} has class hs-selectable`, () => expect(item.className.not.toContain('hs-selectable'))),
                    test(`item ${i+1} selected class`, () => expect(item.className).toContain('hs-selected')),
                    test(`item ${i+1} has 1 child`, () => expect(item.childNodes.length).toEqual(1)),
                    test(`item ${i+1} child leaf text ${title[i]}`, () => expect(item.childNodes[0].nodeValue).toEqual(title[i]))
                ]);
            })
        ));
    });
});

