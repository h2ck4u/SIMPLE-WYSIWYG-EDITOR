import $ from 'jquery';
import Button from './Button';
import util from '../util';

class Popup {
    constructor(editor, editorId, buttons) {
        this.editor = editor;
        this.editorId = editorId;
        this.selectionManager = editor.selectionManager;
        this.buttons = [];
        this.$element = this.createElement(buttons);
    }

    /**
     * popup에 필요한 button들을 포함한 popup Element를 생성합니다.
     * @param {Array} buttons 
     * @returns {jQuery} popupElement
     */
    createElement(buttons) {
        const $editor = this.editor.getContainerElement();
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
        const position = util.getPopupPosition(this.selectionManager.getRange());

        this.setPosition(position.top, position.left);
        const style = util.mergeStyle(this.editorId);
        this.buttons.forEach(button => {
            let buttonName = button.name;
            button.setActive(style[buttonName]);
        });
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