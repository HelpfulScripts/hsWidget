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
import { Log }          from 'hsutil';  const log = new Log('EditLabel');
import m                from "mithril";
import { Popup }        from './Popup';
import { WidgetAttrs, Widget, ViewResult }  from './Widget';
import { Vnode }        from './Widget';


export interface EditLabelAttrs extends WidgetAttrs {
    popup?: m.Children;
    placeholder?: string;
    update:(r:string) => void;
}

export class EditLabel extends Widget {
    editable: boolean;
    blur: (e:Event)=> void;
    makeEditable: ()=>void;
    blurIfReturn: (key:UIEvent)=>void;
    onupdate(node:m.VnodeDOM<EditLabelAttrs, this>):any {
        const dom:any = node.dom;
        if (dom && node.state.editable && document.activeElement!==(<any>node).dom) {
            dom.value = node.children || '';
            dom.focus();
            dom.select();
        }
    }

    oninit(node:Vnode<EditLabelAttrs, this>) {
        node.state.editable = false;
        node.state.blur = (e:any) => {
            node.state.editable = false;
            node.attrs.update(e.target.value);
        }
        node.state.makeEditable = () => node.state.editable = true; 
        node.state.blurIfReturn = (key:UIEvent) => {
            key.which === 13? (<Window>key.target).blur() : '';
        }
    }
    view(node:Vnode<EditLabelAttrs, this>):ViewResult {
        const content = ''+node.children;
        const attrs =  this.attrs(node.attrs, <any>{ onclick:node.state.makeEditable });
        return node.state.editable? 
                m(`input.hsedit_label`, this.attrs(node.attrs, <any>{ onblur:node.state.blur, onkeyup:node.state.blurIfReturn }), '')
            : content? 
                m(`span.hsedit_label`, Popup.arm(node.attrs.popup, attrs), m.trust( ''+content))
              : m(`span.hsedit_label.default`, Popup.arm(node.attrs.popup, this.attrs(node.attrs, <any>{ onclick:node.state.makeEditable })), ''+node.attrs.placeholder || 'click to enter');
    }
}


/** an extension of `EditLabel` that pareses entries as dates. */
export class EditDate extends EditLabel {
    update:(r:string)=>void;

    oninit(node:Vnode<EditLabelAttrs, this>) {
        super.oninit(node);
        node.state.update = node.attrs.update;
        node.attrs.update = (newValue:string) => {
            if (newValue) {
                const date = new Date(newValue);
                const result = isNaN(date.getTime())? 'invalid date' : date.toDateString().slice(4);
                node.state.update(result);
            } else {
                node.state.update(undefined);
            }
        }
    }
    public view(node:Vnode<EditLabelAttrs, this>) {
        let content = node.children;
        if (!content || content === '') {
            content = new Date().toDateString();
            content = content.slice(4);
        }
        return super.view(node);
    }
}