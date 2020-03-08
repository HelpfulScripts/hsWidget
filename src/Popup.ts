/**
 * # Popup Widget
 * opens a popup on an armed Vnode. 
 * 
 * ### Profile
 * invoked as `m(Popup, {})`. `Popup` uses fixed positioning, so it can be added to the 
 * rendering tree anywhere except as a direct `content` element in `Layout` (where it would interfere with `Layout's` 
 * rendering logic). Only a single `Popup` is needed per app.
 * 
 * To arm a vnode, call `Popup.arm` which will return a `Mithril` attribute object:
 * ```
 * m('.myContent', Popup.arm(popupContent), myContent);
 * ```
 * 
 * ### Attributes (node.attrs):
 * none
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let dismissals = 0;
 * let trigger;
 * m.mount(root, {view: () => m('.hs-white', [
 *      m('h4', hsWidget.Popup.arm(`popup content`), `hover over me`),
 *      m(hsWidget.Popup, {})
 *    ])
 * });
 * </file>
 * </example>
 */

 /** */
import { Log }      from 'hsutil'; const log = new Log('Popup');
import { m, Vnode}  from 'hslayout'; 

/**
 * 
 */
export class Popup {
    public static arm(content:Vnode|(()=>Vnode), attrs:any={}) {
        attrs.onmouseenter = (e:any) => Popup.instance.show(e, typeof content === 'function'? content() : content);
        attrs.onmousemove = (e:any) => Popup.instance.move(e);
        attrs.onmouseleave = () => Popup.instance.hide();
        return attrs;
    }
    private static instance:Popup;

    x = 0;
    y = 0;
    showPopup = false;
    content:Vnode = '...Popup...';

    show(e:any, content:Vnode) {
        this.showPopup = true;
        this.content = content;
        this.move(e);
    }
    move(e:any) {
        this.x = e.x;
        this.y = e.y;
    }
    hide() {
        this.showPopup = false;
    }
    view(node:Vnode) {
        Popup.instance = this;
        const attrs = { style:`left:${this.x+15}px; top:${this.y}px`};
        return !this.showPopup? m('span') : m('.hs_popup', attrs, this.content);
    }
}
