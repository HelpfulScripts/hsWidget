let dismissals = 0;
let modal = false;
m.mount(root, {view: () => m('.hs_white', [
    m('h4', {onclick:() => modal=true}, `click me (dismissed ${dismissals} times)`),
    m(hsWidget.Modal, { 
        dismiss: () => { dismissals++; modal=false; },
        showModal: ()=>modal
    }, 
    m('', 'click border to release'))
])});
