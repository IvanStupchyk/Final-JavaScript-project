import '../src/styles/app';

import {parseRequestURL} from './helpers/utils';

import Header from './views/partials/header';

import Language from './views/pages/language';
import Error404 from './views/pages/error404';

import Constructor from './views/pages/constructor';
import Conditions from './views/pages/conditions';
import Total from './views/pages/total';

const Routes = {
    '/': Language,
    '/constructor': Constructor,
    '/conditions': Conditions,
    '/total-price': Total
};

function router() {
    const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('content-container')[0],
        header = new Header();

    header.getData().then(data => {
        header.render(data).then(html => {
            headerContainer.innerHTML = html;
            header.afterRender();
        });
    });

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();

    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });
}

module.hot ? module.hot.accept(router()) : window.addEventListener('load', router);
window.addEventListener('hashchange', router);