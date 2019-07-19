import Label from './Label';

class Nav {
    constructor(editorId, labels, maxTextCount) {
        this.editorId = editorId;
        this.labels = [];
        this.maxTextCount = maxTextCount
        this.$element = this.createElement(labels);
    }

    /**
     * Nav Element를 생성합니다.
     * @returns {jQuery} navElement
     */
    createElement(labels) {
        const $editor = $(`#${this.editorId} .comment-container`);
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
}

export default Nav;