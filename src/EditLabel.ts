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
 * let content = 'prior content';
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
 * span.myLabel { background-color: #eee; }
 * input.myLabel { background-color: #fff; }
 * </file>
 * </example>
 */

/** */
import { Log }      from 'hsutil';  const log = new Log('EditLabel');
import { m, Vnode } from 'hslayout';
import { Popup } from './Popup';


export class EditLabel {
    protected editable = false;
    protected updateCB:(r:string) => void;

    protected blur(e:any) {
        this.editable = false;
        this.update(e.target.value);
    }

    protected click = () => this.editable = true; 

    protected keyup = (key:any) => key.which === 13? key.target.blur() : '';

    update(newValue:string) { this.updateCB(newValue); }

    onupdate(node:Vnode) {
        if (this.editable && document.activeElement!==node.dom) {
            node.dom.value = node.attrs.content || '';
            node.dom.focus();
            node.dom.select();
        }
    }

    view(node:Vnode) {
        this.updateCB = node.attrs.update;
        const css = node.attrs.css || '';
        const content = ''+node.attrs.content;
        return this.editable? m(`input.hsedit_label${css}`, { onblur:this.blur.bind(this), onkeyup:this.keyup.bind(this) }, 'yeah')
            : ( content &&  content.length)? 
            m(`span.hsedit_label${css}`, Popup.arm(node.attrs.popup, { onclick:()=>this.click() }), m.trust( content))
            : m(`span.hsedit_label.default${css}`, Popup.arm(node.attrs.popup, { onclick:()=>this.click() }), ''+node.attrs.placeholder || 'click to enter');
    }
}


/** an extension of `EditLabel` that pareses entries as dates. */
export class EditDate extends EditLabel {
    protected def = new Date().toDateString().slice(4);
    update(newValue:string) {
        if (newValue) {
            const date = new Date(newValue);
            const result = isNaN(date.getTime())? 'invalid date' : date.toDateString().slice(4);
            this.updateCB(result);
        } else {
            this.updateCB(undefined);
        }
    }
    public view(node:Vnode) {
        if (this.editable && (!node.attrs.content || node.attrs.content === '')) {
            node.attrs.content = new Date().toDateString();
            node.attrs.content = node.attrs.content.slice(4);
        }
        return super.view(node);
    }
}