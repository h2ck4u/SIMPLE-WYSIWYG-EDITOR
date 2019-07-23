import $ from 'jquery';
import cnst from './cnst';

const {
    DEFAULT_POPUP_MARGIN_BOTTOM,
    DEFAULT_POPUP_WIDTH
} = cnst;

const util = {
    /**
     * 현재 셀렉션을 계산하여 popup이 보여야할 위치를 반환합니다.
     * @param {Range} range
     * @returns {Object} popupPosition
     */
    getPopupPosition: function (range) {
        const boundingRect = range.getClientRects()[0];
        return {
            top: boundingRect.top - DEFAULT_POPUP_MARGIN_BOTTOM,
            left: boundingRect.left + boundingRect.width / 2 - DEFAULT_POPUP_WIDTH / 2
        };
    },

    /**
     * @param {jQuery} $editorMain 
     * 에디터 영역내의 텍스트갯수를 셉니다. 엔터는 1글자로 처리합니다.
     */
    countText: function ($editorMain) {
        const children = $editorMain.children();
        const newLine = children.length === 0 ? 0 : children.length - 1;
        return newLine + $editorMain.text().length;
    },

    /**
     * 현재 셀렉션의 모든 노드들의 스타일을 머지하여 계산합니다.
     * @returns {Object} style
     */
    mergeStyle: function (editorId) {
        const sel = window.getSelection();
        const range = sel.getRangeAt(0);
        const clonedContents = range.cloneContents().childNodes;
        const $anchorNode = $(sel.anchorNode);
        const $focusNode = $(sel.focusNode);

        const $anchorParents = $anchorNode.parentsUntil(`#${editorId} .editor-main`);
        const $focusParents = $focusNode.parentsUntil(`#${editorId} .editor-main`);

        const anchorStyle = this.getStyle($anchorParents);
        const focusStyle = this.getStyle($focusParents);

        const currStyle = {
            bold: anchorStyle.bold && focusStyle.bold,
            italic: anchorStyle.italic && focusStyle.italic,
            underline: anchorStyle.underline && focusStyle.underline,
            strikethrough: anchorStyle.strikethrough && focusStyle.strikethrough
        };

        if (!currStyle.bold && !currStyle.italic && !currStyle.underline && !currStyle.strikethrough) {
            return currStyle;
        } else {
            for (let i = 1; i < clonedContents.length - 1; i++) {
                let node = clonedContents[i];
                let nodeName = node.nodeName;
                if (currStyle['bold']) {
                    currStyle.bold = (nodeName === 'B' || nodeName === 'STRONG') || $(node).find('b, strong').length > 0;
                }
                if (currStyle['italic']) {
                    currStyle.italic = (nodeName === 'I' || nodeName === 'EM') || $(node).find('i, em').length > 0;
                }
                if (currStyle['underline']) {
                    currStyle.underline = nodeName === 'U' || $(node).find('u').length > 0;
                }
                if (currStyle['strikethrough']) {
                    currStyle.bold = nodeName === 'STRIKE' || $(node).find('strike').length > 0;
                }
            }
            return currStyle;
        }
    },


    /**
     * node들을 순회하면서 스타일을 계산합니다.
     * @param {Array} nodes 
     */
    getStyle: function (nodes) {
        let [bold, italic, underline, strikethrough] = [false, false, false, false];
        for (let i = 0; i < nodes.length; i++) {
            let nodeName = nodes[i].nodeName;
            switch (nodeName) {
                case 'B':
                case 'STRONG':
                    bold = true;
                    break;
                case 'I':
                case 'EM':
                    italic = true;
                    break;
                case 'U':
                    underline = true;
                    break;
                case 'STRIKE':
                    strikethrough = true;
                    break;
            }
        }
        return {
            bold: bold,
            italic: italic,
            underline: underline,
            strikethrough: strikethrough
        }
    }
}

export default util;