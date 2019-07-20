import cnst from '../cnst';

const {
    COMMAND_NAME
} = cnst;

const Action = {
    [COMMAND_NAME.BOLD]: function () {
        document.execCommand('bold');
    },
    [COMMAND_NAME.ITALIC]: function () {
        document.execCommand('italic');
    },
    [COMMAND_NAME.STRIKETHROUGH]: function () {
        document.execCommand('strikeThrough');
    },
    [COMMAND_NAME.UNDERLINE]: function () {
        document.execCommand('underline');
    },
    [COMMAND_NAME.DELETE]: function () {
        document.execCommand('delete');
    }
}

export default Action;