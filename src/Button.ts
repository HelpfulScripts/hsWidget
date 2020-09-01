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
 * ## &nbsp; {@link Button.ToggleButton ToggleButton}
 * Extends `Button` to keep a state. Pressing the `ToggleButton` will cycle through each of the states.
 * 
 * Invoked as `m(ToggleButton, <ToggleButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ToggleButtonAttrs ToggleButtonAttrs}
 * 
 * `<content>`: `m.Child[]` an array of states, one of which will be shown in the button
 * 
 * ## &nbsp; {@link Button.OnOffButton OnOffButton}
 * Extends `ToggleButton` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <OnOffButtonAttrs>);`. `node.children` are ignored.
 * 
 * See {@link Button.OnOffButtonAttrs OnOffButtonAttrs}
 * 
 * `<content>`: `Vnode` a Vnode to show as button content, e.g. an {@link Icon.Icon Icon}
 * 
 * ## &nbsp; {@link Button.IconButton IconButton}
 * Extends `ToggleButton` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <OnOffButtonAttrs>);`. `node.children` are ignored.
 * 
 * See {@link Button.OnOffButtonAttrs OnOffButtonAttrs}
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
import { Vnode, ViewResult }        from './Widget';
import { Widget }       from './Widget';
import { WidgetAttrs }  from './Widget';
import { Icon }         from "./Icon";
import { State, StateSetter, Stateful, StateTransition } from "./State";


export interface ClickResponse { (s:number):number; }
export const ClickResponses = {
    advance: <ClickResponse>((s:number) => s+1),
    on:      <ClickResponse>((s:number) => 1)
}


export interface ButtonAttrs extends WidgetAttrs {
    /** a function, called when the bitton is clicked */
    onclick: (newStateIndex?:number, newState?:string)=>void;
}

/**
 * ## Button
 * Shows an simple stateless push button with a label
 * 
 * Invoked as `m(Button, <ButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ButtonAttrs ButtonAttrs}
 * 
 * `<content>`: `m.Children` the text or Vnodes to show in the button
 */
export class Button extends Widget {
    /** `true` while the button is pressed down (between a `mousedown` and `mouseup` event. */
    pressed: boolean;

    /** changes the `pressed` state to the value of `down` */
    pressing: (down:boolean) => void;

    oninit(node:Vnode<ButtonAttrs, this>) {
        const s:this = node.state;
        s.pressed = false;
        s.pressing = (down:boolean) => s.pressed = down;
    }
    view(node: Vnode<ButtonAttrs, this>):ViewResult { 
        const s:this = node.state;
        
        return m(`.hs_button`, this.attrs(node.attrs, {
            class: s.pressed? 'hs_pressed' : undefined,
            onclick: node.attrs.onclick,
            onmousedown: ()=>s.pressing(true),
            onmouseup:   ()=>s.pressing(false)
        }), node.children);
    }
}


export interface ToggleButtonAttrs extends ButtonAttrs {
    /** the initial state of the button */
    initial?: number;

    /** returns a function that can be used to programmatically change the state of the button. */
    stateAccess?: (stateful:Stateful) => void;

    /** optional state transition function, defaults to `State.transitions.cycle` */
    stateTransition?: StateTransition;
}



/**
 * ## ToggleButton
 * Extends `Button` to keep a state. Pressing the `ToggleButton` will cycle through each of the states.
 * 
 * Invoked as `m(ToggleButton, <ToggleButtonAttrs>, <content>);`.
 * 
 * See {@link Button.ToggleButtonAttrs ToggleButtonAttrs}
 * 
 * `<content>`: `m.Child[]` an array of states, one of which will be shown in the button
 * 
 */
export class ToggleButton extends Button {
    /** the button's `State` object */
    state: State;

    numStates: number;

    oninit(node:Vnode<ToggleButtonAttrs, this>) {
        super.oninit(node);
        if (this.numStates===undefined) { this.numStates = (<m.Child[]>node.children).length; }
        const initial = node.attrs.initial||0;
        const transition = node.attrs.stateTransition || State.transitions.cycle;
        // set `State` to `cycle`, starting with `0`.
        this.state = new State(this.numStates, initial, transition);
        // provide state access to client:
        if (node.attrs.stateAccess) { node.attrs.stateAccess(this.state); }
    }

    view(node: Vnode<ToggleButtonAttrs, this>):ViewResult { 
        const s:this = node.state;
        
        return m(`.hs_button.state${s.state.getState()}`, this.attrs(node.attrs, {
            class: s.pressed? 'hs_pressed' : undefined,
            onclick: () => { 
                const newState = s.state.advance(true);
                // and inform the customer:
                node.attrs.onclick(newState, (s.numStates && typeof node.children[newState]==='string')? 
                    node.children[newState] : ''+newState
                );        
            },
            onmousedown: ()=>s.pressing(true),
            onmouseup:   ()=>s.pressing(false)
        }), (<m.Child[]>node.children).length>1? node.children[s.state.getState()] : node.children);
    }
}


export interface OnOffButtonAttrs extends ToggleButtonAttrs {
}

/**
 * ## OnOffButton
 * Extends `ToggleButton` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <OnOffButtonAttrs>, <content>);`. 
 * 
 * See {@link Button.OnOffButtonAttrs OnOffButtonAttrs}
 * 
 * `<content>`: `Vnode` a Vnode to show as button content, e.g. an {@link Icon.Icon Icon}.
 * If `undefined`, the `children` will be set to `['off', 'on']`.
 */
export class OnOffButton extends ToggleButton {
    static states = ['off', 'on'];
    oninit(node: Vnode<OnOffButtonAttrs, this>) { 
        this.numStates = OnOffButton.states.length;
        super.oninit(node);
        const onclick = node.attrs.onclick;
        node.attrs.onclick = i => onclick(i, OnOffButton.states[i]);
    }
    view(node: Vnode<OnOffButtonAttrs, this>):ViewResult { 
        node.attrs.class = `hs_onoff_button ${node.attrs.class || ''}`;
        node.children = node.children || OnOffButton.states;
        return super.view(node);
    }
}


export interface IconButtonAttrs extends OnOffButtonAttrs {
    /** an `mdi` icon svg string. See {@link Icon.IconAttrs IconAttrs} for details. */
    mdi?: string;
}

/**
 * ## IconButton
 * Extends `ToggleButton` for two states, 'on' and 'off'.
 * 
 * invoked as `m(OnOffButton, <OnOffButtonAttrs>);`. `node.children` are ignored.
 * 
 * See {@link Button.OnOffButtonAttrs OnOffButtonAttrs}
 * 
 * `<content>`: is ignored
 */
export class IconButton extends ToggleButton {
    oninit(node: Vnode<IconButtonAttrs, this>) { 
        this.numStates = 2;
        this.state = new State((<m.Child[]>node.children).length, node.attrs.initial||0, State.transitions.cycle);
        super.oninit(node);
    }
    view(node: Vnode<IconButtonAttrs, this>):ViewResult { 
        node.attrs.class = `hs_icon_button ${node.attrs.class || ''}`;
        if (node.children===undefined) {
            log.warn(' node.children is undefined');
        }
        node.children[0] = m(Icon, {mdi:node.attrs.mdi || 'power'});
        return super.view(node);
    }
}