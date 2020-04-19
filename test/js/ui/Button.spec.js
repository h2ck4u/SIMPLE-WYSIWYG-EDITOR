import assert from 'assert';
import Button from '../../../src/js/ui/Button';

describe('Button.spec.js test', () => {
    it('constructor test', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel'
        }
        const button = new Button(data);

        assert.strictEqual(button.name, 'testButton');
        assert.strictEqual(button.label, 'testLabel');
        assert.strictEqual(button.active, false);
    });

    it('getElement', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        const expected = `<i class="fa fa-${data.name}" name="${data.name}"></i>`;
        assert.strictEqual(expected, button.getElement().get(0).outerHTML);

    });

    it('setActive 인자를 넘기지 않았을 경우 토글 확인 test', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        assert.strictEqual(button.active, false);
        button.setActive();
        assert.strictEqual(button.active, true);
    });

    it('setActive 인자를 넘겼을 경우 test', () => {
        const data = {
            name: 'testButton',
            label: 'testLabel',
            actionName: 'testActionName'
        }
        const button = new Button(data);
        assert.strictEqual(button.active, false);
        button.setActive(true);
        assert.strictEqual(button.active, true);
    });
});