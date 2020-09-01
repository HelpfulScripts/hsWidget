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
import { Log }          from 'hsutil';  const log = new Log('EditTextarea');
import m, { VnodeDOM }                from "mithril";
import showdown         from 'showdown';
import { Popup }        from './Popup';
import { Widget, ViewResult }       from './Widget';
import { WidgetAttrs }  from './Widget';
import { Vnode }        from './Widget';

const converter = new showdown.Converter({
    tables:                 true,   // enables |...| style tables; requires 2nd |---| line
    ghCompatibleHeaderId:   true,   // github-style dash-separated header IDs
    smartIndentationFix:    true,   // fixes ES6 template indentations
    takslists:              true,   // enable - [ ] task; doesn't seem to work.
    strikethrough:          true    // enables ~~text~~
});


export interface EditTextareaAttrs extends WidgetAttrs {
    update: (r:string) => void;
    popup?: m.Children;
    placeholder?: string;
}

export class EditTextarea extends Widget {
    editable: boolean;
    hasFocus: boolean;
    update:  (newValue:string) => void;
    blur:    (e:Event) => void;
    toggleEditable: ()=>void;
    adjustTextAreaHeight: (dom:any) => void;
    oninit(node:Vnode<EditTextareaAttrs, this>) {
        node.state.editable = false;
        node.state.hasFocus = false;
        node.state.update = (newValue:string) => node.attrs.update(newValue);
        node.state.blur = (e:Event) => {
            node.state.editable = false;
            node.state.hasFocus = false;
            node.state.update((<HTMLButtonElement>e.target).value);
        }
        node.state.toggleEditable = () => node.state.editable = !node.state.editable; 
        node.state.adjustTextAreaHeight = (dom:any) => { 
            if (dom && dom.classList) {
                while (!dom.classList.contains('hsedit_textarea')) { dom = dom.parentElement; }
                const scHeight = dom.scrollHeight;
                const height = parseInt(window.getComputedStyle(dom).height);
                const h = Math.max(height, scHeight);
                dom.style.height = h>0? `${h}px` : 'auto';
    
                const listRow = dom.parentElement.parentElement;
                if (listRow.classList.contains('hsedit_list_row')) {
                    listRow.style.height = h>0? `${h+ (node.state.editable? 4 : 0)}px` : 'auto';
                }
            }
        }
    }

    public onupdate(node:VnodeDOM<EditTextareaAttrs, this>) {
        if (node.state.editable) {
            if (!node.state.hasFocus) {
                (<any>node).dom.value = node.children || '';
                (<any>node).dom.focus();
                (<any>node).dom.select();
                node.state.hasFocus = true;
            }
            node.state.adjustTextAreaHeight((<any>node).dom);
        }
    }

    public view(node:Vnode<EditTextareaAttrs, this>):ViewResult {
        const onEvent = this.attrs(node.attrs, <any>{
            onclick: node.state.toggleEditable,
            onupdate: (node:VnodeDOM<EditTextareaAttrs, this>) => node.state.adjustTextAreaHeight((<any>node).dom)
        });
        const attrs = () => node.attrs.popup? Popup.arm(node.attrs.popup, onEvent) : onEvent;
        const content = <string>node.children[0] || '';
        return node.state.editable? 
            m(`textarea.hs_edit_textarea$`, this.attrs(node.attrs, <any>{ 
                wrap: 'physical',
                onblur: node.state.blur,
            }), m.trust(content.replace(/\n/g,'<p>')))
            : (content && content.length)? 
                  m(`.hs_edit_textarea`, attrs(), m.trust(converter.makeHtml(content)))
                : m(`.hs_edit_textarea.default`, attrs(), node.attrs.placeholder || 'click to enter');
    }
}

