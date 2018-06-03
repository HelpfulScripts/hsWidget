/**
 * # Toolbar Button
 * creates a set of buttons at the corner of a positioned panel.
 * 
 * ### Profile
 * invoked as `m(ToolbarButtons, { <Attributes> })`
 * 
 * ### Attributes (node.attrs):
 * - `symbols: string | string[]` a symbol, or array of symbols 
 * - `onclick: ()=>void` a function that is called when the modal box is dismissed
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * const buttons = {}
 * const keys = Object.keys(hswidget.ButtonSymbols);
 * const symbols = [];
 * let batch = [];
 * for (let i=0; i<keys.length; i++) {
 *    if (i % 4 === 0) {
 *       batch = []
 *       symbol.push(batch);
 *    }
 *    batch.push(keys[i]);
 * }
 * 
 * m.mount(root, {view: () => m('', [
 *    m('', keys.map(
 *       (b) => m('.myPositioned', [
 *          buttons[b]? m('.myClicked', 'Yayy!!') : m('', b),
 *          m(hswidget.ToolbarButtons, { symbol:hswidget.ToolbarButtons.getSymbol(b), onclick:click(b) })
 *       ])
 *    )), 
 *    m('', symbols.map(
 *       (batch) => m('.myPositioned', [
 *          m(hswidget.ToolbarButtons, { symbol:batch.map(b => hswidget.ToolbarButtons.getSymbol(b)), onclick:click(b) })
 *       ])
 *    ))
 * ])});
 * 
 * function click(button) {
 *      return () => {
 *          buttons[button] = true;
 *          setTimeout(reset(button), 800);
 *      }
 * }
 * 
 * function reset(button) {
 *      return () => {
 *          buttons[button] = false;
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
 *      width:  50px;
 * }
 * .hs-corner-button { color: #008; }
 * </file>
 * </example>
 */

 /** */
import { m, Vnode}  from 'hslayout'; 

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
    constructor(protected symbol='-') {}
    static getSymbol(name:string) {
        return ButtonSymbols[name]? ButtonSymbols[name].sym : '';
    }
    view(node:Vnode) {
        if (node.attrs.symbol.length) {
            return node.attrs.symbol.map((sym:string) => 
                m('.hs-corner-button', 
                    { onclick: node.attrs.onclick }, 
                    m.trust(sym))
            );
        } else {
            return m('.hs-corner-button', 
                { onclick: node.attrs.onclick }, 
                m.trust(node.attrs.symbol));
        }
    }
}

