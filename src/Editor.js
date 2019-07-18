import './css/editor.css';
class Editor {
    constructor(editorId) {
        this.editorId = editorId;
        this.init(editorId);

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
    }
}

export default Editor;