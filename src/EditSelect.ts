/**
 * # EditSelect
 * Provides a text label with pulldown select capability
 * 
 * ### Attributes:
 * - from: `string[]` the array to select from
 * - selected: `string` the initial string to show in the text label
 * - css: the css selector to add to the field
 * - update: callback function called when the input field looses focus
 * - **popup**?: `string`: optional message to show in a {@link Popup popup box} upon mouseover.
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * const choices = ['pizza', 'chicken', 'fries'];
 * let selected = 'none';
 * m.mount(root, {view: () => m('div', [
 *    m('h3', 'Edit Select Example'),
 *    m('div', [
 *      m('span', `current content: '${selected}'`),
 *      m(hsWidget.EditSelect, {
 *          css: '.mySelect',
 *          from: choices,
 *          selected: selected,
 *          update: newValue => selected = newValue
 *      })
 *    ])
 * ])});
 * 
 * </file>
 * <file name='style.css'>
 * .mySelect {  
 * }
 * </file>
 * </example>
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import { Log }      from 'hsutil';import { Popup } from './Popup';
  const log = new Log('EditSelect');


export class EditSelect {
    update:(r:string) => void;
    selectable = false;

    click() {
        this.selectable = true;
    }

    select(e:any) { 
        this.update(e.currentTarget.value);
        this.selectable = false;
    }

    view(node:Vnode) {
        const select = this;
        const attrs = (popup:string) => popup? Popup.arm(popup, { onchange:select.select.bind(select)}) : { onchange:select.select.bind(select)};
        this.update = node.attrs.update;
        const css = node.attrs.css || '';
        return m(`select.hsedit_select${css}`, attrs(node.attrs.popup), 
            node.attrs.from.map((o:string) => node.attrs.selected===o?
                m('option.hsedit_select_option.selected', { value: o, selected:true }, o) :
                m('option.hsedit_select_option', { value: o }, o)));
    }
}