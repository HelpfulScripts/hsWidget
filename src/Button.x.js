let times = 0;
let index = 0;
let state = '?';

const states = [
    {state:'Alpha', icon:'info'},
    {state:'Beta',  icon:'warn'},
    {state:'Gamma', icon:'stop'},
];

let text='';

m.mount(root, {view: () => m('', { style:'background-color:white; padding:20px 0;'}, [
        m('h4', `${text}: pushed ${times} times`),
        m(hsWidget.GridColumns, {style:'height:50px'}, [
            m(hsWidget.Button, { 
                    class:'icon1',
                    onclick: i => { times++; state=i; text='Stateless Pushbutton' },
                },
                m(hsWidget.Icon, {mdi:'info'})
            ),
            m(hsWidget.ToggleButton, { 
                    class:'icon2',
                    onclick: i => { times++; state=i; text=`2-state ToggleButton in numeric state ${state}` },
                },[
                    m(hsWidget.Icon, {mdi:'stop'}), m(hsWidget.Icon, {mdi:'info'})
                ]
            ),
            m(hsWidget.OnOffButton, { 
                    onclick: (i, newState) => { times++; state=i; text=`OnOffbutton in state '${newState}'` },
                }, '<>'
            ),
            m(hsWidget.IconButton, { 
                    onclick: (i, newState) => { times++; state=i; text=`Iconbutton in state '${newState}'` },
                }, m(hsWidget.Icon, {mdi:'power'})
            ),
        ]),
    m('h4', 'Simple stateless Pushbutton:'),
    m(hsWidget.Button, 
        { 
            class:'simple',
            onclick:() => times++, 
            style:'width:200px;' 
        },
        `clicked ${times} times`
    ),
    m('h4', 'ToggleButton (3 states):'),
    m(hsWidget.ToggleButton, 
        { 
            class:'toggle',
            onclick: i => index = i, 
        },
        states.map(s => m(hsWidget.Icon, {mdi:s.icon}, `state: ${s.state}`))
    )
])});
   
