let times = 0;
let index = 0;

const states = [
    {text:`important`, icon:'info' },
    {text:`urgent`,    icon:'warn' },
    {text:`immediate`, icon:'stop' },
];

let optionStates = [0,0,0];
let radioStates = [1,0,0];

m.mount(root, {view: () => m('', { style:'background-color:white; padding:20px 20px;'}, [
    m('h4', `OptionButtons: [${optionStates.join(', ')}]`),
    m(hsWidget.OptionButtons, { 
            class:'simple',
            onclick:(newIndex, newState, states) => {
                times++;
                index = newIndex;
                optionStates = states;
            }, 
        }, 
        // the button content to show
        states.map(s => m(hsWidget.Icon, {mdi:s.icon}, s.text))
    ),
    m('h4', `RadioButtons: [${radioStates.join(', ')}]`),
    m(hsWidget.RadioButtons, { 
            class:'simple',
            onclick:(newIndex, newState, states) => {
                times++;
                index = newIndex;
                radioStates = states;
            }, 
        }, 
        // the button content to show
        states.map(s => m(hsWidget.Icon, {mdi:s.icon}, s.text))
    ),
])});
   
