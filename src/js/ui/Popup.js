import Button from './Button';

class Popup {
    constructor(editorId, buttons) {
        this.editorId = editorId;
        this.top = 0;
        this.left = 0;
        this.buttons = [];
        this.$element = this.createElement(buttons);
    }

    /**
     * popup에 필요한 button들을 포함한 popup Element를 생성합니다.
     * @param {Array} buttons 
     * @returns {jQuery} popupElement
     */
    createElement(buttons) {
        const $editor = $(`#${this.editorId} .comment-container`);
        const $element = $(`<div class="popup hide"></div>`);

        buttons.forEach(button => {
            const buttonComponent = new Button(button);
            this.buttons.push(buttonComponent);
            const $button = buttonComponent.getElement();
            $element.append($button);
        });

        $editor.append($element);
        return $element;
    }

    /**
     * popup의 위치를 셋팅합니다.
     * @param {Number} top 
     * @param {Number} left 
     */
    setPosition(top, left) {
        this.$element.css({
            top: top,
            left: left
        });
    }

    /**
     * popup을 보여줍니다.
     */
    show() {
        this.$element.removeClass('hide');
    }

    /**
     * popup을 숨깁니다.
     */
    hide() {
        if (!this.$element.hasClass('hide')) {
            this.$element.addClass('hide');
        }
    }
}

export default Popup;