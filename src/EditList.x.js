let content1 = [''];
let content2 = [];

m.mount(root, {view: () => m('div', [
   m('h4', `simple content: '${content1.join(', ')}'`),
   m(hsWidget.EditList, {
     rows: content1,
   }),

   m('h4', `complex content: '${content2.map(r => `${r.value}:${r.selected}`).join(', ')}'`),
   m(hsWidget.EditList, {
     css: '.myList',
     header: 'List Header',
     defaultRow: {value:'', selected:''},
     rows: content2,
     isEmpty: (row) => !(row.value && row.value.length),   // undefined or empty value
     columnLayout: ['70%', '30%'],
     rowRender:(row, i) => [
         m(hsWidget.EditLabel, {
             css: '.myListElement',
             content: row.value,
             placeholder: 'description',
             update: value => {
                 content2[i] = content2[i] || {};
                 content2[i].value = value;
             }
         }),
         m(hsWidget.EditSelect, {
             css: '.myListElement',
             selected: row.value,
             from: ['high', 'med', 'low'],
             update: value => {
                 content2[i] = content2[i] || {};
                 content2[i].selected = value;
             }
         }),
      ]
   })
])});


