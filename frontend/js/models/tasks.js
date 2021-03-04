class Tasks {

    getTheme() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/constructor');

            xhr.onload = () => resolve(JSON.parse(xhr.response));

            xhr.send();
        });
    }

    addBlackTheme(newStatus) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/constructor');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(newStatus));
        });
    }

    addBelarusianLanguage(languageSPA) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/constructor');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(languageSPA));
        });
    }

    addDishes(item) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/dishes');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(item));
        });
    }

    addTotalCount(total) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/conditions');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(total));
        });
    }

    getTotalCount() {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('GET', 'http://localhost:3000/api/total-price');

            xhr.onload = () => {
                const statusType = +String(xhr.status)[0];

                if (statusType === 2) {
                    try {
                        resolve(JSON.parse(xhr.response));
                    } catch (error) {
                        throw new Error('Unable to parse the passed object');
                    }
                }
            };

            xhr.send();
        });
    }

    addPromoCode(statusPromoCode) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/total-price');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(statusPromoCode));
        });
    }

    clearPromoCode(statusPromoCodeFalse) {
        return new Promise(resolve => {
            const xhr = new XMLHttpRequest();

            xhr.open('PUT', 'http://localhost:3000/api/total-price');
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onload = () => resolve();

            xhr.send(JSON.stringify(statusPromoCodeFalse));
        });
    }
}

export default Tasks;