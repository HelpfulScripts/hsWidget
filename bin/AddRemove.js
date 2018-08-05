"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
class AddButton {
    view(node) {
        return hslayout_1.m('.hs-add-button', { onclick: node.attrs.onclick }, '');
    }
}
exports.AddButton = AddButton;
class RemoveButton {
    view(node) {
        return hslayout_1.m('.hs-remove-button', { onclick: node.attrs.onclick }, '');
    }
}
exports.RemoveButton = RemoveButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkUmVtb3ZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL0FkZFJlbW92ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWtCQSx1Q0FBd0M7QUFFeEM7SUFDSSxJQUFJLENBQUMsSUFBVTtRQUNYLE9BQU8sWUFBQyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsT0FBTyxFQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDbkUsQ0FBQztDQUNKO0FBSkQsOEJBSUM7QUFFRDtJQUNJLElBQUksQ0FBQyxJQUFVO1FBQ1gsT0FBTyxZQUFDLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxPQUFPLEVBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBQ0o7QUFKRCxvQ0FJQyJ9