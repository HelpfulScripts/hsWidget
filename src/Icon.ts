/**
 * # Icon Widget
 * Shows an icon with optional text label
 * 
 * ### Profile
 * invoked as `m(Icon, {mdi:<string> , text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `text: string` name to show as button text
 * - `mdi: string` MDI icon name (see: https://materialdesignicons.com/)
 * - `css: string` css class to assign to button tag
 * - `style: string` style string to apply to button tag
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * ximport='Icon.x.js'
 * </file>
 * </example>
 * 
 */

/** */
import m from "mithril";
type Vnode = m.Vnode<any, any>;

export interface IconAttrs {
    /** the `svg` string for the icon, as imported from `@mdi/js` */
    mdiSvg:string;
}

/**
 * # Icon 
 * An MDI icon with text
 * 
 * ### Profile
 * invoked as `m(Icon, {mdi:<string>, text:<string>});`
 * 
 * ### Attributes (node.attrs):
 * - `text?: string` the label text; 
 */
export class Icon {
    view(node: Vnode): Vnode { 
        return m(`svg.hs_icon}`, {viewBox:"0 0 24 24"}); 
    }
}
