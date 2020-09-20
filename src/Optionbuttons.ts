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
 * Shows an group of buttons, only one of which can be pressed at the same time.
 * 
 * invoked as `m(RadioButtons, <RadioButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.RadioButtonsAttrs RadioButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButton 
 * 
 * ### Profile
 * When a button in the group is clicked, the `onclick` method is called with three parameters:
 * - the index (0, n-1) of the button clicked, 
 * - the new state of that button, 
 * - the array of all button states
 * 
 * See {@link OptionButtons.OptionButtonsAttrs OptionButtonsAttrs}
 * 
 * ### Example
 * <example><file name='script.js'>ximport='Optionbuttons.x.js'</file></example>
 * 
 */

/** */
import m                from "mithril";
import { Vnode }        from './Widget';
import { ViewResult }   from './Widget';
import { WidgetAttrs }  from './Widget';
import { Widget }       from './Widget';
import { OnOffButton }  from "./Button";
import { Stateful, State, StateTransition } from "./State";

interface OptionClick {
    (buttonIndex:number, newState:number, states:number[]): void;
}

export interface OptionButtonsAttrs extends WidgetAttrs {
    /** a function, called when the button is clicked to inform the customer of the new state.*/
    onclick: OptionClick;

    /** the initial state of the button */
    initial?: number[];

    /** 
     * An optional state transition scheme for the underlying buttons.
     * Defaults to `State.transitions.cycle`.
     */
    buttonTransition?: StateTransition;

    /** 
     * a function that determines how the states of other buttons in the group change 
     * when a button is clicked. Defaults to no change in states. 
     * Can be used to implement a `whack-a-mole`
     */
    buttonConstraint?: ButtonConstraint;

    /** a hook that allows for remote state changes. */
    remoteSet?: (r:RemoteSet)=>void;
}

export interface RemoteSet {
    (buttonIndex:number, newState:number): void;
}

export interface ButtonConstraint {
    (buttonIndex:number, newState:number, states:number[]): number[];
}

interface ButtonConstraints {
    none:  ButtonConstraint;
    radio: ButtonConstraint;
    [name:string]: ButtonConstraint
}

/**
 * ## OptionButtons 
 * Shows an group of {@link Button.OnOffButtons `OnOffButtons`} that are created from
 * the passed `node.children`. Any of the buttons can be `on` at the same time.
 * 
 * Invoked as `m(OptionButtons, <OptionButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.OptionButtonsAttrs OptionButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButtons`
 */
export class OptionButtons extends Widget {
    /** predefined constraints on buttons */
    static constraints = <ButtonConstraints>{
        /** no constraints: each button can independently be in any state. */
        none:  (buttonIndex:number, newState:number, states:number[]) => states,
        /** radio buttons mode: only one button can be on at a time. */
        radio: (buttonIndex:number, newState:number, states:number[]) => states.map((s,i) => i===buttonIndex? newState : 0)
    }

    setButton(buttonIndex:number, newState:number) {
        const buttonConstraint = this.buttonConstraint || OptionButtons.constraints.none;
        // get current state:
        let states:number[] = this.stateAccess.map(a => a.getState());
        // determine click side-effects:
        states = buttonConstraint(buttonIndex, newState, states);
        // execute side effects:
        this.stateAccess.map((a,i) => a.setState(states[i]));
        // inform customer of new states:
        this.onclick(buttonIndex, newState, states); 
    }

    /** an array of access providers to the buttons that make up the `OptionButtons` group. */
    stateAccess: Stateful[];
    /** a callback function used by the constituent buttons to provide access to themselves */
    setAccessFn: (stateful:Stateful, buttonIndex:number) => void;
    onclick: OptionClick;
    buttonConstraint: ButtonConstraint;

    oninit(node:Vnode<OptionButtonsAttrs, this>) {
        const s:this = node.state;
        s.stateAccess = [];
        s.onclick = node.attrs.onclick;
        s.buttonConstraint = node.attrs.buttonConstraint || OptionButtons.constraints.none;
        s.setAccessFn = (stateful:Stateful, buttonIndex:number) => s.stateAccess[buttonIndex] = stateful;
        if (node.attrs.remoteSet) {
            node.attrs.remoteSet((buttonIndex:number, newState:number) => {
                s.setButton.bind(s)(buttonIndex, newState);
            });
        }
    }
    view(node: Vnode<OptionButtonsAttrs, this>):ViewResult { 
        const s:this = node.state;
        const a:OptionButtonsAttrs = node.attrs;
        const buttonConstraint = a.buttonConstraint || OptionButtons.constraints.none;
        return m(`.hs_option_buttons`, this.attrs(a, {
                style:`grid-template-columns: repeat(${(<any[]>node?.children)?.length ?? 0}, 1fr);`
            }), (<any>node.children).map((c:any, buttonIndex:number) => {
                function clickResponse(newState:number) {
                    s.setButton.bind(s)(buttonIndex, newState);
                }
                return m(OnOffButton, {
                    class: `index${buttonIndex}`,
                    initial: (a.initial || [])[buttonIndex] ||0,
                    stateTransition: node.attrs.buttonTransition || State.transitions.cycle,
                    onclick: clickResponse,
                    stateAccess: (stateful:Stateful) => s.setAccessFn(stateful, buttonIndex),
                }, c)
            })
        );
    }
}


export interface RadioButtonsAttrs extends WidgetAttrs {
    /** a function, called when the bitton is clicked */
    onclick: (buttonIndex:number, newState:number, states:number[])=>void;

    /** the initial state of the button; defaults to 0 */
    initial?: number;

    /** a hook that allows for remote state changes. */
    remoteSet?: (r:RemoteSet)=>void;
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
export class RadioButtons extends Widget {
    view(node: Vnode<RadioButtonsAttrs, this>):ViewResult { 
        // ensure a button is initially active
        const initial = node.attrs.initial || 0;

        return m(OptionButtons, this.attrs<OptionButtonsAttrs>(node.attrs, {
            class: 'hs_radio_buttons',
            buttonConstraint: OptionButtons.constraints.radio,
            buttonTransition: State.transitions.onoff,
            remoteSet: node.attrs.remoteSet,
            initial: (<any[]>node.children).map((c,i) => i===initial? 1 : 0),
            onclick: node.attrs.onclick
        }), node.children);
    }
}

export interface IconbuttonsAttrs extends WidgetAttrs {
    /** a function, called when the bitton is clicked */
    onclick: (buttonIndex:number, newState:number, states:number[])=>void;

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
 * invoked as `m(RadioButtons, <RadioButtonsAttrs>, <content>);`.
 * 
 * See {@link Optionbuttons.RadioButtonsAttrs RadioButtonsAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes used to create the embedded `OnOffButton 
 */
export class IconButtons extends Widget {
    view(node: Vnode<IconbuttonsAttrs, this>):ViewResult { 
        return m(OptionButtons, this.attrs(node.attrs, {
            class: 'hs_icon_buttons',
            buttonConstraints: node.attrs.radioMode? OptionButtons.constraints.radio : OptionButtons.constraints.none,
            onclick: node.attrs.onclick
        }), node.children);
    }
}