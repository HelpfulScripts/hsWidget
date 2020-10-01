/**
 * # Button widgets
 * Implement a number of different push buttons.
 * 
 * ## &nbsp; {@link Button.Button Button}
 * Shows an simple stateless push button with a label
 * 
 * Invoked as `m(Button, <ButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes to show in the button
 * 
 * ## &nbsp; {@link Button.Button Button}
 * Extends `Button` to keep a state. Pressing the `Button` will cycle through each of the states.
 * 
 * Invoked as `m(Button, <ButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `m.Child[]` an array of states, one of which will be shown in the button
 * 
 * ## &nbsp; {@link Button.OnOffButton OnOffButton}
 * Extends `Button` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <ButtonAttrs>);`. `node.children` are ignored.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `Vnode` a Vnode to show as button content, e.g. an {@link Icon.Icon Icon}
 * 
 * ## &nbsp; {@link Button.IconButton IconButton}
 * Extends `Button` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <ButtonAttrs>);`. `node.children` are ignored.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `Vnode` a Vnode to show as button content, e.g. an {@link Icon.Icon Icon}
 * 
 * 
 * ### Example
 * <example>
 * <file name='script.js'>ximport='Button.x.js'</file>
 * <file name='style.css'>ximport='Button.x.css'</file>
 * </example>
 * 
 */

/** */
import m                from "mithril";
import { Log }          from 'hsutil';  const log = new Log('Button');
import { Vnode, ViewResult, EnabledWidget, EnabledWidgetAtrrs } 
                        from './Widget';
import { Icon }         from "./Icon";
import { State, Stateful, Transition } 
                        from "./support/State";


export interface ButtonAttrs extends EnabledWidgetAtrrs {
    /** 
     * a callback function, called when the button is clicked,
     * informing the client on the new state value and  
     */
    onclick: (newValue:number)=>void;

    /** 
     * the number of values the `Button` state can take on. 
     * If not specified, the button will use the number of elements in `<content>`
     * as the number of values.
     */
    numValues?: number;

    /** the initial value of the button */
    initial?: number;

    /** returns a function that can be used to programmatically change the state of the button. */
    stateAccess?: (stateful:Stateful) => void;

    /** optional state transition function, defaults to `State.transitions.cycle` */
    transition?: Transition;
}


/**
 * ## Button
 * Shows a button widget with the following features:
 * - while the button is pressed it is classed as `.hs_pressed` to allow visual styling.
 * - `Button` maintains an internal `State`. The number of allowed states in `State` is determined 
 * byt the number of elements in `<content>`. Pressing the `Button` will advance the state 
 * as defined by a `Transition` function. Per default, this function cycles through the numeric states.
 * A custom `Transition` function can be specified via the `transition` attribute.
 * The initial state can be set via the `initial` attribute.
 * 
 * Invoked as `m(Button, <ButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: either 
 * - an array of state labels (`m.Child[]`), one of which will be shown in the button as determined by the state value
 * - or a single label (`m.Child`) that is shown independent of the state value.
 */
export class Button extends EnabledWidget {
    /** the button's `State` object */
    state: State;
    /** `true` while the button is pressed down (between a `mousedown` and `mouseup` event. */
    pressed: boolean;
    /** changes the `pressed` state to the value of `down` */
    pressing: (down:boolean) => void;

    oninit(node:Vnode<ButtonAttrs, this>) {
        node.state.pressed = false;
        node.state.pressing = (down:boolean) => node.state.pressed = this.enabled? down : false;
        if (!this.state) {
            const numValues = node.attrs.numValues || (<m.Child[]>node.children).length || 1; 
            const initial = node.attrs.initial ?? 0;
            const transition = node.attrs.transition ?? State.transitions.cycle;
            this.state = new State(numValues, initial, transition);
        }
        // provide state access to client:
        if (node.attrs.stateAccess) { node.attrs.stateAccess(this.state); }
    }

    view(node: Vnode<ButtonAttrs, this>):ViewResult { 
        const s:this = node.state;
        this.enable(!node.attrs.disable);
        
        return m(`.hs_button.state${s.state.getValue()}`, this.attrs(node.attrs, {
            class: s.pressed? 'hs_pressed' : undefined,
            onclick: () => { if (this.enabled) {
                const newValue = s.state.advance(); // advance the state
                node.attrs.onclick(newValue);       // and inform the client
            }},
            onmousedown: ()=>s.pressing(true),
            onmouseup:   ()=>s.pressing(false)
        }), (<m.Child[]>node.children).length>1? node.children[s.state.getValue()] : node.children);
    }
}


/**
 * ## OnOffButton
 * Extends `Button` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <ButtonAttrs>, <content>);`. 
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `Vnode` a Vnode to show as button content, e.g. an {@link Icon.Icon Icon}.
 * If `undefined`, the `children` will be set to `['off', 'on']`.
 */
export class OnOffButton extends Button {
    static states = ['off', 'on'];
    oninit(node: Vnode<ButtonAttrs, this>) { 
        const initial = node.attrs.initial ?? 0;
        this.state = new State(2, initial);   // will cycle through the 2 states
        super.oninit(node);
    }
    view(node: Vnode<ButtonAttrs, this>):ViewResult { 
        node.attrs.class = ['hs_onoff_button', node.attrs.class || ''].join(' ');
        return super.view(node);
    }
}


export interface IconButtonAttrs extends ButtonAttrs {
    /** an `mdi` icon svg string. See {@link Icon.IconAttrs IconAttrs} for details. */
    mdi: string;
}

/**
 * ## IconButton
 * Extends `Button`, showing an icon instead of text.
 * 
 * invoked as `m(IconButton, <IconButtonAttrs>);`. 
 * `<content>` is ignored.
 * 
 * See {@link Button.IconButtonAttrs IconButtonAttrs}
 */
export class IconButton extends Button {
    oninit(node: Vnode<IconButtonAttrs, this>) { 
        super.oninit(node);
    }
    view(node: Vnode<IconButtonAttrs, this>):ViewResult { 
        node.attrs.class = ['hs_icon_button', node.attrs.class || ''].join(' ');
        node.children[0] = m(Icon, {mdi:node.attrs.mdi});
        return super.view(node);
    }
}