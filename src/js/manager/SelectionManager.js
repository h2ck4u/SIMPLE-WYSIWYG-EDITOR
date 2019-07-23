class SelectionManager {
    constructor() {}

    /**
     * 셀렉션이 isCollapsed인지 확인합니다.
     */
    isCollapsed() {
        return window.getSelection().isCollapsed;
    }

    /**
     * 현재 셀렉션을 반환합니다.
     */
    getSelection() {
        return window.getSelection();
    }

    /**
     * 현재 셀렉션의 Range를 반환합니다.
     */
    getRange() {
        return this.getSelection().getRangeAt(0);
    }

    /**
     * 현재 셀렉션에 포함된 노드를 지우고, 인자로받은 Text로 만든 Node를 삽입하고 셀렉션을 보정합니다.
     * @param {String} text 
     */
    insertNode(text) {
        const sel = this.getSelection();
        if (!sel.rangeCount) {
            return false;
        }
        sel.deleteFromDocument();
        sel.getRangeAt(0).insertNode(document.createTextNode(text));
        sel.collapseToEnd();
    }
}

export default SelectionManager;