/**
 * # EditCheckbox
 * Provides a checkbox
 * 
 * ### Attributes:
 * - **checked**: `boolean` if true, the checkbox is initially checked
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * let selected = 'none';
 * m.mount(root, {view: () => m('div', [
 *    m('h3', 'Checkbox Example'),
 *    m('div', [
 *      m('span', `current content: '${selected}'`),
 *      m(hsWidget.Editheckbox, {
 *          css: '.mySelect',
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
import { m, Vnode } from 'hslayout';
import { Log }      from 'hsutil';  const log = new Log('EditSelect');


export class EditCheckbox {
    update:(checked:boolean) => void;
    checked:boolean;

    click() {
        this.checked = !this.checked;
        this.update(this.checked);
    }

    oninit(node:Vnode) {
        this.checked = node.attrs.checked;
        this.update  = node.attrs.update;
    }

    view(node:Vnode) {
        const css = node.attrs.css || '';
        return m(`input.hsedit_checkbox${css}`, { 
            type: 'checkbox',
            checked: this.checked,
            onclick: this.click.bind(this)
        },'');

    }
}