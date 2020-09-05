
/* use: import { mdiLeaf } from '@mdi/js';  */
const mdiLeaf = "M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z";


m.mount(root, {view: () => 
    m(hsWidget.Grid, {style:'background-color: white;', rows:'' }, [
        m('h3', 'Examples:'),
        m(hsWidget.Icon, { mdi:'power' }),
        m(hsWidget.Icon, 'default'),
        m(hsWidget.Icon, { class:'hui', mdi: mdiLeaf }, 'leaf'),
        m(hsWidget.Icon, { mdi: 'stop', style:'height: 2em' }, '!Stop!'),
        m(hsWidget.Icon, { mdi: 'warn', style:'height: 4em' }, m('', ['Warn?', 'Again'])),
        m('h3', 'Predfined icons:'),
        ...Object.keys(hsWidget.Icon.predefined).map(k => m(hsWidget.Icon, { mdi:k }, k))
    ])
});
   