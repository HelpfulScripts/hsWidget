/**
 * # Grouped button widgets
 * 
 * ## &nbsp; {@link Optionbuttons.OptionButtons OptionButtons}
 * Shows an group of {@link Button.OnOffButtons `OnOffButtons`} that are created from
 * the passed `node.children`. Any of the buttons can be `on` at the same time.
 * 
 * Invoked as `m(OptionButtons, <OptionButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.OptionButtonsAttrs OptionButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButtons`
 * 
 * 
 * ## &nbsp; {@link Optionbuttons.RadioButtons RadioButtons}
 * Shows an group of {@link Button.OnOffButtons `OnOffButtons`} that are created from
 * the passed `node.children`. Only one of the buttons can be pressed at the same time.
 * 
 * invoked as `m(RadioButtons, <RadioButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.RadioButtonsAttrs RadioButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButtons` 
 * 
 * ### Profile
 * When a button in the group is clicked, the function registered with the `onclick` attribute 
 * is called with three parameters:
 * - the index (0, n-1) of the button clicked, 
 * - the new state value of that button, 
 * - the array of all button state values
 * 
 * See {@link OptionButtons.OptionButtonsAttrs OptionButtonsAttrs}
 * 
 * ### Example
 * <example><file name='script.js'>ximport='Optionbuttons.x.js'</file></example>
 * 
 */

/** */
import m                from "mithril";
import { EnabledWidget, EnabledWidgetAtrrs, Vnode }        from './Widget';
import { ViewResult }   from './Widget';
import { OnOffButton }  from "./Button";
import { Stateful }     from "./support/State";
import { notDeepEqual } from "assert";

export interface OptionClick {
    (buttonIndex:number, newValue:number, states:number[]): void;
}

export interface OptionButtonsAttrs extends EnabledWidgetAtrrs {
    /** a function, called when the button is clicked to inform the customer of the new state.*/
    onclick: OptionClick;

    /** 
     * the initial state values of the buttons. 
     * If specified as `number`, the indexed button will be set to state 1, else 0.
     */
    initial?: number|number[];

    /** 
     * An optional state `Transitions` scheme for the underlying buttons.
     * Defaults to `State.transitions.cycle`.
     */
    transition?: Transitions;

    /** a hook that allows for remote state changes. */
    remoteSet?: (r:RemoteSet)=>void;
}

export interface RemoteSet {
    (buttonIndex:number, newValue:number): void;
}

export interface Transitions {
    (buttonIndex:number, newValue:number, states:Stateful[]): number[];
}


/**
 * ## OptionButtons 
 * Shows a group of {@link Button.OnOffButtons `OnOffButtons`} that are created from
 * the passed `node.children`. Any of the buttons can be `on` at the same time.
 * 
 * Invoked as `m(OptionButtons, <OptionButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.OptionButtonsAttrs OptionButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButtons`
 */
export class OptionButtons extends EnabledWidget {
    /** predefined constraints on buttons */
    static transitions = <{[name:string]:Transitions}>{
        /** no constraints: each button can independently be in any state. */
        none:  (buttonIndex:number, newValue:number, states:Stateful[]) => states.map(s => s.getValue()),
        /** radio buttons mode: only one button can be on at a time. */
        radio: (buttonIndex:number, newValue:number, states:Stateful[]) => states.map((s,i) => s.setValue(i===buttonIndex? 1 : 0))
    }

    /** an array of access providers to the buttons that make up the `OptionButtons` group. */
    stateAccess: Stateful[];
    /** a callback function used by the constituent buttons to provide access to themselves */
    setAccessFn: (stateful:Stateful, buttonIndex:number) => void;
    onclick: OptionClick;
    transition: Transitions;

    setButton(buttonIndex:number, newValue:number) {
        if (this.enabled) {
            this.transition(buttonIndex, newValue, this.stateAccess);
            this.onclick(buttonIndex, newValue, this.stateAccess.map(s => s.getValue())); 
        }
    }

    oninit(node:Vnode<OptionButtonsAttrs, this>) {
        const s:this = node.state;
        s.stateAccess = [];
        s.onclick = node.attrs.onclick;
        s.transition = node.attrs.transition ?? OptionButtons.transitions.none;
        s.setAccessFn = (stateful:Stateful, buttonIndex:number) => s.stateAccess[buttonIndex] = stateful;
        if (node.attrs.remoteSet) {
            node.attrs.remoteSet((buttonIndex:number, newValue:number) => s.setButton.bind(s)(buttonIndex, newValue));
        }
    }
    view(node: Vnode<OptionButtonsAttrs, this>):ViewResult { 
        const s:this = node.state;
        const a:OptionButtonsAttrs = node.attrs;
        this.enable(!node.attrs.disable);
        return m(`.hs_option_buttons`, this.attrs(a, {
                style:`grid-template-columns: repeat(${(<any[]>node?.children)?.length ?? 0}, 1fr);`
            }), (<any>node.children).map((c:any, buttonIndex:number) => m(OnOffButton, {
                    class: `index${buttonIndex}`,
                    initial: Array.isArray(a.initial)? a.initial[buttonIndex] : (a.initial===buttonIndex? 1 : 0),
                    onclick: (newValue:number) => s.setButton.bind(s)(buttonIndex, newValue),
                    stateAccess: (stateful:Stateful) => s.setAccessFn(stateful, buttonIndex),
                }, c)
            )
        );
    }
}

export interface RadioButtonsAttrs extends OptionButtonsAttrs {
}

/**
 * ## RadioButtons 
 * Shows an group of buttons, only one of which can be pressed at the same time.
 * 
 * invoked as `m(RadioButtons, <RadioButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.RadioButtonsAttrs RadioButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButton 
 */
export class RadioButtons extends OptionButtons {
    oninit(node: Vnode<RadioButtonsAttrs, this>) {
        node.attrs.initial = node.attrs.initial || 0;
        node.attrs.transition = OptionButtons.transitions.radio;
        super.oninit(node);
    }
    view(node: Vnode<RadioButtonsAttrs, this>) {
        node.attrs.class = ['hs_radio_buttons', node.attrs.class].join(' ');
        return super.view(node);
    }
}


export interface IconbuttonsAttrs extends EnabledWidgetAtrrs {
    /** a function, called when the bitton is clicked */
    onclick: (buttonIndex:number, newValue:number, states:number[])=>void;

    /**
     * if `true`, creates the icon buttons in radio button mode (only one button
     * can be 'on' at any oen time).
     */
    radioMode: boolean;
}

/**
 * ## IconButtons 
 * Shows an group of buttons, only one of which can be pressed at the same time.
 * 
 * invoked as `m(IconButtons, <IconbuttonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.IconbuttonsAttrs IconbuttonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButton 
 */
export class IconButtons extends EnabledWidget {
    view(node: Vnode<IconbuttonsAttrs, this>):ViewResult { 
        this.enable(!node.attrs.disable);
        return m(OptionButtons, this.attrs(node.attrs, {
            class: 'hs_icon_buttons',
            buttonConstraints: node.attrs.radioMode? OptionButtons.transitions.radio : OptionButtons.transitions.none,
            onclick: node.attrs.onclick
        }), node.children);
    }
}