import $ from 'jquery';

class Label {
    constructor(label) {
        this.$element = this.createElement(label.name, label.text);
    }

    /**
     * Label Element를 생성합니다.
     * @param {String} name 
     * @param {String} text 
     * @returns {jQuery} buttonElement
     */
    createElement = (name, text) => {
        const $element = $(`<label name="${name}">${text}</label>`);
        return $element;
    }

    /**
     * Label Element를 반환합니다.
     * @returns {jQuery} buttonElement
     */
    getElement = () => {
        return this.$element;
    }

    /**
     * Label의 텍스트를 업데이트합니다.
     * @param {String} text 
     */
    updateText = (text) => {
        this.$element.text(text);
    }
}

export default Label;