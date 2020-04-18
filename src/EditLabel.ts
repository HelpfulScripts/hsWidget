/**
 * # EditLabel
 * Provides a text label that turns into a single-line input field when clicked on
 * 
 * ### Attributes:
 * - **css**?: `string` an optional css selector
 * - **content**: `string` the initial string to show in the text label
 * - **update**: `(newValue:string)=>void` callback function called with the updated lable when the input field loses focus
 * - **popup**?: `string`: optional message to show in a {@link Popup popup box} upon mouseover. 
 * - **placeholder**?: optional hint to show for an empty field. Deafults to *'click to enter'*. Provide a `sapce (' ')` to 
 *      display an empty field.
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * let content = '';
 * m.mount(root, {view: () => m('div', [
 *    m('h3', 'Edit Label Example'),
 *    m('div', [
 *      m('span', `current content: '${content}'`),
 *      m(hsWidget.EditLabel, {
 *          css: '.myLabel',
 *          placeholder: 'Enter Value',
 *          content: content,
 *          update: newValue => content = newValue
 *      })
 *    ])
 * ])});
 * 
 * </file>
 * <file name='style.css'>
 * .myLabel {  
 * }
 * </file>
 * </example>
 */

/** */
import { Log }      from 'hsutil';  const log = new Log('EditLabel');
import { m, Vnode } from 'hslayout';
import { Popup } from './Popup';


export class EditLabel {
    protected editable = false;
    protected hasFocus = false;
    protected updateCB:(r:string) => void;
    protected default = '';

    protected click(e:any) { 
        this.editable = !this.editable; 
    }

    protected blur(e:any) {
        this.editable = false;
        this.hasFocus = false;
        this.update(e.target.value);
    }

    protected keyup(key:any) {
        if (key.which === 13) {
            key.target.blur();
        }
    }

    protected update(newValue:string) {
        this.updateCB(newValue);
    }

    public onupdate(node:Vnode) {
        if (this.editable && !this.hasFocus) {
            node.dom.value = node.attrs.content || this.default;
            node.dom.focus();
            node.dom.select();
            this.hasFocus = true;
        }
    }

    public view(node:Vnode) {
        const label = this;
        this.updateCB = node.attrs.update;
        const attrs = (popup:string) => popup? Popup.arm(popup, { onclick: label.click.bind(label) }) : { onclick: label.click.bind(label) };
        const css = node.attrs.css || '';
        return this.editable? 
            m(`input.hsedit_label${css}`, { 
                onblur: this.blur.bind(this),
                onkeyup: this.keyup.bind(this),
            },'')
      : (node.attrs.content && node.attrs.content.length)? 
            m(`span.hsedit_label${css}`, attrs(node.attrs.popup), m.trust(node.attrs.content))
          : m(`span.hsedit_label.default${css}`, attrs(node.attrs.popup), node.attrs.placeholder || 'click to enter');
    }
}

/** an extension of `EditLabel` that pareses entries as dates. */
export class EditDate extends EditLabel {
    protected default = new Date().toDateString().slice(4);
    protected update(newValue:string) {
        if (newValue) {
            const date = new Date(newValue);
            const result = isNaN(date.getTime())? 'invalid date' : date.toDateString().slice(4);
            super.update(result);
        } else {
            super.update(undefined);
        }
    }
    public view(node:Vnode) {
        node.attrs.content = node.attrs.content? new Date(node.attrs.content).toDateString().slice(4) : '';
        return super.view(node);
    }
}