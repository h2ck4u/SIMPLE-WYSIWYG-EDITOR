import $ from 'jquery';
import Label from './Label';
import util from '../util';

class Nav {
    constructor(editor, labels, maxTextCount) {
        this.editor = editor;
        this.labels = [];
        this.maxTextCount = maxTextCount
        this.$element = this.createElement(labels);
    }

    /**
     * Nav Element를 생성합니다.
     * @returns {jQuery} navElement
     */
    createElement(labels) {
        const $editor = this.editor.getContainerElement();
        const $element = $(`<div class="label"></div>`);

        labels.forEach(label => {
            label.text = label.name === 'maxCount' ? ` / ${this.maxTextCount}` : 0;
            const labelComponent = new Label(label);
            this.labels.push(labelComponent);
            const $label = labelComponent.getElement();
            $element.append($label);
        });

        $editor.append($element);
        return $element;
    }

    /**
     * nav Element를 반환합니다.
     */
    getElement() {
        return this.$element;
    }

    /**
     * 현재 글자수를 나타내는 currCount Label의 텍스트를 업데이트합니다.
     */
    updateTextCount() {
        const currCountLabel = this.findLabel('currCount');
        currCountLabel.updateText(util.countText(this.editor.getMainElement()));
    }

    /**
     * 인자로 받은 name과 같은 label을 찾아 반환합니다.
     * @param {String} name 
     */
    findLabel(name) {
        for (let i = 0; i < this.labels.length - 1; i++) {
            if (this.labels[i].getElement().attr('name') === name) {
                return this.labels[i];
            }
        }
    }
}

export default Nav;