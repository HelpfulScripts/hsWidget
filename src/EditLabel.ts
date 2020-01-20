/**
 * # EditLabel
 * Provides a text label that turns into a single-line input field when clicked on
 * 
 * ### Attributes:
 * - css: the css class
 * - content: the initial string to show in the text label
 * - update: callback function called when the input field looses focus
 * - placeholder: hint to show for an empty field
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * let content = '';
 * m.mount(root, {view: () => m('div', [
 *    m('h3', 'Edit Label Example'),
 *    m('div', `current content: '${content}'`),
 *    m(hsWidget.EditLabel, {
 *       css: '.myLabel',
 *       placeholder: 'Enter Value',
 *       content: content,
 *       update: newValue => content = newValue
 *    })
 * ])});
 * 
 * </file>
 * <file name='style.css'>
 * .myLabel {  
 *    background-color: #aaf; 
 *    margin: 5px;
 * }
 * </file>
 * </example>
 */

/** */
import { Log }      from 'hsutil';  const log = new Log('EditLabel');
import { m, Vnode } from 'hslayout';


export class EditLabel {
    editable = false;
    hasFocus = false;
    update:(r:string) => void;

    click(e:any) { 
        this.editable = !this.editable; 
        e.currentTarget.focus();
    }

    blur(e:any) {
        this.editable = false;
        this.hasFocus = false;
        this.update(e.target.value);
    }

    keyup(key:any) {
        if (key.which === 13) {
            key.target.blur();
        }
    }

    onupdate(node:Vnode) {
        if (this.editable && !this.hasFocus) {
            node.dom.focus();
            this.hasFocus = true;
            node.dom.value = node.attrs.content || '';
        }
    }

    view(node:Vnode) {
        this.update = node.attrs.update;
        const css = node.attrs.css || '';
        return this.editable? 
            m(`input.hsedit_label${css}`, { 
                onblur: this.blur.bind(this),
                onkeyup: this.keyup.bind(this),
            },'')
      : (node.attrs.content && node.attrs.content.length)? 
        m(`.hsedit_label${css}`, { onclick: this.click.bind(this) }, node.attrs.content)
      : m(`.hsedit_label.default${css}`, { onclick: this.click.bind(this) }, node.attrs.placeholder || 'click to enter');
    }
}
