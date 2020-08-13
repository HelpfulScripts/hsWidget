let dismissals = 0;
let modal = false;
m.mount(root, {view: () => m('.hs-white', [
     m('h4', {onclick:() => modal=true}, `click me (dismissed ${dismissals} times)`),
     !modal? m('') : m(hsWidget.Modal, { 
         dismiss: () => { dismissals++; modal = false; }
     }, m('', 'click border to release'))
   ])
});
