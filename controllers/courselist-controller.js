const express = require('express')
const router = express.Router()
const BadRequestError = require('../errors/bad-request')
const { find } = require('lodash')

const db = require('../data/db')
const courseListCollection = db.courseList
const uuidGenerator = require('./uuid-controller')

router.post('/', (req, res, next) => {
    if (!req.body.name) {
        return next(new BadRequestError('VALIDATION', 'Missing name'))
    }

    const name = req.body.name

    // Check for name uniqueness
    const result = find(courseListCollection, { name })
    if (result) {
        return next(new BadRequestError('VALIDATION', 'Name should be unique'))
    }

    const newCourseList = {
        id: courseListCollection.length + 1,
        name,
        uuid: uuidGenerator.createUuid(),
        items: []
    };

    courseListCollection.push(newCourseList)

    res.json({
        data: newCourseList
    })
});

router.get('/', (req, res, next) => {
    res.json({
        data: courseListCollection
    })
});

router.delete('/:id', (req, res, next) => {
    const id = parseInt(req.params.id);

    let isInCollection = false;

    courseListCollection.forEach(function(item, index, object) {
        if (item.id === id) {
            isInCollection = true;
            object.splice(index, 1);
        }
    });

    if (!isInCollection) {
        return next(new BadRequestError('DELETION', 'The id was not founded'))
    }

    res.json({
        message: 'The following list was deleted',
        list: id
    })

});

module.exports = router;