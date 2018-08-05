"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
function oneOfItems(items, title) {
    Object.keys(this.items).forEach((key) => {
        this.items[key].isSelected = (key === title);
    });
}
exports.oneOfItems = oneOfItems;
function anyItems(items, title) {
    this.items[title].isSelected = !this.items[title].isSelected;
}
exports.anyItems = anyItems;
class Selector {
    constructor() {
        this.updateSelected = [oneOfItems, anyItems][0];
        this.items = {};
    }
    init(desc, updateSelected = oneOfItems) {
        this.updateSelected = updateSelected.bind(this);
        desc.items = desc.items || [];
        desc.changed = desc.changed || ((item) => console.log(`missing changed() function for menu item ${item}`));
        this.checkSelectedItem(desc);
        return desc;
    }
    ;
    checkSelectedItem(desc) {
        if (this.selectedItem === undefined) {
            if (typeof desc.defaultItem === 'number') {
                this.selectedItem = desc.items[desc.defaultItem % desc.items.length];
            }
            else {
                this.selectedItem = desc.defaultItem || desc.items[0];
            }
        }
    }
    internalStateUpdate(desc, item) {
        this.selectedItem = item;
        this.checkSelectedItem(desc);
        this.updateSelected(this.items, this.selectedItem);
    }
    renderItem(desc, i) {
        const reactor = (callback) => (item) => {
            this.internalStateUpdate(desc, item);
            if (typeof callback === 'function') {
                callback(item);
            }
        };
        const l = desc.items[i] || '';
        const itemCss = desc.itemCss || [];
        this.checkSelectedItem(desc);
        return selectable({
            title: l,
            css: itemCss[i],
            isSelected: this.selectedItem ? (l.toLowerCase() === this.selectedItem.toLowerCase()) : false,
            mouseDown: reactor(desc.mouseDown),
            mouseUp: reactor(desc.mouseUp),
            clicked: reactor(desc.changed)
        });
    }
}
exports.Selector = Selector;
;
function selectable(childDesc) {
    const css = childDesc.css || '';
    const cssSelected = `${childDesc.isSelected ? 'hs-selected' : ''}`;
    const onclick = childDesc.clicked ? () => { childDesc.clicked(childDesc.title); } : undefined;
    const onmousedown = childDesc.mouseDown ? () => { childDesc.mouseDown(childDesc.title); } : undefined;
    const onmouseup = childDesc.mouseUp ? () => { childDesc.mouseUp(childDesc.title); } : undefined;
    return hslayout_1.m(`.hs-selectable ${css} ${cssSelected}`, { style: childDesc.style, onclick: onclick, onmousedown: onmousedown, onmouseup: onmouseup }, childDesc.title);
}
exports.selectable = selectable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0b3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvU2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFxQkEsdUNBQTZCO0FBMEM3QixvQkFBMkIsS0FBNkIsRUFBRSxLQUFZO0lBQ2xFLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxHQUFHLENBQUMsR0FBRyxLQUFHLEtBQUssQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQUpELGdDQUlDO0FBTUQsa0JBQXlCLEtBQTZCLEVBQUUsS0FBWTtJQUNoRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLFVBQVUsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsVUFBVSxDQUFDO0FBQ2pFLENBQUM7QUFGRCw0QkFFQztBQU1EO0lBQUE7UUFPWSxtQkFBYyxHQUFZLENBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBS3BELFVBQUssR0FBNEIsRUFBRSxDQUFDO0lBK0NoRCxDQUFDO0lBN0NHLElBQUksQ0FBQyxJQUFpQixFQUFFLGlCQUEwQixVQUFVO1FBQ3hELElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsSUFBVyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7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