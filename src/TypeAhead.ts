/**
 * # TypeAhead
 * Provides a list search box with a type-ahead dropdown to show valid options that match the current search input.
 * 
 * ### Profile
 * invoked as `m(hsWidget.TypeAhead, { <Attributes> });`
 * 
 * ### Attributes (node.attrs):
 * - `list: string | string[]` the list to search in. If `list` is a string, it serves
 *    as a URL to a `json` file containing an array of search terms. Else, if it is a 
 *    string[] it serves directly as an array of search terms
 * - `placeholder: string` an indicator what to enter in the search box
 * - `onsubmit: (term:string) => void`  a function to call when a term is submitted
 * - `autofocus: boolean` whether the search box automatically gets the focus
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
import { m, Vnode } from 'hslayout';
import { Log } from 'hsutil';import { SpawnSyncOptionsWithStringEncoding } from 'child_process';
  const log = new Log('TypeAhead');

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
        // node.state.list = node.attrs.list;
    }
    view(node:Vnode) {
        this.gl.search(node.attrs.list);
        const nosubmit = () => console.log('no submit function defined');
        
        const submit = (v:string) => {
            node.state.inputNode.setSelectionRange(0, node.state.inputNode.value.length);
            node.state.hidePopdown = true;
            return node.state.onsubmit? node.state.onsubmit(v) : nosubmit();
        };
        const select = (e:any) => { if (e) { 
            node.state.inputNode.value = e.target.attributes.name.value;
            submit(e.target.attributes.name.value);
        }};

        const input = (e:any) => {
            const n = node.state.inputNode = e.target;
            const input = node.state.value = n.value;
            const withinInput = new RegExp(`${input}`, 'gi');
            const beginningOfInput = new RegExp(`^${input}`, 'gi');
            node.state.typeAheadList = this.gl.list.filter((l:string) => l.match(withinInput));
            n.value = node.state.typeAheadList.filter((l:string) => l.match(beginningOfInput))[0] || input; 
            node.state.hidePopdown = n.value.length===0; 
            let pos = input.length;
            n.setSelectionRange(pos, n.value.length);
        };

        const keyPressed = (e:any) => {
            const n = node.state.inputNode = e.target;
            if (e.code === 'Enter') {
                submit(n.value);
            } else if (e.code === 'Backspace') {
                const input = n.firstChild.data;
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
                oninput:        input
            }, m.trust(node.state.value?node.state.value : node.attrs.placeholder)
            ),
            node.state.hidePopdown? undefined : 
                m('.hs-typeahead-list', node.state.typeAheadList.map((l:string) => 
                    m('', { onclick: select }, emphasize(l, node.state.value))))
        ]);
    }
}