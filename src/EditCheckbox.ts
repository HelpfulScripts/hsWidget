/**
 * # EditCheckbox
 * Provides a checkbox
 * 
 * ### Profile
 * invoked as `m(EditCheckbox, { <EditCheckbox> }, <content>)`.
 * 
 * See {@link EditCheckbox.EditCheckboxAttrs EditCheckbox}
 * `<content>`: an optional string that will be displayed as the checkbox label; defaults to ''
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * let selected = false;
 * m.mount(root, {view: () => m('div', [
 *    m('h3', 'Checkbox Example'),
 *    m('div', [
 *      m(hsWidget.EditCheckbox, {
 *          class: 'mySelect',
 *          update: newValue => selected = newValue
 *      }, `${selected}: I am ${selected?'' : 'not '}a robot`)
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
import m                from "mithril";
import { Log }          from 'hsutil'; const log = new Log('EditSelect');
import { Vnode }        from "./Widget";
import { WidgetAttrs }  from "./Widget";
import { Widget }       from "./Widget";


export interface EditCheckboxAttrs extends WidgetAttrs {
    /** if `true`, the checkbox will initially be checked. Defaults to `false` */
    initial?: boolean;
    update: (checked:boolean) => void;
}


export class EditCheckbox extends Widget {
    /** unique ID for use in `label for` */
    id: string;
    /** `true` if the checkbox is checked. */
    checked: boolean;

    toggleCheckbox: ()=>void;

    oninit(node:Vnode<EditCheckboxAttrs, this>) {
        node.state.id = node.attrs.id || `hsCheckbox${Math.floor(Math.random()*1000000)}`;
        node.state.checked = node.attrs.initial || false;
        node.state.toggleCheckbox = () => {
            node.state.checked = !node.state.checked;
            node.attrs.update(node.state.checked);
        }
    }

    view(node:Vnode<EditCheckboxAttrs, this>) {
        return m('.hs_edit_checkbox', this.attrs(node.attrs, <any>{ 
        }), [
            m(`input`, {
                id:node.state.id,
                type: 'checkbox',
                checked: node.state.checked,
                onclick: node.state.toggleCheckbox
            }),
            m('label', {for:node.state.id}, node.children||'')
        ])
    }
}