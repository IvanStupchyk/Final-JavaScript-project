const express = require('express'),
    router = express.Router(),
    config = require('config'),
    fs = require('file-system');

router.get('/api/constructor', (req, res) => {
    const tasksData = getTasksFromDB(),
        statusTheme = tasksData.find(item => item.type === 'checkbox-theme'),
        language = tasksData.find(item => item.type === 'british-language'),
        totalCost = tasksData.find(item => item.cost === 'total'),
        resultData = [statusTheme, language, totalCost];

    res.send(resultData);
});

router.get('/api/total-price', (req, res) => {
    const tasksData = getTasksFromDB(),
        totalCost = tasksData.find(item => item.cost === 'total'),
        language = tasksData.find(item => item.type === 'british-language'),
        resultData = [totalCost, language];

    res.send(resultData);
});

function getTasksFromDB() {
    return JSON.parse(fs.readFileSync(config.get('database.tasks'), 'utf8'));
}

module.exports = router;
