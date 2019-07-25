class SelectionManager {
    constructor() { }

    /**
     * 셀렉션이 isCollapsed인지 확인합니다.
     */
    isCollapsed = () => {
        return window.getSelection().isCollapsed;
    }

    /**
     * 현재 셀렉션을 반환합니다.
     */
    getSelection = () => {
        return window.getSelection();
    }

    /**
     * 현재 셀렉션의 Range를 반환합니다.
     */
    getRange = () => {
        return this.getSelection().getRangeAt(0);
    }
}

export default SelectionManager;