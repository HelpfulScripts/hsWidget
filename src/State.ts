/** a function that sets the button state to `newState`, and returns the new state. */
export interface StateSetter {
    (newState:number): number;
}

export interface Stateful {
    getNumStates: () => number;
    getState: () => number;
    setState: (newState:number) => number;
}

/** 
 * transitions `state` from its current state to a new state depending on `input`.
 * @param state the `State` to transition
 * @param input optional input value to determine state transition
 */
export interface StateTransition {
    (state:Stateful, input?:any): number;
}

interface Transitions {
    /** cycles states, incrementing the state from `0`, to `1`, to `n-1`, then back to `0`.  */
    cycle: StateTransition;
    /** sets the state to either `0` or `1`, depending on if `input` is `false` or `true` */
    onoff: StateTransition;
    // [transition:string]: StateTransition;
}

export class State implements Stateful {
    static transitions = <Transitions>{
        /** cycles states, incrementing the state from `0`, to `1`, to `n-1`, then back to `0`.  */
        cycle: (state:Stateful) => state.setState((state.getState()+1) % state.getNumStates()),
        /** sets the state to either `0` or `1`, depending on if `input` is `false` or `true` */
        onoff: (state:Stateful, input:boolean) => state.setState(input? 1 : 0)
    };
    /** the numeric state; takes values from `0` to `n-1`, with `n` the number of allowed states. */
    protected state = 0;

    public constructor(protected numStates:number, initialState=0, protected transition=State.transitions.cycle) {
        this.state = initialState;
    }
    public getNumStates = () => this.numStates;
    public getState = () => this.state;
    public setState = (newState:number) => this.state = newState % this.numStates; 

    public advance = (input?:any)=> this.transition(this, input);
}
