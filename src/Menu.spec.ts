import {o, m} from 'hslayout';

import { Menu } from './Menu';

const left  = ['0%', '25%', '50%', '75%'];
const right = ['75%', '50%', '25%', '0%'];
const title = ['1a', '2a', '3a', '4a'];

o.spec('hsMenu', () => {
    let menu:any;
    o.before(() => {
        const md = { 
            items: title,
            changed: (item:string) => { console.log('selected'); }
        };
        m.mount(o.root, {view: () => m(Menu, { desc: md }) }); 
        menu = o.root.childNodes[0]; // class: hs-menu
    });

    o('Menu', () => {
        o(menu).notEquals(undefined)('creation');
        o(menu.className.indexOf('hs-menu')).notEquals(-1)("is menu");
        o(menu.className.indexOf('hs-layout')).equals(-1)("is not a layout");
    });

    o('Menu Items', () => {
        const layout = menu.childNodes[0];
        const cn = layout.childNodes;
        o(cn.length).equals(4)("has 4 menu items");
        cn.forEach((c:any, i:any) => {
            const item = c.childNodes[0];
            o(c.className.indexOf('hs-layout')).equals(0)(`item ${i+1} layout has class hs-layout`);
            o(c.childNodes.length).equals(1)(`item ${i+1} layout has 1 child`);
            o(c.style.left).equals(left[i])(`item ${i+1} layout left is ${left[i]}`);
            o(c.style.right).equals(right[i])(`item ${i+1} layout right is ${right[i]}`);
            o(c.style.top).equals('0%')(`iitem ${i+1} layout top is 0%`);
            o(c.style.bottom).equals('0%')(`item ${i+1} layout bottom i8s 0%`);
            o(item.className.indexOf('hs-selectable')).notEquals(-1)(`item ${i+1} has class hs-selectable`);
            o(item.className.includes('hs-selected')).equals((i===0)?true:false)(`item ${i+1} selected class`);
            o(item.childNodes.length).equals(1)(`item ${i+1} has 1 child`);
            o(item.childNodes[0].nodeValue).equals(title[i])(`item ${i+1} child leaf text ${title[i]}`);
        });
    });

});

