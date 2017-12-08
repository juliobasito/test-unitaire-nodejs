const { courseList } = require('../../data/db')

mockData = [
    { id: 1, name: 'Toto', uuid: '94866a84-f7ae-45da-9d62-23c2f2e4efb9', items: [] },
    { id: 2, name: 'Ma liste', uuid: '45a6924a-5d3b-4012-adb2-04948c468c4e',  items: [] }
]

module.exports = {
    up: () => {
        courseList.splice(0);
        courseList.push.apply(courseList, mockData)
    },

    down: () => {
        courseList.splice(0)
    }
}