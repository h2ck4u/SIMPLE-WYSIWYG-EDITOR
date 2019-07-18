import cnst from './cnst';

const {
    DEFAULT_POPUP_MARGIN_BOTTOM,
    DEFAULT_POPUP_WIDTH
} = cnst;

const util = {
    /**
     * 현재 셀렉션을 계산하여 popup이 보여야할 위치를 반환합니다.
     * @returns {Object} popupPosition
     */
    getPopupPosition: function () {
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const boundingRect = range.getClientRects()[0];
        return {
            top: boundingRect.top - DEFAULT_POPUP_MARGIN_BOTTOM,
            left: boundingRect.left + boundingRect.width / 2 - DEFAULT_POPUP_WIDTH / 2
        };
    },

    /**
     * 에디터 영역내의 텍스트갯수를 셉니다. 엔터는 1글자로 처리합니다.
     */
    countText: function (editorId) {
        const elEditor = $(`#${editorId} .editor-main`);
        const children = elEditor.children();
        const newLine = children.length === 0 ? 0 : children.length - 1;
        return newLine + elEditor.text().length;
    }
}

export default util;