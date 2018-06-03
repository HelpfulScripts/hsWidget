/**
 * # TypeAhead
 * Provides a search box with a type-ahead dropdown to show valid options that match the current search input.
 * 
 * ### Profile
 * invoked as `m(hswidget.TypeAhead, { <Attributes> });`
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
 *      m(hswidget.TypeAhead, { 
 *         placeholder: 'favorite hero',
 *         onsubmit: item => hero = item,
 *         list: ['Batman', 'Superman', 'Spiderman', 'Hulk']
 *      }),
 *      m('h4', friend.length? `Selected: ${friend}` : 'Remote List: Search for a Friend'),
 *      m(hswidget.TypeAhead, { 
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
    public list:string[] = [];
    private captureList(list:any[], map:(l:any[])=>string[]) {
        this.list = map? map(list) : list;
    }
    constructor(list:string|string[], map?:(item:any[])=>string[]) {
        if (typeof list === 'string') {
            m.request({ method: "GET", url: list })
            .then((data:any[]) => this.captureList(data, map));
        } else {
            this.captureList(list, map);
        }
    }
}

export class TypeAhead {
    typeAheadList:string[] = [];
    hidden = true;
    value = '';
    inputNode:any;
    view(node:Vnode) {
        const gl = new GetList(node.attrs.list);
        const nosubmit = () => console.log('no submit function defined');
        const submit = (v:string) => node.attrs.onsubmit? node.attrs.onsubmit(v) : nosubmit();
        const select = (e:any) => { if (e) { 
            submit(e.target.attributes.name.value);
            this.inputNode.value = '';
            this.hidden = true;
        }};
        const input = (e:any) => {
            const n = this.inputNode = e.target;
            const input = this.value = n.value;
            const withinInput = new RegExp(`${input}`, 'gi');
            const beginningOfInput = new RegExp(`^${input}`, 'gi');
            this.typeAheadList = gl.list.filter((l:string) => l.match(withinInput));
            n.value = this.typeAheadList.filter((l:string) => l.match(beginningOfInput))[0] || input; 
            this.hidden = n.value.length===0; 
            let pos = input.length;
            n.setSelectionRange(pos, n.value.length);
        };
        const keyPressed = (e:any) => {
            const n = this.inputNode = e.target;
            if (e.code === 'Enter') {
                submit(n.value);
                n.value = '';
                 this.hidden = true;
            } else if (e.code === 'Backspace') {
                const input = n.firstChild.data;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };
        const inputNode = m(`input.hs-typeahead-input${this.value?'.hs-typeahead-value' : '.hs-typeahead-placeholder'}`, 
            {
                contenteditable:true,
                placeholder:    node.attrs.placeholder,
                autofocus:      node.attrs.autofocus || true,
                onkeydown:      keyPressed.bind(this),
                oninput:        input.bind(this)
            }, 
            m.trust(this.value?this.value : node.attrs.placeholder));

        return m('.hs-form', [
            inputNode, 
            this.hidden? undefined : 
                m('.hs-typeahead-list', this.typeAheadList.map((l:string) => 
                    m('', { onclick: select.bind(this) }, emphasize(l, this.value))))
        ]);
    }
}