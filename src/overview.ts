/**
# hsWidgets 

Helpful Scripts UI widgets.  
[`[Coverage Info]`](./data/src/hsWidget/coverage/)

[![npm version](https://badge.fury.io/js/hswidget.svg)](https://badge.fury.io/js/hswidget)
[![GitHub](https://img.shields.io/badge/GitHub-hsWidget-blue.svg)](https://github.com/helpfulscripts/hswidget)
[![docs](https://img.shields.io/badge/hsDocs-hsWidget-blue.svg)](https://helpfulscripts.github.io/hsWidget/#!/api/hsWidget/0)
[![Build Status](https://travis-ci.org/HelpfulScripts/hsWidget.svg?branch=master)](https://travis-ci.org/HelpfulScripts/hsWidget)
[![Dependencies Status](https://david-dm.org/helpfulscripts/hswidget.svg)](https://david-dm.org/helpfulscripts/hswidget)
[![Coverage Status](https://coveralls.io/repos/github/HelpfulScripts/hsWidget/badge.svg?branch=master)](https://coveralls.io/github/HelpfulScripts/hsWidget?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/HelpfulScripts/hsWidget/badge.svg?targetFile=package.json)](https://snyk.io/test/github/HelpfulScripts/hsWidget?targetFile=package.json)
[![NPM License](https://img.shields.io/badge/license-MIT-brightgreen.svg)](https://www.npmjs.com/package/hswidget)

___

**hsWidget** Provides various UI widgets for use with mithril:


| Widget | Description |
|========|=============|
| &nbsp; {@link Menu.Menu Menu} | A group of horizontal menu items that can trigger actions |
| &nbsp; {@link Button.Button Button} | A simple button widget |
| &nbsp; {@link ToggleButton.ToggleButton ToggleButton} | A button widget that toggleds through a number of items |
| &nbsp; {@link RadioButton.RadioButton RadioButton} | A radio button group widget: one selected at a time |
| &nbsp; {@link OptionsButton.OptionsButton OptionsButton} | An options button group widget: independently selected |
| &nbsp; {@link Collapsible Collapsible} | A panel that will expand znd collapse when the title is clicked |
| &nbsp; {@link Modal Modal} | A modal panel that will cover the entire window until released. |
| &nbsp; {@link AddRemove AddButton} | An inline `+` button that will open a form for adding new elements. |
| &nbsp; {@link AddRemove RemoveButton} | An inline `-` button that will remove an item. |
| &nbsp; {@link TypeAhead TypeAhead} | A TypeAhead search input form. |
| &nbsp; {@link Slider Slider} | A simple nominal or continuous slider. |

 * <example height=2700px>
 * <file name='script.js'>
 * const render = () => m.mount(root, {view: () => 
 *    m('.hs-white', m(hsLayout.Layout, {
 *      rows:['100px', '360px', '210px', '250px', '340px', '320px', '340px'], content: [m('',''),
 * 
 *    // Buttons:
 *    m('',[
 *      m('h2', 'Buttons'),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Button.Button'}, 'Button'), `: Please click: (${clicked}-times clicked)`]),
 *      m(hsWidget.Button, { desc: { name: 'click me', clicked: () => clicked++ }}),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.RadioButton.RadioButton'}, 'RadioButton'), `: Select Station: ${radio}`]),
 *      m(hsWidget.RadioButton, { desc: {
 *        items: ['1st', '2nd','3rd'], clicked: (item) => radio = item
 *      }}),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.OptionsButton.OptionsButton'}, 'OptionsButton'), `: Select Option: '${Object.keys(options).map(k=>options[k]).join(" ")}'`]),
 *      m(hsWidget.OptionsButton, { desc: {
 *        items: ['1st', '2nd','3rd'], clicked: (item) => options[item] = options[item]? undefined : item
 *      }}),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.ToggleButton.ToggleButton'}, 'ToggleButton'), `: Please Toggle between 1st, 2nd, and 3rd`]),
 *      m(hsWidget.ToggleButton, { desc: {
 *        items: ['1st', '2nd','3rd'], clicked: (item) => toggle = item
 *      }}),
 *    ]),
 * 
 *    // Menus:
 *    m('',[
 *      m('h2', 'Menus'),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Menu.Menu'}, 'Menu'), `: Please select:`]),
 *      m(hsWidget.Menu, { css: '.myMenu', desc: {
 *       items: menuItems,  defaultItem: 'Two',
 *       clicked: (item) => theContent = content[menuItems.indexOf(item)]
 *      }}),
 *      m('myMenuMain', theContent),
 *    ]),
 * 
 *    // Modal Dialog Box:
 *    m('',[
 *      m('h2.myGapModal', 'Modal Dialog Box'),
 *      m('h4', {onclick:() => trigger() }, 
 *          [m('a',{href:'#!/api/hsWidget/hsWidget.Modal.Modal'}, 'Modal'), `: Click me to open a modal box (previous dismissals: ${dismissals})`]),
 *      m(hsWidget.Modal, {
 *          width:  '300px',
 *          height: '200px',
 *          setTrigger: (t) => trigger = t,
 *          dismiss: () => dismissals++,
 *          content: m('', 'click on border or on the x to release')
 *      })
 *    ]),
 * 
 *    // Collapsibles:
 *    m('',[
 *      m('h2', 'Collapsibles'),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.Collapsible.Collapsible'}, 'Collapsible'), ': ']),
 *      m(hsWidget.Collapsible, { css:'.myCollapsible', components: [
 *          m('.myTitle', 'click me to toggle - no arrows'), content 
 *      ]}),
 *      m(hsWidget.Collapsible, { css:'.myCollapsible', preArrow:true, components: [
 *          m('.myTitle', 'click me to toggle - left arrow'), content 
 *      ]}),
 *      m(hsWidget.Collapsible, { css:'.myCollapsible', postArrow:true, components: [
 *          m('.myTitle', 'click me to toggle - right arrow'), content 
 *      ]}),
 *      m(hsWidget.Collapsible, { css:'.myCollapsible', preArrow:true, postArrow:true, components: [
 *          m('.myTitle', 'click me to toggle - both arrows'), content
 *      ]}),
 *      m('', 'Background text, will be pushed down by the Collapsible')
 *    ]),
 * 
 *    // Typeahead Search:
 *    m('',[
 *      m('h2.myGapTypeAhead', 'Typeahead Search'),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.TypeAhead.TypeAhead'}, 'TypeAhead'), `: In-Memory List: ${hero.length? 'Selected1: ' + hero : 'Search for a Superhero'}`]),
 *      m(hsWidget.TypeAhead, { 
 *          placeholder: 'favorite hero',
 *          onsubmit: item => hero = item,
 *          list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
 *      }),
 *      m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.TypeAhead.TypeAhead'}, 'TypeAhead'), `: Remote List: ${friend.length? 'Selected2: '+ friend : 'Search for a Friend'}`]),
 *      m(hsWidget.TypeAhead, { 
 *          placeholder: 'best friend',
 *          onsubmit: item => friend = item,
 *          autofocus: true,
 *          list: 'example/search.json'
 *      })
 *    ]),
 * 
 *    // Corner Buttons:
 *    m('',[
 *      m('h2.myGapCornerButtons', 'Corner Buttons'),
 *      //m('h4', [m('a',{href:'#!/api/hsWidget/hsWidget.ToolbarButton.ButtonSymbols'}, 'ButtonSymbols'), ', ', 
 *      //         m('a',{href:'#!/api/hsWidget/hsWidget.ToolbarButton.ToolbarButton'}, 'ToolbarButton'), ': ',
 *      //         lastCornerButton]),
 *      m('', Object.keys(hsWidget.ButtonSymbols).map(
 *          b => m('.myCornerPositioned', [
 *              btnClicked[b]? m('.myCornerClicked', 'Yayy!!') : m('', b),
 *              m(hsWidget.ToolbarButton, { 
 *                  symbols:hsWidget.ToolbarButton.getSymbol(b), onclick:click(b) 
 *              })
 *          ])
 *      ))
 *    ]),
 * 
 * 
 * 
 * 
 *    // Slider:
 *    m('',[
 *      m('h2.mySliders', 'Sliders'),
 *      m('h4', `Nominal Slider: ${nom}`),
 *      m(hsWidget.Slider, { 
 *          range: ['one', 'two', 'three'],
 *          onchange: v => nom=v
 *      }),
 *      m('h4', `Continuous Slider: ${con}`),
 *      m(hsWidget.Slider, {
 *          range: [0, 100],
 *          onchange: v => con=Math.floor(v*10)/10
 *      })
 *    ])
 * ]}))});
 * 
 * 
 * //--------------------------------------
 * // supporting variables:
 * const menuItems = ['One', 'Two', 'Three'];
 * const content   = ['1st', '2nd', '3rd'];
 * let  theContent = content[1];
 * let clicked = 0;
 * let radio = '';
 * let option = '';
 * let options = {};
 * let toggle = '';
 * let added  = 0;
 * let removed  = 0;
 * const btnClicked = {};
 * let lastCornerButton = '';
 * let dismissals = 0;
 * let trigger;
 * let hero = '';
 * let friend = '';
 * let nom, con;
 * 
 * const click = (button) => () => {
 *    lastCornerButton = '';
 *    if (hsWidget.ButtonSymbols[button]) {
 *       lastCornerButton = m.trust(`last button pressed: ${hsWidget.ButtonSymbols[button].sym}`);
 *       btnClicked[button] = true;
 *       setTimeout(reset(button), 800);
 *    }
 * };
 * 
 * const reset = (button) => () => {
 *    btnClicked[button] = false;
 *    m.redraw();
 * }
 *
 * render();
 * </file>
 *
 * <file name='style.css'>
 * .myMenuMain { 
 *    border:1px solid #ddd;
 *    border-top: 0px solid #ddd;
 * } 
 * .myMenu .hs-selectable { 
 *     background-color: #eef; 
 * }
 * .myMenu .hs-selected { 
 *     background-color: #ddf; 
 *     border-width:0px;
 * }
 * .myCollapsible {
 *     margin-bottom: 5px;
 * }
 * .myCollapsible .hs-collapsible-title {
 *     font-weight:bold;
 *     background-color: #eee;
 * }
 * .myCollapsible .hs-collapsible-expanded {
 *     margin-left: 10px;
 * }
 * .myCornerClicked { background-color: #efe; }
 * .myCornerPositioned { 
 *      position: relative; 
 *      display: inline-block;
 *      box-sizing: border-box;
 *      background-color: #eee; 
 *      text-align: center;
 *      font-size: 70%;
 *      margin:  2px;
 *      padding-top: 20px;
 *      height: 50px;
 *      width:  50px;
 * }
 * .hs-corner-button { color: #008; }
 * 
 * .hs-radio-buttons>.hs-column-layout>.hs-layout { border-color: transparent}
 * 
 * </file>
 * </example>
*/

/** */
