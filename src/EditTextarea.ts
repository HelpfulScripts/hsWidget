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
 *          update: newValue => content = newValue
 *      }, content)
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
import m, { VnodeDOM }  from "mithril";
import { Popup }        from './Popup';
import { Widget, ViewResult, WidgetAttrs, Vnode }       
                        from './Widget';
import { makeHtml }     from './EditLabel';


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
            const content = (<HTMLButtonElement>e.target).value;
            node.state.update(content);
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
        const children = (<m.Child[]>node.children).join(',');
        const html = makeHtml(''+children).replace(/\n/g, '<p>');
        const content = children? m.trust(html) : node.attrs.placeholder ?? 'click to enter';
        const attrs = () => node.attrs.popup? Popup.arm(node.attrs.popup, onEvent) : onEvent;
        const def = children?'':'.default';
        return node.state.editable? 
            m(`textarea.hs_edit_textarea`, this.attrs(node.attrs, <any>{ 
                wrap: 'physical',
                onblur: node.state.blur,
            }), content)
          : m(`.hs_edit_textarea${def}`, attrs(), content)
    }
}

