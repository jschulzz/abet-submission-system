const login = require('../../../main/routes/login')
const users = require('../../../main/lib/users')
const { expect } = require('../../chai')
const sinon = require('sinon')
const request = require('supertest')
var router = require('../../../main/app')
var mustache = require('../../../main/common/mustache')

const sandbox = sinon.createSandbox();

describe('Route - login', () =>{
    describe('Correct Username', () => {
        afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('Status Code', async () => {
            // Arange
            const input = {
                'username': 'user',
                'password': '123'
            }
            const stub = sandbox.stub(users, 'get').returns(['user'])

            // Act
            const response = await request(router).post('/login/').send(input)

            // Assert
            expect(response.statusCode).to.equal(302)
        })

        it('Redirect to /course/', async () => {
            // Arange
            const input = {
                'username': 'user',
                'password': '123'
            }
            const stub = sandbox.stub(users, 'get').returns(['user'])

            // Act
            const response = await request(router).post('/login/').send(input)
            // Assert
            expect(response.header['location']).to.equal('/course/')
        })
    })
    
    describe('Incorrect Username', () => {
        afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('Status Code', async () => {
            // Arange
            const input = {
                'username': 'user',
                'password': '123'
            }
            const stub = sandbox.stub(users, 'get').throws('User already exists')

            // Act
            const response = await request(router).post('/login/').send(input)

            // Assert
            expect(response.statusCode).to.equal(302)
        })

        it('Redirect to /login/', async () => {
            // Arange
            const input = {
                'username': 'user',
                'password': '123'
            }
            const stub = sandbox.stub(users, 'get').throws('User already exists')

            // Act
            const response = await request(router).post('/login/').send(input)
            // Assert
            expect(response.header['location']).to.equal('/login/')
        })
    })
    
    describe('Empty Username', () => {
        afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('Status Code', async () => {
            // Arange
            const input = {
                'username': '',
                'password': ''
            }
            const stub = sandbox.stub(users, 'get').throws('User must have username')

            // Act
            const response = await request(router).post('/login/').send(input)

            // Assert
            expect(response.statusCode).to.equal(302)
        })

        it('Redirect to /login/', async () => {
            // Arange
            const input = {
                'username': '',
                'password': ''
            }
            const stub = sandbox.stub(users, 'get').throws('User must have username')

            // Act
            const response = await request(router).post('/login/').send(input)
            // Assert
            expect(response.header['location']).to.equal('/login/')
        })
    })
})

describe('Route - course', () =>{
    describe('Add new user', () => {
        afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('Valid User', async () => {
            // Arange
            const input = {
                'user': 'username',
                'password': '123'
            }
            sandbox.stub(users, 'new').returns([])
            sandbox.stub(mustache, 'render').returns()

            // Act
            const response = await request(router).post('/course/').send(input)

            // Assert
            expect(response.statusCode).to.equal(200)
            expect(mustache.render.calledOnceWithExactly('course/index', {added: 'Successfully Added'})).to.be.true
        })

        it('User Already Exists', async () => {
            // Arange
            const input = {
                'user': 'username',
                'password': '123'
            }
            sandbox.stub(users, 'new').throws(new Error('User already exists'))
            sandbox.stub(mustache, 'render').returns()
            const error_message = "Error: User already exists"

            // Act
            const response = await request(router).post('/course/').send(input)

            // Assert
            expect(response.statusCode).to.equal(200)
            expect(mustache.render.calledWith('course/index', {added: error_message})).to.be.true
        })

        it('Empty Username', async () => {
            // Arange
            const input = {
                'user': '',
                'password': ''
            }
            sandbox.stub(users, 'new').throws(new Error('User must have username'))
            sandbox.stub(mustache, 'render').returns()
            const error_message = "Error: User must have username"

            // Act
            const response = await request(router).post('/course/').send(input)

            // Assert
            expect(response.statusCode).to.equal(200)
            expect(mustache.render.calledWith('course/index', {added: error_message})).to.be.true
        })
    })
})