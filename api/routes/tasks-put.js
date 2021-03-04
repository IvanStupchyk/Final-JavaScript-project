const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.put('/api/conditions', (req, res) => {
    const tasksData = getTasksFromDB(),
        changeTotalCount = req.body,
        totalCount = tasksData.find(item => item.cost === changeTotalCount.cost);

    totalCount.plates = changeTotalCount.plates;
    totalCount.wineGlasses = changeTotalCount.wineGlasses;
    totalCount.glasses = changeTotalCount.glasses;
    totalCount.decanters = changeTotalCount.decanters;
    totalCount.knives = changeTotalCount.knives;
    totalCount.spoons = changeTotalCount.spoons;
    totalCount.forks = changeTotalCount.forks;
    totalCount.rugs = changeTotalCount.rugs;
    totalCount.napkins = changeTotalCount.napkins;
    totalCount.decor = changeTotalCount.decor;

    setTasksToDB(tasksData);

    res.sendStatus(204);
});

router.put('/api/constructor', (req, res) => {
    const tasksData = getTasksFromDB(),
        checkbox = req.body,
        task = tasksData.find(item => item.type === checkbox.type);

    task.status = checkbox.status;

    setTasksToDB(tasksData);

    res.sendStatus(204);
});

router.put('/api/constructor', (req, res) => {
    const tasksData = getTasksFromDB(),
        btnBelLanguage = req.body,
        task = tasksData.find(item => item.type === btnBelLanguage.type);

    task.status = btnBelLanguage.status;

    setTasksToDB(tasksData);

    res.sendStatus(204);
});


router.put('/api/total-price', (req, res) => {
    const tasksData = getTasksFromDB(),
        statusPromoCode = req.body,
        totalCount = tasksData.find(item => item.cost === statusPromoCode.cost);

    totalCount.promocode = statusPromoCode.promocode;

    setTasksToDB(tasksData);

    res.sendStatus(204);
});

router.put('/api/dishes', (req, res) => {
    const tasksData = getTasksFromDB(),
        dishes = req.body,
        task = tasksData.find(item => item.cost === dishes.cost);

    task.plates = dishes.plate;
    task.rugs = dishes.rug;
    task.wineGlasses = dishes.wineGlass;
    task.glasses = dishes.glass;

    setTasksToDB(tasksData);

    res.sendStatus(204);
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.tasks'), 'utf8'));
}

function setTasksToDB(tasksData) {
    fs.writeFileSync(config.get('database.tasks'), JSON.stringify(tasksData));
}

module.exports = router;