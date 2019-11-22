const login = require('../../../main/routes/login')
const users = require('../../../main/lib/users')
const { expect } = require('../../chai')
const sinon = require('sinon')
const request = require('supertest')
var router = require('../../../main/app')

const sandbox = sinon.createSandbox();

describe('Login - login', () =>{
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