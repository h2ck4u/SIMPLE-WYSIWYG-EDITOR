import $ from 'jquery';
import util from '../util';
import messages from '../messages';
import command from '../command/command';
import cnst from '../cnst';

const {
    MESSAGE_PASTE_TEXT_EXCEEDED,
} = messages;
const {
    COMMAND_NAME
} = cnst;
class KeyEventManager {
    constructor(editor) {
        this.editor = editor;
        this.selectionManager = editor.selectionManager;
        this.maxTextCount = editor.config["MAX_TEXT_COUNT"];
        this.writeable = true;

        this.nav = editor.nav;
        this.attachEvent();
    }

    /**
     * 이벤트매니저를 초기화 합니다.
     */
    attachEvent() {
        const $editor = this.editor.getMainElement();
        $editor.on('input', this.input.bind(this));
        $editor.on('keydown', this.keyDown.bind(this));
        $editor.on('keypress', this.keyPress.bind(this));
        $editor.on('paste', this.paste.bind(this));
    }

    /**
     * input이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    input(e) {
        if (util.countText(this.editor.getMainElement()) > this.maxTextCount) {
            command[COMMAND_NAME.DELETE]();
        }
        this.updateTextCount();
    }

    /**
     * keyPress이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyPress(e) {
        if (util.countText(this.editor.getMainElement()) >= this.maxTextCount) {
            e.preventDefault();
            e.stopPropagation();
        }
        this.updateTextCount();
    }

    /**
     * keyDown이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    keyDown(e) {
        if (util.countText(this.editor.getMainElement()) > this.maxTextCount) {
            command[COMMAND_NAME.DELETE]();
        }
        this.updateTextCount();
    }

    /**
     * paste이벤트를 컨트롤 합니다.
     * @param {Event} e 
     */
    paste(e) {
        let text = (e.originalEvent.clipboardData || window.clipboardData).getData('text');
        if (util.countText(this.editor.getMainElement()) + text.length > this.maxTextCount) {
            alert(MESSAGE_PASTE_TEXT_EXCEEDED.KO);
            return false;
        }

        this.selectionManager.insertNode(text);

        e.stopPropagation();
        e.preventDefault();
    }

    /**
     * 현재 입력된 글자수를 업데이트 합니다.
     */
    updateTextCount() {
        this.nav.updateTextCount();
    }
}

export default KeyEventManager;