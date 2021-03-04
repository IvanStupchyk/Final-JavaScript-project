import Component from '../../views/component';

import Tasks from '../../models/tasks';

import ConstructorTemplate from '../../../templates/pages/constructor';

import ConstructorTemplateBlr from '../../../templates/pages/constructor-blr';

class Constructor extends Component {
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

        resultData[1].status ? template = ConstructorTemplate : template = ConstructorTemplateBlr;
        return new Promise(resolve => resolve(template({})));
    }

    afterRender() {
        this.setActions();
    }

    setActions() {
        const acc = document.getElementsByClassName('accordion'),
            accContainer = document.getElementsByClassName('accordion-product')[0],
            btnAddDishes = document.getElementsByClassName('add-dishes')[0];

        for (let i = 0; i < acc.length; i++) {
            acc[i].addEventListener('click', () => {
                let panel = acc[i].nextElementSibling;

                if (acc[i].classList.contains('active-tab')) {
                    acc[i].classList.remove('active-tab');

                    panel.classList.remove('height-content-panel');
                } else {
                    for (let i = 0; i < accContainer.children.length; i++) {
                        if (accContainer.children[i].classList.contains('active-tab')) {
                            let panel = accContainer.children[i].nextElementSibling;
                            panel.classList.remove('height-content-panel');

                            accContainer.children[i].classList.remove('active-tab');
                        }
                    }

                    acc[i].classList.add('active-tab');
                    panel.classList.add('height-content-panel');
                }
            });
        }

        let plates = 0,
            rugs = 0,
            wineGlasses = 0,
            glasses = 0;

        btnAddDishes.addEventListener('click', () => this.addDishes(plates, rugs, wineGlasses, glasses));

        accContainer.addEventListener('dragstart', () => {
            const target = event.target;

            function movingElements() {
                moveAt(event.pageX, event.pageY);

                function moveAt(pageX, pageY) {
                    target.style.left = `${pageX - target.offsetWidth / 2}px`;
                    target.style.top = `${pageY - target.offsetHeight / 2}px`;
                }

                function onMouseMove(event) {
                    moveAt(event.pageX, event.pageY);
                }

                document.addEventListener('mousemove', onMouseMove);

                target.addEventListener('mouseup', () => {
                    document.removeEventListener('mousemove', onMouseMove);
                    target.onmouseup = null;
                });

                target.addEventListener('dragstart', () => {
                    return false;
                });
            }

            function positionElements() {
                const clonedBlock = target.cloneNode(),
                    wraperImg = target.parentElement;

                wraperImg.appendChild(clonedBlock);
                target.classList.add('clone-position');

                switch (target.tagName === 'IMG') {
                    case target.classList.contains('amount-plates') :
                        plates < 10 ? plates++ : plates;
                        break;

                    case target.classList.contains('amount-rugs') :
                        rugs < 10 ? rugs++ : rugs;
                        break;

                    case target.classList.contains('amount-wine-glasses') :
                        wineGlasses < 10 ? wineGlasses++ : wineGlasses;
                        break;

                    case target.classList.contains('amount-glasses') :
                        glasses < 10 ? glasses++ : glasses;
                        break;
                }
            }

            switch (target.tagName === 'IMG') {
                case target.classList.contains('clone-position') :
                    movingElements();
                    break;

                case target.dataset.position === 'rugs' && !target.classList.contains('clone-position') :
                    positionElements();
                    target.classList.add('clone-index-rug');

                    movingElements();
                    break;

                case !target.classList.contains('clone-position') :
                    positionElements();
                    target.classList.add('clone-index');

                    movingElements();
                    break;
            }
        });
    }

    addDishes(plates, rugs, wineGlasses, glasses) {
        const item = {
            cost: 'total',
            plate: plates,
            rug: rugs,
            wineGlass: wineGlasses,
            glass: glasses
        };

        this.model.addDishes(item).then(() => {
            this.redirectToTotalPrice();
        });
    }

    redirectToTotalPrice() {
        location.hash = '#/conditions';
    }
}


export default Constructor;


