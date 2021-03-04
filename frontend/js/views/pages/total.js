import Component from '../../views/component';

import Tasks from '../../models/tasks';

import Error404Template from '../../../templates/pages/error404';

import TotalTemplate from '../../../templates/pages/total';

import TotalTemplateBlr from '../../../templates/pages/total-blr';


class Total extends Component {
    constructor() {
        super();

        this.model = new Tasks();
    }

    getData() {
        return new Promise(resolve => this.model.getTotalCount().then(resultData => {
            resolve(resultData);
        }));
    }

    render(resultData) {
        const {plates, wineGlasses, glasses, decanters, knives, spoons, forks, rugs, napkins, decor, promocode} = resultData[0],
              forPay = plates + wineGlasses + glasses + decanters + knives + spoons + forks + rugs + napkins + decor;

        let template;

        resultData[1].status ? template = TotalTemplate : template = TotalTemplateBlr;

         return new Promise(resolve => resolve(Object.keys(resultData).length ? template({
             isTotalPlates: (plates / 1).toFixed(),
             isTotalWineGlasses: (wineGlasses / 0.8).toFixed(),
             isTotalGlasses: (glasses / 0.8).toFixed(),
             isTotalDecanters: (decanters / 2).toFixed(),
             isTotalKnives: (knives / 0.5).toFixed(),
             isTotalSpoons: (spoons / 0.5).toFixed(),
             isTotalForks: (forks / 0.5).toFixed(),
             isTotalRugs: (rugs / 0.3).toFixed(),
             isTotalCostPlates: plates,
             isTotalCostWineGlasses: wineGlasses,
             isTotalCostGlasses: glasses,
             isTotalCostDecanters: decanters,
             isTotalCostKnives: knives,
             isTotalCostSpoons: spoons,
             isTotalCostForks: forks,
             isTotalCostRugs: rugs,
             isNapkins: napkins,
             isDecor: decor,
             isPromoCode: promocode,
             isTotalPay: forPay.toFixed(1),
             isTotalPayPromo: (forPay / 2).toFixed(1)
         }) : Error404Template()));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const inputPromoCode = document.getElementById('promo-сode'),
            finalCost = document.getElementsByClassName('final-cost')[0],
            btnPromoCode = document.getElementsByClassName('btn-promo-code ')[0],
            btnClear = document.getElementsByClassName('btn-clear')[0];

        btnPromoCode.addEventListener('click', () => this.addPromoCode(inputPromoCode, finalCost, btnPromoCode, btnClear));
        btnClear.addEventListener('click', () => this.clearPromoCode(inputPromoCode, finalCost, btnPromoCode, btnClear));
    }

    addPromoCode(inputPromoCode, finalCost, btnPromoCode, btnClear) {
        if (inputPromoCode.value.trim() === '2020') {
            const statusPromoCode = {
                cost: 'total',
                promocode: true
            };

            this.model.addPromoCode(statusPromoCode).then(() => {
                finalCost.innerHTML = (+finalCost.textContent / 2).toFixed(1);
                finalCost.parentElement.classList.add('active');

                inputPromoCode.value = '';
                inputPromoCode.setAttribute('disabled', 'disabled');
                inputPromoCode.classList.add('input-disabled');
                inputPromoCode.setAttribute('placeholder', '');

                btnClear.removeAttribute('disabled', 'disabled');
                btnClear.classList.remove('btn-clear-disabled');

                btnPromoCode.classList.add('btn-promo-active');
                btnPromoCode.setAttribute('disabled', 'disabled');
            });
        }
    }

    clearPromoCode(inputPromoCode, finalCost, btnPromoCode, btnClear) {
        const statusPromoCodeFalse = {
            cost: 'total',
            promocode: false
        };

        this.model.clearPromoCode(statusPromoCodeFalse).then(() => {
            finalCost.innerHTML = (+finalCost.textContent * 2).toFixed(1);
            finalCost.parentElement.classList.remove('active');

            btnClear.classList.add('btn-clear-disabled');
            btnClear.setAttribute('disabled', 'disabled');

            inputPromoCode.removeAttribute('disabled', 'disabled');
            inputPromoCode.classList.remove('input-disabled');
            inputPromoCode.setAttribute('placeholder', 'Type here');

            btnPromoCode.classList.remove('btn-promo-active');
            btnPromoCode.removeAttribute('disabled', 'disabled');
        });
    }
}

export default Total;