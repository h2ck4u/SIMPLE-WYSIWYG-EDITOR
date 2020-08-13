<<<<<<< HEAD
import Nav from './wysiwyg/ui/Nav';
import Popup from './wysiwyg/ui/Popup';
import KeyEventManager from './wysiwyg/manager/KeyEventManager';
import SelectionManager from './wysiwyg/manager/SelectionManager';
import MouseEventManager from './wysiwyg/manager/MouseEventManager';

import cnst from './wysiwyg/cnst';
=======
import Nav from './editor/ui/Nav';
import Popup from './editor/ui/Popup';
import KeyEventManager from './editor/manager/KeyEventManager';
import SelectionManager from './editor/manager/SelectionManager';
import MouseEventManager from './editor/manager/MouseEventManager';

import cnst from './editor/cnst';
>>>>>>> 49c5ba261b1f76d3c7ef39ee4d3edb6b3992d820
const {
    BUTTONS, NAV_LABEL
} = cnst;
class Editor {
    constructor(editorId, config) {
        this.editorId = editorId;
        this.config = config;
        this.init(editorId);

        this.SelectionManager = new SelectionManager(editorId);
        this.KeyEventManager = new KeyEventManager(editorId, this);
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
        this.nav = new Nav(editorId, NAV_LABEL, this.config["MAX_TEXT_COUNT"]);
    }
}

export default Editor;