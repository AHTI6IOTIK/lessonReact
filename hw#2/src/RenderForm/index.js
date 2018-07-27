import { createDiv } from '../createDiv';

class RenderForm {

    constructor() {}

    createForm(method, action, name) {
        const createForm = document.createElement('form');

        createForm.name = name;
        createForm.action = action;
        createForm.method = method;
        createForm.onsubmit = this.onSubmit.bind(this);

        return createForm;
    }

    onSubmit(e) {
        e.preventDefault();

        const RenderFormID = document.getElementById('RenderFormID');
        RenderFormID && document.body.removeChild(RenderFormID)

        const name = e.target[0].value,
            div = createDiv(name, 'RenderFormID');
        e.target[0].value = '';
        document.body.appendChild(div);
    }

    getInput(inputName, inputType, placeholder = null) {

        if (inputName === undefined || inputType === undefined) {
            console.warn('Имя или тип не может быть пустым');
            return;
        }

        const input = document.createElement('input');

        input.name = inputName;
        input.type = inputType;
        input.placeholder = placeholder;

        return input;
    }

    constructForn() {

        const form = this.createForm('POST', undefined, 'insertYourName');
        const inputName = this.getInput('fullName', 'text', 'Введите имя');
        const inputSubmit = this.getInput('fBtn', 'submit');

        form.appendChild(inputName);
        form.appendChild(inputSubmit);

        return form;
    }

    render () {

        return this.constructForn();
    }
}

export default () => new RenderForm;