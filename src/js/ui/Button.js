import $ from 'jquery';

class Button {
    constructor(button) {
        this.name = button.name;
        this.label = button.label;
        this.active = false;
        this.$element = this.createElement();
    }

    /**
     * button Element를 생성합니다.
     * @returns {jQuery} buttonElement
     */
    createElement = () => {
        const $button = $(`<i class="fa fa-${this.name}" name="${this.name}"></i>`);
        return $button;
    }

    /**
     * button Element를 반환합니다.
     */
    getElement = () => {
        return this.$element;
    }

    /**
     * @param {Bollean || undefined} bActive 
     * 버튼컴포넌트의 상태를 변경하고, 활성하가 필요할경우에 active클래스를 추가하고, 그렇지 않을경우 제거합니다.
     */
    setActive = (bActive = !this.active) => {
        this.active = bActive;
        if (bActive) {
            this.$element.addClass('active');
        } else {
            this.$element.removeClass('active');
        }
    }
}

export default Button;