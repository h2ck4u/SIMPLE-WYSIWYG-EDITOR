import Popup from './js/ui/Popup';
import SelectionManager from './js/manager/SelectionManager';
import MouseEventManager from './js/manager/MouseEventManager';
import './css/editor.css';

import cnst from './js/cnst';
const {
    BUTTONS
} = cnst;
class Editor {
    constructor(editorId) {
        this.editorId = editorId;
        this.init(editorId);

        this.SelectionManager = new SelectionManager(editorId);
        this.MouseEventManager = new MouseEventManager(editorId, this);

        return this;
    }

    /**
     * 에디터 Element를 초기화합니다. 
     * 팝업,네비바를 DOM에 생성하여 append합니다.
     * @param {String} editorId 
     */
    init(editorId) {
        const $editor = $(`#${editorId}`);
        const $container = $($(`<div class="comment-container"></div>`));
        const $editableDiv = $(`<div class="editor-main" contenteditable="true"></div>`);
        $container.append($editableDiv);
        $editor.append($container);

        this.popup = new Popup(editorId, BUTTONS);
    }
}

export default Editor;