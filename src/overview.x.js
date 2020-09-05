const render = () => m.mount(root, {view: () => m('.hs_white', { class: 'overview' }, [    
    m('.topGap'),

    // Buttons:
    m('.myButtons',[
        m('h2', 'Buttons'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.Button'}, 'Button'), `: Please click: (${clicked}-times clicked)`]),
        m(hsWidget.Button, { onclick: () => clicked++ }, 'click me'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.ToggleButton'}, 'ToggleButton'), `: Please Toggle between 1st, 2nd, and 3rd`]),
        m(hsWidget.ToggleButton, { 
            onclick: (item, state) => toggle = state
        }, content),
        m(hsWidget.GridColumns, {style:'height: 100px;'}, [
            m('', [
                m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.IconButton'}, 'IconButton'), `: Power ${icon}`]),
                m(hsWidget.IconButton, { 
                    mdi:'power',
                    onclick: (item) => icon = ['off', 'on'][item]
                }),
            ]),
            m('', [
                m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.IconButton'}, 'OnOffButton'), `: Power ${onOff}`]),
                m(hsWidget.OnOffButton, { 
                    onclick: (item, state) => onOff = state
                }, 'power'),
            ])
        ]),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Optionbuttons.RadioButtons'}, 'RadioButtons'), `: Select Station: ${radio}`]),
        m(hsWidget.RadioButtons, { onclick: (item) => radio = content[item]
        }, content),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Optionbuttons.OptionButtons'}, 'OptionButtons'), `: Select Option: '${Object.keys(options).map(k=>options[k]).join(" ")}'`]),
        m(hsWidget.OptionButtons, { 
            onclick: (item) => options[content[item]] = options[content[item]]? undefined : content[item]
        }, content),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Optionbuttons.IconButtons'}, 'IconButtons'), `: Select Option: '${Object.keys(iconsSel).map(k=>iconsSel[k]).join(" ")}'`]),
        m(hsWidget.IconButtons, { 
            class: 'hsIconButtons',
            onclick: (item) => iconsSel[icons[item]] = iconsSel[icons[item]]? undefined : icons[item]
        }, ['power', 'info', 'warn', 'stop'].map(i => m(hsWidget.Icon,{mdi:i}))),
    ]),



    // Menus:
    m('.myMenus',[
        m('h2', 'Menus'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Menu.Menu'}, 'Menu'), `: ${theContent} selected`]),
        m(hsWidget.Menu, { class: 'myMenu',
            initial: 1, // 0..2
            onclick: (item) => theContent = content[item]
        }, menuItems),
        m('.myMenuMain', `${theContent} managed by the app`),

        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Menu.MenuPanel'}, 'MenuPanel'), `:`]),
        m(hsWidget.MenuPanel, { class: 'myMenu',
            initial: 1, // 0..2
            menuItems: menuItems,
        }, content.map(c => `${c} managed by 'MenuPanel'`)),
    ]),

    // Modal Dialog Box:
    m('.myDialog',[
        m('h2.myGapModal', 'Modal Dialog Box'),
        m('h4', {onclick:() => showModal=true }, 
            [m('a',{href:'#!/api/hsWidget/hsWidget.Modal.Modal'}, 'Modal'), `: Click me to open a modal box (previous dismissals: ${dismissals})`]),
            !showModal? '' : m(hsWidget.Modal, 
                { dismiss: () => { showModal=false; dismissals++; }},
                m('', 'click on border or on the background to release')
            ) 
    ]),

    // Popup Box:
    m('.myPopup',[
        m('h2.myGapPopup', 'Popup Box'),
        m('h4', hsWidget.Popup.arm('!!Jack in the Box!!'), [
            m('a',{href:'#!/api/hsWidget/hsWidget.Popup.Popup'}, 'Popup'), `: Hover over me to open a popup`]),
            m(hsWidget.Popup, {})
    ]),



    // Collapsibles:
    m('.myColl',[
        m('h2', 'Collapsibles'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Collapsible.Collapsible'}, 'Collapsible'), ': ']),
        m(hsWidget.Collapsible, { 
            class:'myCollapsible',
            transition: 1000
        }, [
            m('.myTitle', 'click me to toggle - no arrows'), ...content 
        ]),
        m(hsWidget.Collapsible, { class:'myCollapsible', preArrow:true}, [
            m('.myTitle', 'click me to toggle - left arrow'), ...content 
        ]),
        m(hsWidget.Collapsible, { class:'myCollapsible', postArrow:true}, [
            m('.myTitle', 'click me to toggle - right arrow'), ...content 
        ]),
        m(hsWidget.Collapsible, { class:'myCollapsible', preArrow:true, postArrow:true}, [
            m('.myTitle', 'click me to toggle - both arrows'), ...content
        ]),
        m('', 'Background text, will be pushed down by the Collapsible')
    ]),

    // Typeahead Search:
    m('.myType',[
        m('h2.myGapTypeAhead', 'Typeahead Search'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.TypeAhead.TypeAhead'}, 'TypeAhead'), `: In-Memory List: ${hero.length? 'Selected1: ' + hero : 'Search for a Superhero'}`]),
        m(hsWidget.TypeAhead, { 
            placeholder: 'favorite hero',
            onsubmit: item => hero = item,
            list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
        }),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.TypeAhead.TypeAhead'}, 'TypeAhead'), `: Remote List: ${friend.length? 'Selected2: '+ friend : 'Search for a Friend'}`]),
        m(hsWidget.TypeAhead, { 
            placeholder: 'best friend',
            onsubmit: item => friend = item,
            autofocus: true,
            list: 'example/search.json'
        })
    ]),

    // Corner Buttons:
    m('.myCorner',[
        m('h2.myGapCornerButtons', 'Corner Buttons'),
        m('', Object.keys(hsWidget.ButtonSymbols).map(
            b => m('.myCornerPositioned', [
                btnClicked[b]? m('.myCornerClicked', 'Yayy!!') : m('', b),
                m(hsWidget.ToolbarButton, { 
                    symbols:hsWidget.ToolbarButton.getSymbol(b), onclick:click(b) 
                })
            ])
        ))
    ]),




    // Slider:
    m('.mySlider',[
        m('h2.mySliders', 'Sliders'),
        m('h4', `Nominal Slider: ${nom}`),
        m(hsWidget.Slider, { 
            range: ['one', 'two', 'three'],
            onchange: v => nom=v
        }),
        m('h4', `Continuous Slider: ${con}`),
        m(hsWidget.Slider, {
            range: [0, 100],
            onchange: v => con=Math.floor(v*10)/10
        })
    ]),

    // EditLabel
    m('.myELabel',[
        m('h2.myEditLabel', `EditLabel: '${editLabelContent}'`),
        m(hsWidget.EditLabel, { 
            placeholder: 'Enter here...',
            update: newValue => editLabelContent = newValue
        }, editLabelContent),
    ]),

    // EditSelect
    m('.myESelect',[
        m('h2.myEditSelect', `EditSelect: ${esSelected}`),
        m(hsWidget.EditSelect, { 
            selected: esSelected,
            update: newValue => esSelected = newValue
        }, ['first','second','third']),
    ]),

    // EditList
    m('.myEList',[
        m('h2.myEditList', 'EditList'),
        m(hsWidget.EditList, { 
            header: 'List Header',
            isExpanded:true
        }, elContent),
    ]),

    // EditCheckbox
    m('.myECheck',[
        m('h2.myEditCheckbox', 'EditCheckbox'),
        m(hsWidget.EditCheckbox, { 
            update: newValue => checkbox = newValue
        }, `${checkbox}: I am ${checkbox?'' : 'not '}a robot`),
    ]),
])})
// ]))});


//--------------------------------------
// supporting variables:
const menuItems = ['One', 'Two', 'Three'];
const content   = ['1st', '2nd', '3rd'];
let theContent = content[1];
let clicked = 0;
let radio = '';
let option = '';
let options = {};
let icons = ['power', 'info', 'warn', 'stop'];
let iconsSel = {};
let toggle = '';
let icon = '';
let onOff = ''; 
let added  = 0;
let removed  = 0;
const btnClicked = {};
let lastCornerButton = '';
let dismissals = 0;
let showModal = false;
let hero = '';
let friend = '';
let nom, con;
let editLabelContent = '';
let esSelected = '';
let elContent = [''];
let checkbox = false;

const click = (button) => () => {
   lastCornerButton = '';
   if (hsWidget.ButtonSymbols[button]) {
      lastCornerButton = m.trust(`last button pressed: ${hsWidget.ButtonSymbols[button].sym}`);
      btnClicked[button] = true;
      setTimeout(reset(button), 800);
   }
};

const reset = (button) => () => {
   btnClicked[button] = false;
   m.redraw();
}

render();
   