import Component from '../../views/component';

import Tasks from '../../models/tasks';

import ConditionsTemplate from '../../../templates/pages/conditions';

import ConditionTemplateBlr from '../../../templates/pages/conditions-blr';

class Conditions extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTheme().then(resultData => {
            this.resultData = resultData;

            resolve(resultData);
        }));
    }

    render(resultData) {
        const {plates, wineGlasses, glasses, rugs} = resultData[2];
        let template;

        resultData[1].status ? template = ConditionsTemplate : template = ConditionTemplateBlr;
        return new Promise(resolve => resolve(template({
            plate0: plates === 0,
            plate1: plates === 1,
            plate2: plates === 2,
            plate3: plates === 3,
            plate4: plates === 4,
            plate5: plates === 5,
            plate6: plates === 6,
            plate7: plates === 7,
            plate8: plates === 8,
            plate9: plates === 9,
            plate10: plates === 10,
            wineGlass0: wineGlasses === 0,
            wineGlass1: wineGlasses === 1,
            wineGlass2: wineGlasses === 2,
            wineGlass3: wineGlasses === 3,
            wineGlass4: wineGlasses === 4,
            wineGlass5: wineGlasses === 5,
            wineGlass6: wineGlasses === 6,
            wineGlass7: wineGlasses === 7,
            wineGlass8: wineGlasses === 8,
            wineGlass9: wineGlasses === 9,
            wineGlass10: wineGlasses === 10,
            glass0: glasses === 0,
            glass1: glasses === 1,
            glass2: glasses === 2,
            glass3: glasses === 3,
            glass4: glasses === 4,
            glass5: glasses === 5,
            glass6: glasses === 6,
            glass7: glasses === 7,
            glass8: glasses === 8,
            glass9: glasses === 9,
            glass10: glasses === 10,
            rug0: rugs === 0,
            rug1: rugs === 1,
            rug2: rugs === 2,
            rug3: rugs === 3,
            rug4: rugs === 4,
            rug5: rugs === 5,
            rug6: rugs === 6,
            rug7: rugs === 7,
            rug8: rugs === 8,
            rug9: rugs === 9,
            rug10: rugs === 10
        })));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const checkboxNapkins = document.getElementById('checkbox-napkins'),
            checkboxDecor = document.getElementById('checkbox-decor'),
            btnCount = document.getElementById('btn-count'),
            contSelects = document.getElementsByClassName('container-selects')[0];

        const {plates, wineGlasses, glasses, rugs} = this.resultData[2];

        let costPlates = plates,
            costWineGlasses = +(wineGlasses * 0.8).toFixed(1),
            costGlasses = +(glasses * 0.8).toFixed(1),
            costDecanters = 0,
            costKnives = 0,
            costSpoons = 0,
            costForks = 0,
            costRugs = +(rugs * 0.3).toFixed(1),
            costNapkins = 0,
            costDecor = 0;

        contSelects.addEventListener('change', (event) => {
            const target = event.target;

            let value = (target.tagName === 'SELECT') ? target[target.selectedIndex].getAttribute('value') : '';

            switch (target.tagName === 'SELECT') {
                case target.classList.contains('checkbox-service'):
                    break;

                case target.classList.contains('select-plates'):
                    costPlates = +value;
                    break;

                case target.classList.contains('select-vine-glasses'):
                    costWineGlasses = +value;
                    break;

                case target.classList.contains('select-glasses'):
                    costGlasses = +value;
                    break;

                case target.classList.contains('select-decanters'):
                    costDecanters = +value;
                    break;

                case target.classList.contains('select-knives'):
                    costKnives = +value;
                    break;

                case target.classList.contains('select-spoons'):
                    costSpoons = +value;
                    break;

                case target.classList.contains('select-forks'):
                    costForks = +value;
                    break;

                case target.classList.contains('select-rugs'):
                    costRugs = +value;
                    break;
            }
        });

        checkboxNapkins.addEventListener('click', () => {
            checkboxNapkins.checked ? costNapkins = 4 : costNapkins = 0;
        });

        checkboxDecor.addEventListener('click', () => {
            checkboxDecor.checked ? costDecor = 8 : costDecor = 0;
        });

        btnCount.addEventListener('click', () => this.addTotalCount(costPlates, costWineGlasses, costGlasses, costDecanters,
            costKnives, costSpoons, costForks, costRugs, costNapkins, costDecor));

    }

    addTotalCount(costPlates, costWineGlasses, costGlasses, costDecanters, costKnives, costSpoons, costForks, costRugs, costNapkins, costDecor) {
        const total = {
            cost: 'total',
            plates: costPlates,
            wineGlasses: costWineGlasses,
            glasses: costGlasses,
            decanters: costDecanters,
            knives: costKnives,
            spoons: costSpoons,
            forks: costForks,
            rugs: costRugs,
            napkins: costNapkins,
            decor: costDecor
        };

        this.model.addTotalCount(total).then(() => {
            this.redirectToTotalPrice();
        });
    }

    redirectToTotalPrice() {
        location.hash = '#/total-price';
    }
}

export default Conditions;