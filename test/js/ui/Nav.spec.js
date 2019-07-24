import assert from 'assert';
import Nav from '../../../src/js/ui/Nav';
import Editor from '../../../src/Editor';

const editorId = 'editor';
const config = {
    MAX_TEXT_COUNT: 10
}
const editor = new Editor(editorId, config);

describe('Nav.spec.js test', () => {
    let nav, labels;
    before('', () => {
        labels = [
            {
                name: 'currCount',
                text: 0
            },
            {
                name: 'maxCount',
                text: 0
            }
        ];
        nav = new Nav(editor, labels, config.MAX_TEXT_COUNT);
    });
    it('constructor test', () => {
        assert.strictEqual(config.MAX_TEXT_COUNT, nav.maxTextCount);
        assert.strictEqual(labels.length, nav.labels.length);
    });

    it('findLabel test', () => {
        const label = nav.findLabel('currCount');
        assert.equal('currCount', label.getElement().attr('name'));
    });

    it('findLabel 찾는 label이 없는 경우 test', () => {
        const label = nav.findLabel('test');
        assert.equal(undefined, label);
    });
});