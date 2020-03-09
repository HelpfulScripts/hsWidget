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
 * a `Mithril` node that shows a popup when triggered.
 */
export class Popup {
    /**
     * arms a `Mithril` node by adding mouse listeners to the `attrs` object. 
     * @param content a `VNode` that specifies the content to show in the popup.
     * @param attrs optional; an `attrs` object that is extended by mouse listeners.
     * @return the extended `attrs` object
     */
    public static arm(content:Vnode, attrs:any={}):any {
        attrs.onmouseenter = (e:any) => Popup.instance.show(e, content);
        attrs.onmousemove = (e:any) => Popup.instance.move(e);
        attrs.onmouseleave = () => Popup.instance.hide();
        return attrs;
    }
    /** the singleton instance to use upon mouse events */
    private static instance:Popup;

    /** the fixed x position of the popup */
    x = 0;
    /** the fixed y position of the popup */
    y = 0;
    /** state variable, true if popup is visible. */
    showPopup = false;
    /** state variable containing the content to show. */
    content:Vnode = '...Popup...';

    private show(e:any, content:Vnode) {
        this.showPopup = true;
        this.content = content;
        this.move(e);
    }
    private move(e:any) {
        this.x = e.x;
        this.y = e.y;
    }
    private hide() {
        this.showPopup = false;
    }
    view(node:Vnode) {
        Popup.instance = this;
        const attrs = { style:`left:${this.x+15}px; top:${this.y}px`};
        return !this.showPopup? m('span') : m('.hs_popup', attrs, this.content);
    }
}
