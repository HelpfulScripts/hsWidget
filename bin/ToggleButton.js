"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const hslayout_1 = require("hslayout");
const Selector_1 = require("./Selector");
const Selector_2 = require("./Selector");
class ToggleButton extends Selector_1.Selector {
    constructor() {
        super(...arguments);
        this.toggleIndex = -1;
        this.mouseDown = '';
    }
    view(node) {
        const desc = this.init(node.attrs.desc, Selector_2.oneOfItems);
        node.attrs.desc = undefined;
        const css = node.attrs.css || '';
        const style = node.attrs.style || '';
        const parentChanged = desc.changed;
        desc.changed = ((item) => {
            this.toggleIndex = (this.toggleIndex + 1) % desc.items.length;
            item = desc.items[this.toggleIndex];
            this.internalStateUpdate(desc, item);
            if (parentChanged) {
                parentChanged(item);
            }
        });
        if (this.toggleIndex < 0) {
            this.toggleIndex = 0;
        }
        desc.mouseDown = () => this.mouseDown = '.hs-button-pressed';
        desc.mouseUp = () => this.mouseDown = '';
        return hslayout_1.m(`.hs-toggle-button${css}${this.mouseDown}`, { style: style }, hslayout_1.m('span', this.renderItem(desc, this.toggleIndex)));
    }
}
exports.ToggleButton = ToggleButton;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9nZ2xlQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1RvZ2dsZUJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQWlDQSx1Q0FBd0M7QUFDeEMseUNBQTBDO0FBQzFDLHlDQUEwQztBQW1CMUMsa0JBQTBCLFNBQVEsbUJBQVE7SUFBMUM7O1FBQ1ksZ0JBQVcsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNqQixjQUFTLEdBQUcsRUFBRSxDQUFDO0lBeUIzQixDQUFDO0lBeEJHLElBQUksQ0FBQyxJQUFXO1FBQ1osTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxxQkFBVSxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDO1FBQzVCLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQztRQUNqQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7UUFHckMsTUFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxJQUFXLEVBQUUsRUFBRTtZQUM1QixJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM1RCxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLGFBQWEsRUFBRTtnQkFBRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7YUFBRTtRQUMvQyxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksSUFBSSxDQUFDLFdBQVcsR0FBQyxDQUFDLEVBQUU7WUFBRSxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQztTQUFFO1FBRWpELElBQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxvQkFBb0IsQ0FBQztRQUM3RCxJQUFJLENBQUMsT0FBTyxHQUFLLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRTNDLE9BQU8sWUFBQyxDQUFDLG9CQUFvQixHQUFHLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFDLEtBQUssRUFBQyxFQUFFLFlBQUMsQ0FBQyxNQUFNLEVBQ3pFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FDMUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKO0FBM0JELG9DQTJCQyJ9