/**
 * # Icon widget
 * Shows an [MDI](https://materialdesignicons.com/) icon with optional text label.
 * The icon will scale to fill the height of the element, which defaults to `1em`.
 * The content will vertically align centered if the icon is higher than the text.
 * 
 * If a predefined icon is used, the provided `mdi` key will als be used as a css class
 * selector for the icon. This allows for a semantic coloring of the icon via CSS.
 * 
 * ### Profile
 * invoked as `m(Icon, <IconAttrs>, <content>);`.
 * 
 * See: {@link Icon.IconAttrs IconAttrs}
 * 
 * ### Example
 * <example>
 * <file name='script.js'>ximport='Icon.x.js'</file>
 * <file name='style.css'>
 * .hs-execution .hs_grid.hs_grid_row { height:100%; }
 * .hs-execution .hs_grid.hs_grid_col { width:100%; }
 * </file>
 * </example>
 * 
 * ### Predefined icons:
 * - 'info'
 * - 'warn'
 * - 'stop'
 */

/** */
import { WidgetAttrs }      from './Widget';
import { Widget }           from './Widget';
import m                    from "mithril";
import { Vnode }            from "./Widget";
import { mdiAlert }         from '@mdi/js';
import { mdiInformation }   from '@mdi/js';
import { mdiAlertOctagon }  from '@mdi/js';
import { mdiPower }         from '@mdi/js';
import { mdiPlus }          from '@mdi/js';
import { mdiMinus }         from '@mdi/js';
import { mdiChevronUp }     from '@mdi/js';
import { mdiChevronDown }   from '@mdi/js';
import { mdiChevronLeft }   from '@mdi/js';
import { mdiChevronRight }  from '@mdi/js';
import { mdiHomeOutline }   from '@mdi/js';

export interface IconAttrs extends WidgetAttrs {
    /** 
     * optional [MDI](https://materialdesignicons.com/) icon specifier, defaults to 'info'
     * - either an `svg` string for the icon, as imported from `@mdi/js`;
     * - or a key for one of the {@link Icon Predefined Icons};
     */
    mdi?: string;
}


/**
 * # Icon 
 * An MDI icon with text, invoked as 
 * `m(Icon, <{@link Icon.IconAttrs `IconAttrs`}>, <content>);`
 */
export class Icon extends Widget {
    static predefined = {
        info:           mdiInformation,
        warn:           mdiAlert,
        stop:           mdiAlertOctagon,
        power:          mdiPower,
        plus:           mdiPlus,
        minus:          mdiMinus,
        chevronUp:      mdiChevronUp,
        chevronDown:    mdiChevronDown,
        chevronLeft:    mdiChevronLeft,
        chevronRight:   mdiChevronRight,
        home:           mdiHomeOutline
    };
    view(node: Vnode<IconAttrs, this>): m.Children { 
        const svg = node.attrs.mdi || 'info';
        const icon = Icon.predefined[svg] || svg;
        // set the cvg css if `mdi` has a predefined key
        const css = Icon.predefined[svg]? `.${svg}` : '';
        return m(`.hs_icon`, this.attrs(node.attrs), [
            m(`svg${css}`, { height:`100%`, viewBox:`0 0 24 24`}, 
                m('path', {d:icon})),
            // avoid .hs_icon_content formatting if no children:
            (<any[]>node.children).length? m('span.hs_icon_content', node.children) : undefined
        ]);
    }
}
