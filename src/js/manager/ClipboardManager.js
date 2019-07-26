import $ from 'jquery';
import util from '../util';
import messages from '../messages';
const {
    MESSAGE_PASTE_TEXT_EXCEEDED,
} = messages;

class ClipboardManager {
    constructor(editor) {
        this.editor = editor;
        this.textController = editor.textController;
        this.uiController = editor.uiController
        this.selectionManager = editor.selectionManager;
        this.maxTextCount = editor.config["MAX_TEXT_COUNT"];
        this.browser = {
            isMSEdge: false,
            isIE11: false,
            isChrome: false
        }
        this.$element = this.createElement();
        this.init();
    }

    /**
     * ClipboardManager를 초기화 합니다.
     */
    init = () => {
        this.checkBrowser();
        this.attachEvent();
    }

    /**
     * Clipboard Element를 생성합니다.
     * @returns {jQuery} ClipboardElement
     */
    createElement = () => {
        const $editor = this.editor.getContainerElement();
        const $element = $('<div>');
        $element.attr({
            contentEditable: true,
            id: 'clipboard'
        });
        $editor.append($element);

        return $element;
    }

    /**
     * ClipboardManager에 필요한 이벤트들을 등록합니다.
     */
    attachEvent = () => {
        const $editor = this.editor.getMainElement();
        if (this.browser.isChrome) {
            $editor.on('paste', this.onPaste);
        } else if (this.browser.isIE11 || this.browser.isMSEdge) {
            $editor.on('beforepaste', this.onBeforePaste);
            $editor.on('paste', this.onPasteForIE);
        }
    }

    /**
     * 커스텀 클립보드의 paste 이벤트를 컨트롤 합니다.
     * @param {e} event
     */
    onPaste = (e) => {
        const pasteData = this.getPasteData(e);
        const pasteAble = this.chekcPasteable(pasteData);

        if (pasteAble) {
            this.textController.insertHTMLNode(pasteData);
            this.uiController.updateTextCount();
        } else {
            this.uiController.showAlert(MESSAGE_PASTE_TEXT_EXCEEDED.KO);
        }

        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * 커스텀 클립보드의 beforepaste 이벤트를 컨트롤 합니다.
     * @param {e} event
     */
    onBeforePaste = (e) => {
        const range = this.selectionManager.getRange();
        this.$element.text('');
        this.$element.focus();
        setTimeout(() => {
            const pasteData = this.$element.html();
            const pasteAble = this.chekcPasteable(this.$element.text());
            if (pasteAble && !!pasteData) {
                this.selectionManager.addRange(range);
                this.textController.insertHTMLNode(pasteData);
                this.uiController.updateTextCount();
            } else {
                this.uiController.showAlert(MESSAGE_PASTE_TEXT_EXCEEDED.KO);
                this.$element.text('');
            }

            e.stopPropagation();
            e.preventDefault();
        }, 0);
    }

    /**
     * IE브라우저에서 커스텀 클립보드의 paste 이벤트를 컨트롤 합니다.
     * @param {e} event
     */
    onPasteForIE = (e) => {
        this.editor.getMainElement().focus();
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    /**
     * clipboardData를 꺼내옵니다.
     * @param {e} event
     */
    getPasteData = (e) => {
        const data = e.originalEvent.clipboardData.getData('text/html') || e.originalEvent.clipboardData.getData('text');
        return data;
    }

    /**
     * 붙여넣기가 가능한지 판단합니다.
     * @param {String} pasteData
     */
    chekcPasteable(pasteData) {
        return util.countText(this.editor.getMainElement()) + pasteData.length < this.maxTextCount;
    }

    /**
     * userAgent를 이용하여 현재 브라우저를 체크합니다.
     */
    checkBrowser = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        this.browser = {
            isMSEdge: userAgent.indexOf('edge') > -1,
            isIE11: userAgent.indexOf('trident/7') > -1,
            isChrome: userAgent.indexOf('chrome') > -1 && userAgent.indexOf('edge') < 0
        };
    }
}


export default ClipboardManager;