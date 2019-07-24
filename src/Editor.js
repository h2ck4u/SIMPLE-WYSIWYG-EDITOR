import $ from 'jquery';
import Nav from './js/ui/Nav';
import Popup from './js/ui/Popup';
import TextController from './js/controller/TextController';
import UIController from './js/controller/UIController';
import KeyEventManager from './js/manager/KeyEventManager';
import SelectionManager from './js/manager/SelectionManager';
import MouseEventManager from './js/manager/MouseEventManager';

import cnst from './js/cnst';
const {
    BUTTONS,
    NAV_LABEL
} = cnst;
class Editor {
    constructor(editorId, config) {
        this.editorId = editorId;
        this.config = config;
        this.selectionManager = new SelectionManager();
        this.textController = new TextController(this);
        this.init();
        this.uiController = new UIController(this);
        this.keyEventManager = new KeyEventManager(this);
        this.mouseEventManager = new MouseEventManager(this);

        return this;
    }

    /**
     * 에디터 Element를 초기화합니다. 
     * 팝업,네비바를 DOM에 생성하여 append합니다.
     */
    init() {
        this.$element = this.createElement();

        this.popup = new Popup(this, BUTTONS);
        this.nav = new Nav(this, NAV_LABEL, this.config["MAX_TEXT_COUNT"]);
    }

    /**
     * Editor Element를 생성합니다.
     * @returns {jQuery} Editor
     */
    createElement() {
        const $editorRoot = $(`#${this.editorId}`);
        const $container = $($(`<div class="comment-container"></div>`));
        const $editor = $(`<div class="editor-main" contenteditable="true"></div>`);
        $container.append($editor);
        $editorRoot.append($container);

        return $editorRoot;
    }

    /**
     * Editor Element를 반환합니다.
     * @returns {jQuery} Editor
     */
    getElement() {
        return this.$element;
    }

    /**
     * comment-container Element를 반환합니다.
     * @returns {jQuery} comment-container
     */
    getContainerElement() {
        return this.$element.find('.comment-container');
    }

    /**
     * editor-main Element를 반환합니다.
     * @returns {jQuery} editor-main
     */
    getMainElement() {
        return this.$element.find('.editor-main');
    }
}

export default Editor;