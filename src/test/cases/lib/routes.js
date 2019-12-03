const course_router = require('../../../main/routes/course')
const { expect } = require('../../chai')
const sinon = require('sinon')

const app = require("../../../main/app")

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox();

describe('Lib - Portfolio Selection Screen', () => {

    afterEach(async () => {
        const portfolios = await course_router.getPortfolios()
        portfolios.forEach(async (p) => {
            await course_router.setReadOnly(p.id, false)
        })
    })

    // this function retrives portfolios
    it("should retrive and aggregate portfolios from database", async () => {
        //arrange
        // these expected values are what will be in the test database
        const expected_values = [{
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2019,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 3,
            type: 1,
            value: 'fall',
            course_name: 'CS498 - Section 1',
            term_name: 'FALL'
        },
        {
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2019,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 2,
            type: 1,
            value: 'fall',
            course_name: 'CS498 - Section 1',
            term_name: 'FALL'
        },
        {
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2019,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 1,
            type: 1,
            value: 'fall',
            course_name: 'CS498 - Section 1',
            term_name: 'FALL'
        }]


        //act
        const actual_portfolios = await course_router.getPortfolios()
        //assert
        expect(actual_portfolios).to.deep.equal(expected_values)
    })

    // this function organizes portfolios
    it('should organize portfolios', () => {
        //arrange
        const input_values = [{
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2018,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 3,
            type: 1,
            value: 'fall',
            course_name: 'CS498 - Section 1',
            term_name: 'FALL'
        }, {
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2019,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 3,
            type: 1,
            value: 'spring',
            course_name: 'CS498 - Section 1',
            term_name: 'SPRING'
        }, {
            id: 1,
            department_id: 1,
            readonly: false,
            number: 498,
            identifier: 'cs',
            name: '_unset_',
            course_id: 1,
            instructor_id: 1,
            semester_term_id: 1,
            num_students: 5,
            section: 1,
            year: 2019,
            portfolio_id: 1,
            slo_id: 1,
            portfolio_slo_id: 1,
            index: 2,
            type: 1,
            value: 'fall',
            course_name: 'CS498 - Section 1',
            term_name: 'FALL'
        }]

        const expected_values = {
            old_portfolios: [{
                id: 1,
                department_id: 1,
                readonly: false,
                number: 498,
                identifier: 'cs',
                name: '_unset_',
                course_id: 1,
                instructor_id: 1,
                semester_term_id: 1,
                num_students: 5,
                section: 1,
                year: 2018,
                portfolio_id: 1,
                slo_id: 1,
                portfolio_slo_id: 1,
                index: 3,
                type: 1,
                value: 'fall',
                course_name: 'CS498 - Section 1',
                term_name: 'FALL'
            }, {
                id: 1,
                department_id: 1,
                readonly: false,
                number: 498,
                identifier: 'cs',
                name: '_unset_',
                course_id: 1,
                instructor_id: 1,
                semester_term_id: 1,
                num_students: 5,
                section: 1,
                year: 2019,
                portfolio_id: 1,
                slo_id: 1,
                portfolio_slo_id: 1,
                index: 3,
                type: 1,
                value: 'spring',
                course_name: 'CS498 - Section 1',
                term_name: 'SPRING'
            }], current_portfolios: [
                {
                    id: 1,
                    department_id: 1,
                    readonly: false,
                    number: 498,
                    identifier: 'cs',
                    name: '_unset_',
                    course_id: 1,
                    instructor_id: 1,
                    semester_term_id: 1,
                    num_students: 5,
                    section: 1,
                    year: 2019,
                    portfolio_id: 1,
                    slo_id: 1,
                    portfolio_slo_id: 1,
                    index: 2,
                    type: 1,
                    value: 'fall',
                    course_name: 'CS498 - Section 1',
                    term_name: 'FALL'
                }]
        }

        //act
        const actual_portfolios = course_router.sortPortfolios(input_values)
        //assert
        expect(actual_portfolios).to.deep.equal(expected_values)
    })

    it('should set the readonly value of the given portfolio id', async () => {
        //arrange
        //get portfolio
        const portfolio = (await course_router.getPortfolios())[0]

        //act
        await course_router.setReadOnly(portfolio.id, true);

        //arrange
        const new_portfolio = (await course_router.getPortfolios())[0]
        expect(new_portfolio.readonly).to.equal(true)

    })
})