import Component from '../../views/component';

import Tasks from '../../models/tasks';

import HeaderTemplate from '../../../templates/partials/header';

import HeaderTemplateBlr from '../../../templates/partials/header-blr';

class Header extends Component {
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
        if (resultData[0].status) {
            const body = document.getElementsByTagName('body')[0];
            body.classList.add('black-theme');
        }
        const resource = this.request.resource;

        let template;

        resultData[1].status ? template = HeaderTemplate : template = HeaderTemplateBlr;
        return new Promise(resolve => resolve(template({
            isAboutPage: !resource,
            isConstructorPage: (resource === 'constructor'),
            isConditionsPage: (resource === 'conditions'),
            isTotalPricePage: (resource === 'total-price'),
            isStatusTheme: (resultData[0].status === true)
        })));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const checkboxTheme = document.getElementById('dark-checkbox'),
            body = document.getElementsByTagName('body')[0];

        checkboxTheme.addEventListener('click', () => this.addBlackTheme(checkboxTheme, body));
    }

    addBlackTheme(checkboxTheme, body) {
        const newStatus = {
            type: 'checkbox-theme',
            status: checkboxTheme.checked
        };

        this.model.addBlackTheme(newStatus).then(() => {
            body.classList.toggle('black-theme');
        });
    }
}

export default Header;