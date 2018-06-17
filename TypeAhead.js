import { m } from 'hslayout';
function emphasize(item, match) {
    const re = new RegExp(match, 'gi');
    const decorations = item
        .replace(re, (m) => `<b>${m}</b>`)
        .split('<')
        .map((s) => {
        if (s.startsWith('/b>')) {
            return m('span', { name: item }, s.slice(3));
        }
        else if (s.startsWith('b>')) {
            return m('b', { name: item }, s.slice(2));
        }
        else {
            return m('span', { name: item }, s);
        }
    });
    return m('span', decorations);
}
class GetList {
    constructor(list, map) {
        this.list = [];
        if (typeof list === 'string') {
            m.request({ method: "GET", url: list })
                .then((data) => this.captureList(data, map));
        }
        else {
            this.captureList(list, map);
        }
    }
    captureList(list, map) {
        this.list = map ? map(list) : list;
    }
}
export class TypeAhead {
    constructor() {
        this.typeAheadList = [];
        this.hidden = true;
        this.value = '';
    }
    view(node) {
        const gl = new GetList(node.attrs.list);
        const nosubmit = () => console.log('no submit function defined');
        const submit = (v) => node.attrs.onsubmit ? node.attrs.onsubmit(v) : nosubmit();
        const select = (e) => {
            if (e) {
                submit(e.target.attributes.name.value);
                this.inputNode.value = '';
                this.hidden = true;
            }
        };
        const input = (e) => {
            const n = this.inputNode = e.target;
            const input = this.value = n.value;
            const withinInput = new RegExp(`${input}`, 'gi');
            const beginningOfInput = new RegExp(`^${input}`, 'gi');
            this.typeAheadList = gl.list.filter((l) => l.match(withinInput));
            n.value = this.typeAheadList.filter((l) => l.match(beginningOfInput))[0] || input;
            this.hidden = n.value.length === 0;
            let pos = input.length;
            n.setSelectionRange(pos, n.value.length);
        };
        const keyPressed = (e) => {
            const n = this.inputNode = e.target;
            if (e.code === 'Enter') {
                submit(n.value);
                n.value = '';
                this.hidden = true;
            }
            else if (e.code === 'Backspace') {
                const input = n.firstChild.data;
                if (input.length > 0) {
                    n.value = input.slice(0);
                }
            }
        };
        const inputNode = m(`input.hs-typeahead-input${this.value ? '.hs-typeahead-value' : '.hs-typeahead-placeholder'}`, {
            contenteditable: true,
            placeholder: node.attrs.placeholder,
            autofocus: node.attrs.autofocus || true,
            onkeydown: keyPressed.bind(this),
            oninput: input.bind(this)
        }, m.trust(this.value ? this.value : node.attrs.placeholder));
        return m('.hs-form', [
            inputNode,
            this.hidden ? undefined :
                m('.hs-typeahead-list', this.typeAheadList.map((l) => m('', { onclick: select.bind(this) }, emphasize(l, this.value))))
        ]);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHlwZUFoZWFkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL1R5cGVBaGVhZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQ0EsT0FBTyxFQUFFLENBQUMsRUFBUyxNQUFNLFVBQVUsQ0FBQztBQUdwQyxtQkFBbUIsSUFBVyxFQUFFLEtBQVk7SUFDeEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ25DLE1BQU0sV0FBVyxHQUFHLElBQUk7U0FDbkIsT0FBTyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQVEsRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUN4QyxLQUFLLENBQUMsR0FBRyxDQUFDO1NBQ1YsR0FBRyxDQUFDLENBQUMsQ0FBUSxFQUFFLEVBQUU7UUFDZCxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3QzthQUFNLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMzQixPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO2FBQU07WUFDSCxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDcEM7SUFDTCxDQUFDLENBQUMsQ0FBQztJQUNQLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztBQUNsQyxDQUFDO0FBRUQ7SUFLSSxZQUFZLElBQW9CLEVBQUUsR0FBMkI7UUFK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