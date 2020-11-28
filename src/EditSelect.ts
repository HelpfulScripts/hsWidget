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
 *          class: 'mySelect',
 *          initial: selected,
 *          update: newValue => selected = newValue
 *      }, choices)
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
import { Log }      from 'hsutil';  const log = new Log('EditSelect');
import { Popup }    from './Popup';
import { Widget, WidgetAttrs, ViewResult }   from "./Widget";
import { Vnode }    from "./Widget";
  


export interface EditSelectAttrs extends WidgetAttrs {
    popup?: string;
    update: (r:string) => void;
    initial?: string;
}

export class EditSelect extends Widget {
    selectable:boolean;
    select: (e:Event)=>void
    selected:string;
    oninit(node:Vnode<EditSelectAttrs, this>) {
        node.state.selectable = false;
        const i = (<string[]>node.children).indexOf(node.attrs.initial);
        node.state.selected = (<string[]>node.children)[i>=0? i : 0];
        node.state.select = (e:Event) => { 
            const selection = (<HTMLButtonElement>e.currentTarget).value;
            node.attrs.update(selection);
            node.state.selected = selection;
            node.state.selectable = false;
        }
    }
    view(node:Vnode<EditSelectAttrs, this>):ViewResult {
        return m(`select.hsedit_select`, 
            Popup.arm(node.attrs.popup, this.attrs(node.attrs, <any>{ onchange:node.state.select})),
            (<string[]>node.children).map((o:string) => node.state.selected===o?
                m('option.hsedit_select_option.selected', { value: o, selected:true }, o) :
                m('option.hsedit_select_option', { value: o }, o)));
    }
}