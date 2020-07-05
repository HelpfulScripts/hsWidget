/**
 * # EditTextarea
 * Provides a text label that turns into a multi-line text area when clicked on
 * 
 * ### Attributes:
 * - **css**?: `string` an optional css selector
 * - **content**: `string` the initial string to show in the text label
 * - **update**: `(newValue:string)=>void` callback function called with the updated lable when the input field loses focus
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
 *      m(hsWidget.EditTextarea, {
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
import { Log }      from 'hsutil';  const log = new Log('EditTextarea');
import m from "mithril";
type Vnode = m.Vnode<any, any>;
import showdown     from 'showdown';
import { Popup } from './Popup';

const converter = new showdown.Converter({
    tables:                 true,   // enables |...| style tables; requires 2nd |---| line
    ghCompatibleHeaderId:   true,   // github-style dash-separated header IDs
    smartIndentationFix:    true,   // fixes ES6 template indentations
    takslists:              true,   // enable - [ ] task; doesn't seem to work.
    strikethrough:          true    // enables ~~text~~
});

export class EditTextarea {
    protected editable = false;
    protected hasFocus = false;
    protected updateCB:(r:string) => void;
    protected default = '';

    protected adjustTextAreaHeight(dom:any) { 
        if (dom && dom.classList) {
            while (!dom.classList.contains('hsedit_textarea')) { dom = dom.parentElement; }
            const scHeight = dom.scrollHeight;
            const height = parseInt(window.getComputedStyle(dom).height);
            const h = Math.max(height, scHeight);
            dom.style.height = h>0? `${h}px` : 'auto';

            const listRow = dom.parentElement.parentElement;
            if (listRow.classList.contains('hsedit_list_row')) {
                listRow.style.height = h>0? `${h+ (this.editable? 4 : 0)}px` : 'auto';
            }
        }
    }
    protected click(e:any) { 
        this.editable = !this.editable; 
    }

    protected blur(e:any) {
        this.editable = false;
        this.hasFocus = false;
        this.update(e.target.value);
    }

    protected update(newValue:string) {
        this.updateCB(newValue);
    }

    public onupdate(node:Vnode) {
        if (this.editable) {
            if (!this.hasFocus) {
                (<any>node).dom.value = node.attrs.content || this.default;
                (<any>node).dom.focus();
                (<any>node).dom.select();
                this.hasFocus = true;
            }
            this.adjustTextAreaHeight((<any>node).dom);
        }
    }

    public view(node:Vnode) {
        const area = this;
        const onEvent = {
            onclick: area.click.bind(area),
            onupdate: (node:Vnode) => area.adjustTextAreaHeight.bind(area)((<any>node).dom)
        };
        this.updateCB = node.attrs.update;
        const css = node.attrs.css || '';
        const attrs = () => node.attrs.popup? Popup.arm(node.attrs.popup, onEvent) : onEvent;
        return this.editable? 
            m(`textarea.hsedit_textarea${css}`, { 
                wrap: 'physical',
                onblur: this.blur.bind(this),
            }, m.trust(node.attrs.content.replace(/\n/g,'<p>')))
            : (node.attrs.content && node.attrs.content.length)? 
                    m(`.hsedit_textarea${css}`, attrs(), m.trust(converter.makeHtml(node.attrs.content)))
                : m(`.hsedit_textarea.default${css}`, attrs(), node.attrs.placeholder || 'click to enter');
    }
}

