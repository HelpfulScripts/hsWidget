let content1 = [''];
let content2 = [];

m.mount(root, {view: () => m('div', [
   m('h4', `simple content: '${content1.join(', ')}'`),
   m(hsWidget.EditList, {}, content1),

   m('h4', `complex content: '${content2.map(r => `${r.value}:${r.selected}`).join(', ')}'`),
   m(hsWidget.EditList, {
     css: '.myList',
     header: 'List Header',
     defaultRow: {value:'', selected:''},
     isEmpty: (row) => !(row.value && row.value.length),   // undefined or empty value
     columnLayout: ['70%', '30%'],
     rowRender:(row, i) => [
         m(hsWidget.EditLabel, {
             class: 'myListElement',
             placeholder: 'description',
             update: value => {
                 content2[i] = content2[i] || {};
                 content2[i].value = value;
             }
         }, row.value),
         m(hsWidget.EditSelect, {
             class: 'myListElement',
             selected: row.value,
             update: value => {
                 content2[i] = content2[i] || {};
                 content2[i].selected = value;
             }
         }, ['high', 'med', 'low']),
      ]
   }, content2)
])});


