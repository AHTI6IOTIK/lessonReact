import {createDiv} from './createDiv';
import RenderForm from './RenderForm';

const forms = RenderForm().render();
document.body.appendChild(createDiv('clickMe','clickMe'));
document.body.appendChild(forms);