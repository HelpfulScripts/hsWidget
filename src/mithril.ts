/**
 * translates mithril libraries to an ES6 module and provides some Typescript type shortcuts.
 */


/**
 * import and re-export the mithril m objkect
 */
export const m = require("mithril");

/**
 * provide and export a Typescript Vnode type
 */
export type Vnode = typeof m.Vnode;

