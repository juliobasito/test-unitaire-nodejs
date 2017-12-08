const request = require('supertest')
const chai = require('chai')
const expect = chai.expect
chai.should()


const { find } = require('lodash');

const db = require('../../data/db');
const app = require('../../app');

const courseListFixture = require('../fixtures/courseList');

describe('CourselistController', () => {
    beforeEach(() => {
        courseListFixture.up()
    });
    afterEach(() => {
        courseListFixture.down()
    });

    describe('When I create a courseList (POST /course-lists)', () => {
        it('should reject with a 400 when no name is given', () => {
            return request(app).post('/course-lists').then((res) => {
                res.status.should.equal(400);
                res.body.should.eql({
                    error: {
                        code: 'VALIDATION',
                        message: 'Missing name'
                    }
                })
            })
        })

        it('should reject when name is not unique', () => {
            return request(app)
                .post('/course-lists')
                .send({name: 'Toto'})
                .then((res) => {
                    res.status.should.equal(400)
                    res.body.should.eql({
                        error: {
                            code: 'VALIDATION',
                            message: 'Name should be unique'
                        }
                    })
                })
        })

        it('should  succesfuly create a courseList', () => {
            const mockName = 'My New List'

            return request(app)
                .post('/course-lists')
                .send({name: mockName})
                .then((res) => {
                    res.status.should.equal(200)
                    expect(res.body.data).to.be.an('object')
                    res.body.data.name.should.equal(mockName)

                    const result = find(db.courseList, {name: mockName})
                    result.should.not.be.empty
                    result.id.should.eql(res.body.data.id);
                    result.name.should.eql(res.body.data.name);
                    result.items.should.eql([]);
                })
        })
    });

    describe('When I delete a courseList (DELETE /course-lists)', () => {
        it('should reject with a 400 when id was not found', () => {
            const idNumber = 3;
            return request(app).delete('/course-lists/' + idNumber).then((res) => {
                res.status.should.equal(400);
                res.body.should.eql({
                    error: {
                        code: 'DELETION',
                        message: 'The id was not founded'
                    }
                })
            })
        });
        it('should  succesfuly delete a courseList', () => {

            const idNumber = 1;

            return request(app)
                .delete('/course-lists/' + idNumber)
                .then((res) => {
                    res.status.should.equal(200);
                    res.body.should.eql({
                        list: idNumber,
                        message: "The following list was deleted"

                    });
                })
        })
    })

    describe('When I print all the coursesList (GET /course-lists)', () => {
        it('should  succesfully print all the courseLists', () => {
            return request(app)
                .get('/course-lists')
                .then((res) => {
                    res.status.should.equal(200);
                    res.body.data[0].id.should.eql(1);
                    res.body.data[1].id.should.eql(2);
                    res.body.data[0].name.should.eql('Toto')
                    res.body.data[1].name.should.eql('Ma liste')
                    res.body.data[0].uuid.should.not.be.empty
                    res.body.data[1].uuid.should.not.be.empty
                })
        })
    })
})
