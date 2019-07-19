class Label {
    constructor(label) {
        this.name = label.name;
        this.text = label.text;
        this.$element = this.createElement();
    }

    /**
     * Label Element를 생성합니다.
     * @returns {jQuery} buttonElement
     */
    createElement() {
        const $element = $(`<label name="${this.name}">${this.text}</label>`);
        return $element;
    }

    /**
     * Label Element를 반환합니다.
     * @returns {jQuery} buttonElement
     */
    getElement() {
        return this.$element;
    }
}

export default Label;