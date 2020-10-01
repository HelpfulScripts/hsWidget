/**
 * # State
 * A finite state machine implementation.
 */

/** a `Stateful` interface, defining access to getting and setting the numeric state. */
export interface Stateful {
    /** 
     * returns the number of different values a state can have. 
     * Values count from `0...getNumValues()-1`.
     */
    getNumValues: () => number;
    /** returns the current state value. */
    getValue: () => number;
    /** sets a new state value and returns it after ensuring it is in range. */
    setValue: (newValue:number) => number;
}

/** 
 * transitions `state` from its current value to a new value depending on `input`.
 * @param state the `State` to transition
 * @param input optional input value to determine state transition
 * @return the new state value.
 */
export interface Transition {
    (state:Stateful, input?:any): number;
}


/**
 * ## State
 * A finite state machine. The machine maintains a numeric `state` that can take on a value 
 * out of the range `0...numValues-1`. The state value can be advanced depending
 * on a specific `input` using the `advance` method. State transition rules are defined 
 * at construction time using a `Transition` method. The default state transition simply 
 * cycles through all available states with each call to `advance`, independent of `input`.
 */
export class State implements Stateful {
    static transitions = <{[name:string]:Transition}>{
        /** cycles states, incrementing the state from `0`, to `1`, to `n-1`, then back to `0`.  */
        cycle: (state:Stateful) => state.setValue((state.getValue()+1) % state.getNumValues()),
        /** sets the state to either `0` or `1`, depending on if `input` is `false` or `true` */
        // onoff: (state:Stateful, input:boolean) => state.setState(input? 1 : 0)
    };
    /** the numeric state; takes values from `0` to `n-1`, with `n` the number of allowed states. */
    protected state = 0;

    /**
     * Creates a new `State
     * @param numValues the number of values the state can take on, from `0...numValues-1`
     * @param initialValue the initial state value, from `0...numValues-1`
     * @param transition an optional `Transition` function, defaults to State.transitions.cycle.
     */
    public constructor(protected numValues:number, initialValue=0, protected transition=State.transitions.cycle) {
        this.state = initialValue;
    }
    public getNumValues = () => this.numValues;
    public getValue = () => this.state;
    public setValue = (newValue:number) => this.state = newValue % this.numValues; 

    public advance = (input?:any)=> this.transition(this, input);
}
