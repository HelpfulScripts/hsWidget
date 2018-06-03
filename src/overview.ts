/**
# hsWidgets 
Provides various UI widgets:

| Widget | Description |
|========|=============|
| &nbsp; {@link Menu.Menu Menu} | A group of horizontal menu items that can trigger actions |
| &nbsp; {@link Button.Button Button} | A simple button widget |
| &nbsp; {@link Collapsible Collapsible} | A panel that will expand znd collapse when the title is clicked |
| &nbsp; {@link Modal Modal} | A modal panel that will cover the entire window until released. |
| &nbsp; {@link AddRemove AddButton} | An inline `+` button that will open a form for adding new elements. |
| &nbsp; {@link AddRemove RemoveButton} | An inline `-` button that will remove an item. |
| &nbsp; {@link TypeAhead TypeAhead} | A TypeAhead search input form. |

 * <example height=2050px>
 * <file name='script.js'>
 * const render = () => m.mount(root, {view: () => m('.hs-white', [
 * 
 *    m('h2.myGapButtons', 'Buttons'),
 *    m('h4', `Please click: (${clicked}-times clicked)`),
 *    m(hswidget.Button, { desc: {
 *        name: 'click me',
 *        clicked: () => clicked++
 *    }}),
 *    m('h4', `Select Radio Station: ${radio}`),
 *    m(hswidget.RadioButton, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        changed: (item) => radio = item
 *    }}),
 *    m('h4', `Please Toggle between 1st, 2nd, and 3rd`),
 *    m(hswidget.ToggleButton, { desc: {
 *        items: ['1st', '2nd','3rd'],
 *        changed: (item) => toggle = item
 *    }}),
 * 
 *    m('h2.myGapMenus', 'Menus'),
 *    m('h4', 'Please select:'),
 *    m(hswidget.Menu, { css: '.myMenu', desc: {
 *       items: menuItems,
 *       defaultItem: 'Two',
 *       changed: (item) => theContent = content[menuItems.indexOf(item)]
 *    }}),
 *    m('myMenuMain', theContent),
 * 
 *    m('h2.myGapModal', 'Modal Dialog Box'),
 *    m('h4', {onclick:() => showModal = true }, 'Click me to open a modal box'),
 *    showModal? m(hswidget.Modal, {
 *       width:  '300px',
 *       height: '200px',
 *       dismiss: () => showModal = false,
 *       content: m('', 'click on border or on the x to release')
 *    }) : undefined,
 * 
 *    m('h2.myGapCollapsibless', 'Collapsibles'),
 *    m(hswidget.Collapsible, { css:'.myCollapsible', components: [
 *       m('.myTitle', 'click me to toggle - no arrows'), content 
 *    ]}),
 *    m(hswidget.Collapsible, { css:'.myCollapsible', preArrow:true, components: [
 *       m('.myTitle', 'click me to toggle - left arrow'), content 
 *    ]}),
 *    m(hswidget.Collapsible, { css:'.myCollapsible', postArrow:true, components: [
 *       m('.myTitle', 'click me to toggle - right arrow'), content 
 *    ]}),
 *    m(hswidget.Collapsible, { css:'.myCollapsible', preArrow:true, postArrow:true, components: [
 *       m('.myTitle', 'click me to toggle - both arrows'), content
 *    ]}),
 *    m('', 'Background text, will be pushed down by the Collapsible'),
 * 
 *    m('h2.myGapTypeAhead', 'Typeahead Search'),
 *    m('h4', 'In-Memory List: ' + hero.length? `Selected: ${hero}` : 'Search for a Superhero'),
 *    m(hswidget.TypeAhead, { 
 *       placeholder: 'favorite hero',
 *       onsubmit: item => hero = item,
 *       list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
 *    }),
 *    m('h4', `Remote List: ${friend.length? 'Selected: '+ friend : 'Search for a Friend'}`),
 *    m(hswidget.TypeAhead, { 
 *       placeholder: 'best friend',
 *       onsubmit: item => friend = item,
 *       autofocus: true,
 *       list: 'example/search.json'
 *    }),
 *
 *    m('h2.myGapCornerButtons', 'Corner Buttons'),
 *    m('h4', lastCornerButton),
 *    m('', Object.keys(hswidget.ButtonSymbols).map(
 *       (b) => m('.myCornerPositioned', [
 *          buttons[b]? m('.myCornerClicked', 'Yayy!!') : m('', b),
 *          m(hswidget.ToolbarButtons, { symbol:hswidget.ToolbarButtons.getSymbol(b), onclick:click(b) })
 *       ])
 *    )),
 * ])});
 * 
 * 
 * //--------------------------------------
 * // supporting variables:
 * const menuItems = ['One', 'Two', 'Three'];
 * const content   = ['1st', '2nd', '3rd'];
 * let  theContent = content[1];
 * let clicked = 0;
 * let radio = '';
 * let toggle = '';
 * const buttons = {};
 * let lastCornerButton = '';
 * let showModal = false;
 * let hero = '';
 * let friend = '';
 * 
 * const click = (button) => () => {
 *    lastCornerButton = '';
 *    if (hswidget.ButtonSymbols[button]) {
 *       lastCornerButton = m.trust(`last button pressed: ${hswidget.ButtonSymbols[button].sym}`);
 *       buttons[button] = true;
 *       setTimeout(reset(button), 800);
 *    }
 * };
 * 
 * const reset = (button) => () => {
 *    buttons[button] = false;
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
 *     padding-left: 3px;
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
 * .myGapButtons        { margin-top: 90px; }
 * .myGapMenus          { margin-top: 80px; }
 * .myGapModal          { margin-top: 50px; }
 * .myGapCollapsibless  { margin-top: 115px; }
 * .myGapTypeAhead      { margin-top: 130px; }
 * .myGapCornerButtons  { margin-top: 105px; }
 * </file>
 * </example>
*/

/** */
