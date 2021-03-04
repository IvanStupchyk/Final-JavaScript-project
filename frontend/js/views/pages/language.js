import Component from '../../views/component';

import LanguageTemplate from '../../../templates/pages/language';

import LanguageTemplateBlr from '../../../templates/pages/language-blr';

import Tasks from '../../models/tasks';

class Language extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTheme().then(resultData => {
            resolve(resultData);
        }));
    }

    render(resultData) {
        let template;

        resultData[1].status ? template = LanguageTemplate : template = LanguageTemplateBlr;
        return new Promise(resolve => resolve(template()));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
            const btnFlagBelarus = document.getElementsByClassName('btn-belarus')[0],
            btnFlagBritish = document.getElementsByClassName('btn-british')[0];

        btnFlagBelarus.addEventListener('click', () => this.addBelarusianLanguage(this.template));
        btnFlagBritish.addEventListener('click', () => this.addBritishLanguage());
    }

    addBelarusianLanguage() {
        const languageSPA = {
            type: 'british-language',
            status: false
        };

        this.model.addBelarusianLanguage(languageSPA).then(() => {
            this.redirectToConstructor();
        });
    }

    addBritishLanguage() {
        const languageSPA = {
            type: 'british-language',
            status: true
        };

        this.model.addBelarusianLanguage(languageSPA).then(() => {
            this.redirectToConstructor();
        });
    }

    redirectToConstructor() {
        location.hash = '#/constructor';
    }
}

export default Language;