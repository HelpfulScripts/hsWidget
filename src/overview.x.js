const render = () => m.mount(root, {view: () => 
    m('.hs-white', m(hsLayout.Layout, {
        rows:['100px', '400px', '180px', '180px', '250px', '340px', '320px', '340px', '250px', '180px', '180px', 'fill'], content: [m('',''),

    // Buttons:
    m('',[
        m('h2', 'Buttons'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.Button'}, 'Button'), `: Please click: (${clicked}-times clicked)`]),
        m(hsWidget.Button, { desc: { name: 'click me', clicked: () => clicked++ }}),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.RadioButton.RadioButton'}, 'RadioButton'), `: Select Station: ${radio}`]),
        m(hsWidget.RadioButton, { desc: {
            items: ['1st', '2nd','3rd'], clicked: (item) => radio = item
        }}),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.OptionsButton.OptionsButton'}, 'OptionsButton'), `: Select Option: '${Object.keys(options).map(k=>options[k]).join(" ")}'`]),
        m(hsWidget.OptionsButton, { desc: {
            items: ['1st', '2nd','3rd'], clicked: (item) => options[item] = options[item]? undefined : item
        }}),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.ToggleButton.ToggleButton'}, 'ToggleButton'), `: Please Toggle between 1st, 2nd, and 3rd`]),
        m(hsWidget.ToggleButton, { desc: {
            items: ['1st', '2nd','3rd'], clicked: (item) => toggle = item
        }}),
    ]),

    // Menus:
    m('',[
        m('h2', 'Menus'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Menu.Menu'}, 'Menu'), `: Please select:`]),
        m(hsWidget.Menu, { css: '.myMenu', desc: {
            items: menuItems,  defaultItem: 'Two',
        clicked: (item) => theContent = content[menuItems.indexOf(item)]
        }}),
        m('myMenuMain', theContent),
    ]),

    // Modal Dialog Box:
    m('',[
        m('h2.myGapModal', 'Modal Dialog Box'),
        m('h4', {onclick:() => showModal=true }, 
            [m('a',{href:'#!/api/hsWidget/hsWidget.Modal.Modal'}, 'Modal'), `: Click me to open a modal box (previous dismissals: ${dismissals})`]),
            !showModal? '' : m(hsWidget.Modal, 
                { dismiss: () => { showModal=false; dismissals++; }},
                m('', 'click on border or on the background to release')
            ) 
    ]),

    // Popup Box:
    m('',[
        m('h2.myGapPopup', 'Popup Box'),
        m('h4', hsWidget.Popup.arm('!!Jack in the Box!!'), [
            m('a',{href:'#!/api/hsWidget/hsWidget.Popup.Popup'}, 'Popup'), `: Hover over me to open a popup`]),
            m(hsWidget.Popup, {})
    ]),

    // Collapsibles:
    m('',[
        m('h2', 'Collapsibles'),
        m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Collapsible.Collapsible'}, 'Collapsible'), ': ']),
        m(hsWidget.Collapsible, { css:'.myCollapsible', components: [
            m('.myTitle', 'click me to toggle - no arrows'), content 
        ]}),
        m(hsWidget.Collapsible, { css:'.myCollapsible', preArrow:true, components: [
            m('.myTitle', 'click me to toggle - left arrow'), content 
        ]}),
        m(hsWidget.Collapsible, { css:'.myCollapsible', postArrow:true, components: [
            m('.myTitle', 'click me to toggle - right arrow'), content 
        ]}),
        m(hsWidget.Collapsible, { css:'.myCollapsible', preArrow:true, postArrow:true, components: [
            m('.myTitle', 'click me to toggle - both arrows'), content
        ]}),
        m('', 'Background text, will be pushed down by the Collapsible')
    ]),

    // Typeahead Search:
    m('',[
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
    m('',[
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
    m('',[
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
    m('',[
        m('h2.myEditLabel', `EditLabel: '${editLabelContent}'`),
        m(hsWidget.EditLabel, { 
            placeholder: 'Enter here...',
            content: editLabelContent,
            update: newValue => editLabelContent = newValue
        }),
    ]),

    // EditSelect
    m('',[
        m('h2.myEditSelect', `EditSelect: ${esSelected}`),
        m(hsWidget.EditSelect, { 
            from: ['first','second','third'],
            selected: esSelected,
            update: newValue => esSelected = newValue
        }),
    ]),

    // EditList
    m('',[
        m('h2.myEditList', 'EditList'),
        m(hsWidget.EditList, { 
            header: 'List Header',
            rows: elContent,
        }),
    ]),
]}))});


//--------------------------------------
// supporting variables:
const menuItems = ['One', 'Two', 'Three'];
const content   = ['1st', '2nd', '3rd'];
let  theContent = content[1];
let clicked = 0;
let radio = '';
let option = '';
let options = {};
let toggle = '';
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
   