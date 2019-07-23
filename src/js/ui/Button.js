import $ from 'jquery';

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

    /**
     * 상태를 토글합니다.
     */
    toggelStatus() {
        this.status = !this.status;
        if (this.status) {
            this.$element.addClass('active');
        } else {
            this.$element.removeClass('active');
        }
    }

    /**
     * 상태를 셋팅합니다.
     * @returns {boolean} status
     */
    setStatus(status) {
        this.status = status;
        if (!status) {
            this.$element.removeClass('active');
        } else {
            this.$element.addClass('active');
        }
    }
}

export default Button;