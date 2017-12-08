const { courseList } = require('../../data/db')

mockData = [
    { id: 1, name: 'Toto', uuid: 'f7016dec-1061-4fa4-b5ed-cbcf358f8133', items: [{article: 'Mon item', bought: false}] },
    { id: 2, name: 'Ma liste', uuid: '6a0008dd-e52d-407f-8599-a9cf4e3ae925', items: [] }
]

module.exports = {
    up: () => {
        courseList.splice(0);
        courseList.push.apply(courseList, mockData)
    },

    down: () => {
        courseList.splice(0)
    }
};