if (!global['window']) {
    global['window'] = require("mithril/test-utils/browserMock.js")();
    global['document'] = window.document;
}
const o = require("mithril/ospec/ospec");
const m = require("mithril");

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
        menu = o.root.childNodes[0];
    });

    o('Menu', () => {
        o(menu).notEquals(undefined)('creation');
        o(menu.className.indexOf('hs-menu')).notEquals(-1)("is menu");
        o(menu.className.indexOf('hs-layout')).notEquals(-1)("is layout");
    });

    o('Menu Items', () => {
        const cn = menu.childNodes;
        o(cn.length).equals(4)("has 4 menu items");
        cn.forEach((c:any, i:any) => {
            o(c.className.indexOf('hs-selectable')).notEquals(-1)(`item ${i+1} menu-item class`);
            o(c.className.indexOf('hs-layout')).notEquals(-1)(`item ${i+1} layout class`);
            o(c.className.includes('hs-selected')).equals((i===0)?true:false)(`item ${i+1} selected class`);
            o(c.style.left).equals(left[i])(`item ${i+1} left`);
            o(c.style.right).equals(right[i])(`item ${i+1} right`);
            o(c.style.top).equals('0%')(`item ${i+1} top`);
            o(c.style.bottom).equals('0%')(`item ${i+1} bottom`);
            o(c.childNodes.length).equals(1)(`item ${i+1} num children`);
            o(c.childNodes[0].className).equals('hs-leaf')(`item ${i+1} child leaf`);
            o(c.childNodes[0].childNodes[0].nodeValue).equals(title[i])(`item ${i+1} child leaf text`);
        });
    });

});

