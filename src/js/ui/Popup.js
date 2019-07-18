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
     * @returns {jQuery} popupElement
     */
    createElement() {
        const $editor = $(`#${this.editorId} .comment-container`);
        const $element = $(`<div class="popup"></div>`);

        $editor.append($element);
        return $element;
    }
}

export default Popup;