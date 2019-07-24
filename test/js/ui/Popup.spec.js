import assert from 'assert';
import Popup from '../../../src/js/ui/Popup';
import Editor from '../../../src/Editor';
const editorId = 'editor';
const config = {
    MAX_TEXT_COUNT: 10
}
const editor = new Editor(editorId, config);

describe('Popup.spec.js test', () => {
    it('constructor test', () => {
        const data = [
            {
                name: 'bold',
                label: 'b',
                actionName: 'bold'
            },
            {
                name: 'italic',
                label: 'i',
                actionName: 'italic'
            },
            {
                name: 'underline',
                label: 'u',
                actionName: 'underline'
            },
            {
                name: 'strikethrough',
                label: 's',
                actionName: 'strikeThrough'
            }
        ]
        const popup = new Popup(editor, editorId, data);

        assert.strictEqual(editorId, popup.editorId);
        assert.strictEqual(data.length, popup.buttons.length);
    });

    it('setPosition test', () => {
        const popup = new Popup(editor, editorId, []);
        popup.setPosition(100, 100);
        assert.equal('100px', popup.$element.css('top'));
        assert.equal('100px', popup.$element.css('left'));
    });
});