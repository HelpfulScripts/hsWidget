/**
 * # TypeAhead
 * Provides a list search box with a type-ahead dropdown to show valid options that match the regex search input.
 * 
 * ### Profile
 * invoked as `m(hsWidget.TypeAhead, { <Attributes> });`
 * 
 * ### Attributes (node.attrs):
 * - **list**: `string | string[]` the list to search in. If `list` is a string, it serves
 *    as a URL to a `json` file containing an array of search terms. Else, if it is a 
 *    string[] it serves directly as an array of search terms
 * - **placeholder**: `string` an indicator what to enter in the search box
 * - **onsubmit**: `(term:string, matches:string[]) => void`  a function to call with the selected `term`, as
 *      well as all `matches` to the current filter term.
 * - **autofocus**?: `boolean` whether the search box automatically gets the focus, defaults to `true`
 * - **autocomplete**?: `boolean` if true, autocompletes the input with the first start-of-word match in the list
 *      defaults to `true`
 * 
 * ### Example
 * <example>
 * <file name='script.js'>
 * let hero = '';
 * let friend = '';
 * m.mount(root, {view: () => m('.hs-white', [
 *      m('h4', hero.length? `Selected: ${hero}` : 'Local List: Search for a Superhero'),
 *      m(hsWidget.TypeAhead, { 
 *         placeholder: 'favorite hero',
 *         onsubmit: item => hero = item,
 *         list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
 *      }),
 *      m('h4', friend.length? `Selected: ${friend}` : 'Remote List: Search for a Friend'),
 *      m(hsWidget.TypeAhead, { 
 *         placeholder: 'best friend',
 *         onsubmit: item => friend = item,
 *         autofocus: true,
 *         list: 'example/search.json'
 *      })
 *   ])
 * });
 * </file>
 * </example>
 * 
 */

 /** */
import { Log } from 'hsutil';  const log = new Log('TypeAhead');
import m from "mithril";
type Vnode = m.Vnode<any, any>;

// emphasize literal matches as *bold* in the drop down list
function emphasize(item:string, match:string) {
    const re = new RegExp(match, 'gi');
    const decorations = item
        .replace(re, (m:string) => `<b>${m}</b>`)
        .split('<')
        .map((s:string) => {
            if (s.startsWith('/b>')) { 
                return m('span', {name:item}, s.slice(3)); 
            } else if (s.startsWith('b>')) {
                return m('b', {name:item}, s.slice(2));
            } else {
                return m('span', {name:item}, s);
            }
        });
    return m('span', decorations); 
}

class GetList {
    private url:string;
    public list:string[] = [];

    constructor(protected map?:(item:any[])=>string[]) {
    }

    public search(list:string|string[]) {
        if (typeof list === 'string') {
            if (this.url!==list) {
                this.url = list;
                m.request({ method: "GET", url: list })
                .then((data:any[]) => this.captureList(data, this.map))
                .catch((e:any) =>log.warn(`requesting ${list}: ${e.toString()}`));
            }
        } else {
            this.captureList(list, this.map);
        }
    }

    private captureList(list:any[], map:(l:any[])=>string[]) {
        this.list = map? map(list) : list;
    }

}

export class TypeAhead {
    gl = new GetList();
    oninit(node:Vnode) {
        node.state.inputNode = '';
        node.state.hidePopdown = true;
        node.state.value = '';
        node.state.typeAheadList = [];
        node.state.onsubmit = node.attrs.onsubmit;
        node.state.autocomplete = node.attrs.autocomplete===undefined? true : node.attrs.autocomplete;
    }
    view(node:Vnode) {
        this.gl.search(node.attrs.list);
        const nosubmit = () => log.warn('no submit function defined');
        const getList = (typed:string) => node.state.typeAheadList = this.gl.list.filter(l => l.match(new RegExp(typed, 'gi')));
        
        const submit = (v:string) => {
            node.state.inputNode.setSelectionRange(0, node.state.inputNode.value.length);
            node.state.hidePopdown = true;
            return (node.state.onsubmit || nosubmit)(v, node.state.typeAheadList);
        };
        const select = (e:any) => { if (e) { 
            const selected = e.target.attributes.name.value;
            node.state.inputNode.value = selected;
            node.state.typeAheadList = getList(selected);
            submit(selected);
        }};

        /**
         * reacts to inputs in text field: matches current input against the list of candidates
         * @param e the input event
         */
        const oninput = (e:any) => {
            const n = node.state.inputNode = e.target;
            const typed = node.state.value = n.value;
            if (typed.length>0) {
                node.state.typeAheadList = getList(typed);
                if (node.state.autocomplete) { autoComplete(typed, node); }
            }
        };

        /**
         * unhides the popdown and deals with 'Enter' and 'Backspace' keys.
         * @param e the key event
         */
        const keyPressed = (e:any) => {
            const n = node.state.inputNode = e.target;
            node.state.hidePopdown = false; 
            if (e.code === 'Enter') {
                submit(n.value);
            } else if (e.code === 'Escape') {
                node.state.hidePopdown = true; 
            } else if (e.code === 'Backspace' && n.textLength>0) {
                const input:string = n.textContent;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };

        const selector = node.state.value? '.hs-typeahead-value' : '.hs-typeahead-placeholder';    
        return m('.hs-form', [
            m(`input.hs-typeahead-input${selector}`, {
                contenteditable:true,
                placeholder:    node.attrs.placeholder,
                autofocus:      node.attrs.autofocus || true,
                onkeydown:      keyPressed,
                oninput:        oninput
            }, m.trust(node.state.value?node.state.value : node.attrs.placeholder)
            ),
            node.state.hidePopdown? undefined : 
                m('.hs-typeahead-list', node.state.typeAheadList.map((l:string) => 
                    m('', { onclick: select }, emphasize(l, node.state.value))))
        ]);
    }
}

/**
 * adds 
 * @param typed the text typed so far
 * @param node 
 */
function autoComplete(typed:string, node:Vnode) {
    const n = node.state.inputNode;
    // search the list again, matching for `typed` at the start of the entries
    const startOfLineInput = new RegExp(`^${typed}`, 'gi');
    n.value = node.state.typeAheadList.filter((l:string) => l.match(startOfLineInput))[0] || typed; 
    // select remaining right-hand (un-typed) part of match for replacement 
    n.setSelectionRange(typed.length, n.value.length);
}