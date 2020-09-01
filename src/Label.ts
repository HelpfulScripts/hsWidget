/**
 * # Label Widget
 * Shows a text label
 * 
 * ### Profile
 * invoked as `m(Label, { <LabelAttrs> }, <content>)`.
 * 
 * See {@link Label.LabelAttrs LabelAttrs}
 * `<content>`: the label content; supports embedded HTML code.
 * 
 * ### Example
 * <example>
 * <file name='script.js'> 
 * m.mount(root, {view: () => m(hsWidget.Label, {
 *      class: 'myLabel', 
 *      style: 'text-align: right;',
 *    }, 'This is a <b>label</b>')
 * });
 * </file>
 * <file name='style.css'>
 * .myLabel {  
 *    background-color: white; 
 *    margin: 5px;
 * }
 * </file>
 * </example>
 * 
 */

/** */
import m                from "mithril";
import { Widget, ViewResult }       from "./Widget";
import { WidgetAttrs }  from "./Widget";
import { Vnode }        from "./Widget";


export interface LabelAttrs extends WidgetAttrs {
}

/**
 * # Label 
 * A text label
 */
export class Label extends Widget {
    view(node: Vnode<LabelAttrs, this>):ViewResult { 
        const text  = <string>node.children[0] || '';
        return m(`.hs_label`, this.attrs(node.attrs), m.trust(text)); 
    }
}

