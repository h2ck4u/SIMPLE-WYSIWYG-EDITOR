import assert from 'assert';
import Label from '../../../src/js/ui/Label';

describe('Label.spec.js test', () => {
    it('getElement test', () => {
        const data = {
            name: 'textLabel',
            text: 'testText'
        }
        const label = new Label(data);
        const expected = `<label name="${data.name}">${data.text}</label>`;
        assert.strictEqual(expected, label.getElement().get(0).outerHTML);
    });

    it('updateText test', () => {
        const label = new Label({});
        label.updateText('text');
        assert.strictEqual(label.$element.text(), 'text');
    });
});