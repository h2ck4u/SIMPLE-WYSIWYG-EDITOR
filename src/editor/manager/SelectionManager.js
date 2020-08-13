class SelectionManager {
    constructor() {}

    /**
     * 셀렉션이 isCollapsed인지 확인합니다.
     */
    isCollapsed() {
        return window.getSelection().isCollapsed;
    }

}

export default SelectionManager;