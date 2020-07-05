/**
 * # Toolbar Button
 * creates a set of buttons at the corner of a positioned panel.
 * 
 * ### Profile
 * invoked as `m(ToolbarButton, { <Attributes> })`
 * 
 * ### Attributes (node.attrs):
 * - `symbols: string | string[]` a symbol, or array of symbols 
 * - `onclick: ()=>void` a function that is called when the modal box is dismissed
 * 
 * ### Example
 * <example height=450>
 * <file name='script.js'>
 * const clicked = {}
 * const keys = Object.keys(hsWidget.ButtonSymbols);
 * const groupsOf4 = [];
 * let batch = [];
 * for (let i=0; i < keys.length; i++) {
 *    if (i % 4 === 0) {
 *       batch = []
 *       groupsOf4.push(batch);
 *    }
 *    batch.push(keys[i]);
 * }
 * 
 * m.mount(root, {view: () => m('', [
 *    m('', keys.map(       // single symbols
 *       bn => m('.myPositioned', [
 *          clicked[bn]? m('.myClicked', 'Yayy!!') : m('', bn),
 *          m(hsWidget.ToolbarButton, { symbols:hsWidget.ToolbarButton.getSymbol(bn), onclick:click(bn) })
 *       ])
 *    )), 
 *    m('', groupsOf4.map(  // groups of 4 symbols
 *       batch => m('.myPositioned', [
 *          clicked[batch[0]]? m('.myClicked', 'Yayy!!') : m('', batch[0]),
 *          m(hsWidget.ToolbarButton, { symbols:batch.map(bt => hsWidget.ToolbarButton.getSymbol(bt)), onclick:click(batch[0]) })
 *       ])
 *    ))
 * ])});
 * 
 * function click(button) {
 *      return () => {
 *          clicked[button] = true;
 *          setTimeout(reset(button), 800);
 *      }
 * }
 * 
 * function reset(button) {
 *      return () => {
 *          clicked[button] = false;
 *          m.redraw();
 *      }
 * }
 * </file>
 * <file name='style.css'>
 * .myClicked { background-color: #efe; }
 * .myPositioned { 
 *      position: relative; 
 *      display: inline-block;
 *      box-sizing: border-box;
 *      background-color: #fff; 
 *      text-align: center;
 *      font-size: 70%;
 *      margin:  2px;
 *      padding-top: 20px;
 *      height: 50px;
 *      width:  70px;
 * }
 * .hs-corner-button { color: #008; }
 * </file>
 * </example>
 */

 /** */
 import m from "mithril";
 type Vnode = m.Vnode<any, any>;
 
export const ButtonSymbols = {
    cross:      { sym: '&times;' },
    minus:      { sym: '&minus;'},
    plus:       { sym: '+'},
    dLeft:      { sym: '&laquo;'},
    dRight:     { sym: '&raquo;'},
    left:       { sym: '&lsaquo;'},
    right:      { sym: '&rsaquo;'},
    leftTri:    { sym: '&ltrif;'},
    rightTri:   { sym: '&rtrif;'},
    upTri:      { sym: '&utrif;'},
    downTri:    { sym: '&dtrif;'},
    up:         { sym: '&and;'},
    down:       { sym: '&or;'},
    lArrow:     { sym: '&larr;'},
    rArrow:     { sym: '&rarr;'},
    uArrow:     { sym: '&uarr;'},
    dArrow:     { sym: '&darr;'},
    empty:      { sym: '&#9675;'},
    emptySlash: { sym: '&empty;'},
    oSlash:     { sym: '&oslash;'},
    o:          { sym: '&omicron;'},
    lines3:     { sym: '&equiv;'},
    sum:        { sym: '&Sigma;'},
    ellipsis:   { sym: '&hellip;'},
    vertEllips: { sym: '&#8285;'},
    bullet:     { sym: '&bull;'},
    enter:      { sym: '&crarr;'},
    again:      { sym: '&#8635;'},
    start:      { sym: '&#8689;'},
    end:        { sym: '&#8690;'}
};

export class ToolbarButton {
    // constructor(protected symbols='-') {}
    static getSymbol(name:string) {
        return ButtonSymbols[name]? ButtonSymbols[name].sym : '';
    }
    view(node:Vnode) {
        if (typeof node.attrs.symbols === 'string') {
            return m('.hs-corner-button', 
                { onclick: node.attrs.onclick }, 
                m.trust(node.attrs.symbols)
            );
        } else {
            return m('.hs-corner-button', 
                    { onclick: node.attrs.onclick }, 
                    node.attrs.symbols.map((sym:string) =>m.trust(sym))
            );
        }
    }
}

