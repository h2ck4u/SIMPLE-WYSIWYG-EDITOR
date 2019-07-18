class Button {
    constructor(button) {
        this.name = button.name;
        this.label = button.label;
        this.status = false;
        this.$element = this.createElement();
    }

    /**
     * button Element를 생성합니다.
     * @returns {jQuery} buttonElement
     */
    createElement() {
        const $button = $(`<i class="fa fa-${this.name}" name="${this.name}"></i>`);
        return $button;
    }

    /**
     * button Element를 반환합니다.
     */
    getElement() {
        return this.$element;
    }
}

export default Button;