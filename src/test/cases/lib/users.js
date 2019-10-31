const users = require('../../../main/lib/users')
const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox();

describe('Lib - Users', () =>{
    describe('new', () => {
        // this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('already exists', async () => {
            // Arrange
            const User = require('../../../main/models/User')
            const input = 'user'
            sandbox.stub(User, "query").returns({
                where: sandbox.stub().returns([{
                    "id": 1,
                    "linkblue_username": "user"
                }])
            })
            
            // Act & Assert
            await expect(users.new(input)).to.be.rejectedWith(Error, 'User already exists')
        })

        it('empty username', async () => {
            //Arange
            const input = ""

            // Act & Assert
            await expect(users.new(input)).to.be.rejectedWith(Error, 'User must have username')
        })

        it('add new user', async () => {
            // Arrange
            const expected_output = [{ "id": 1,
                                    "linkblue_username": "user" }]
            const User = require('../../../main/models/User')
            const input = 'user'
            sandbox.stub(User, "query").returns({
                where: sandbox.stub().returns([]),
                insert: sandbox.stub().returns([{
                    "id": 1,
                    "linkblue_username": "user"
                }])
            })

            // Act
            const actual_output = await users.new(input)

            // Assert
            expect(actual_output).to.deep.equal(expected_output)
        })
    })

    describe('get', () => {
        // this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
        })
        it('does not exist', async () => {
            // Arrange
            const User = require('../../../main/models/User')
            const input = 'user'
            sandbox.stub(User, "query").returns({
                where: sandbox.stub().returns([])
            })
            
            // Act & Assert
            await expect(users.get(input)).to.be.rejectedWith(Error, 'User does not exists')
        })

        it('empty username', async () => {
            //Arange
            const input = ""

            // Act & Assert
            await expect(users.get(input)).to.be.rejectedWith(Error, 'User must have username')
        })

        it('get user', async () => {
            // Arrange
            const expected_output = [{ "id": 1,
                                    "linkblue_username": "user" }]
            const User = require('../../../main/models/User')
            const input = 'user'
            sandbox.stub(User, "query").returns({
                where: sandbox.stub().returns([
                    { "id": 1,
                    "linkblue_username": "user" 
                }])
            })

            // Act
            const actual_output = await users.get(input)

            // Assert
            expect(actual_output).to.deep.equal(expected_output)
        })
    })
})