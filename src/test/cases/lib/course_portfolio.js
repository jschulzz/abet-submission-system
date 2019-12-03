const course_portfolio = require('../../../main/lib/course_portfolio')
const { expect } = require('../../chai')
const sinon = require('sinon')

// we use a sandbox so that we can easily restore all stubs created in that sandbox
const sandbox = sinon.createSandbox();

describe('Lib - CoursePortfolio', () => {

    describe('get', () => {

        // this is ran after each unit test
        afterEach(() => {
            // this is needed to restore the CoursePortfolio model back to it's original state
            // we don't want to break all future unit tests
            sandbox.restore()
        })

        it('with id', async () => {
            // Arrange
            const CoursePortfolio = require('../../../main/models/CoursePortfolio')

            // stub the CoursePortfolio.query() method
            sandbox.stub(CoursePortfolio, "query").returns({
                // stub the CoursePortfolio.query().eager() method
                eager: sandbox.stub().returns({
                    // stub the CoursePortfolio.query().eager().findById() method
                    findById: sinon.stub().returns({
                        "id": 1,
                        "course_id": 1,
                        "instructor_id": 1,
                        "semester_term_id": 1,
                        "num_students": 5,
                        "readonly": false,
                        "section": 1,
                        "year": 2019,
                        "course": {
                            "id": 1,
                            "department_id": 1,
                            "number": 498,
                            "department": {
                                "id": 1,
                                "identifier": "cs",
                                "name": "Computer Science"
                            }
                        },
                        "instructor": {
                            "id": 1,
                            "linkblue_username": "user"
                        },
                        "semester": {
                            "id": 1,
                            "type": 1,
                            "value": "fall"
                        },
                        "outcomes": [
                            {
                                "id": 1,
                                "portfolio_id": 1,
                                "slo_id": 1,
                                "slo": {
                                    "id": 1,
                                    "department_id": 1,
                                    "index": 2,
                                    "description": "Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.",
                                    "metrics": [
                                        {
                                            "id": 1,
                                            "slo_id": 1,
                                            "index": 1,
                                            "name": "Identify and interpret client needs and design constraints",
                                            "exceeds": "n/a",
                                            "meets": "n/a",
                                            "partially": "n/a",
                                            "not": "n/a"
                                        }
                                    ]
                                },
                                "artifacts": [
                                    {
                                        "id": 1,
                                        "portfolio_slo_id": 1,
                                        "index": 1,
                                        "name": "_unset_",
                                        "evaluations": [
                                            {
                                                "id": 1,
                                                "artifact_id": 1,
                                                "evaluation_index": 1,
                                                "student_index": 1,
                                                "evaluation": [],
                                                "file": null
                                            }
                                        ]
                                    },
                                    {
                                        "id": 2,
                                        "portfolio_slo_id": 1,
                                        "index": 2,
                                        "name": "_unset_",
                                        "evaluations": [
                                            {
                                                "id": 6,
                                                "artifact_id": 2,
                                                "evaluation_index": 1,
                                                "student_index": 1,
                                                "evaluation": [],
                                                "file": null
                                            }
                                        ]
                                    },
                                    {
                                        "id": 3,
                                        "portfolio_slo_id": 1,
                                        "index": 3,
                                        "name": "_unset_",
                                        "evaluations": [
                                            {
                                                "id": 11,
                                                "artifact_id": 3,
                                                "evaluation_index": 1,
                                                "student_index": 1,
                                                "evaluation": [],
                                                "file": null
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    })
                })
            })

            // Act
            const portfolio = await course_portfolio.get(1)

            // Assert
            expect(portfolio).to.deep.equal({
                "portfolio_id": 1,
                "course_id": 1,
                "instructor": {
                    "id": 1,
                    "linkblue_username": "user"
                },
                "num_students": 5,
                "outcomes": [
                    {
                        "artifacts": [
                            {
                                "id": 1,
                                "portfolio_slo_id": 1,
                                "index": 1,
                                "name": "_unset_",
                                "evaluations": [
                                    {
                                        "id": 1,
                                        "artifact_id": 1,
                                        "evaluation_index": 1,
                                        "student_index": 1,
                                        "evaluation": [],
                                        "file": null
                                    }
                                ]
                            },
                            {
                                "id": 2,
                                "portfolio_slo_id": 1,
                                "index": 2,
                                "name": "_unset_",
                                "evaluations": [
                                    {
                                        "id": 6,
                                        "artifact_id": 2,
                                        "evaluation_index": 1,
                                        "student_index": 1,
                                        "evaluation": [],
                                        "file": null
                                    }
                                ]
                            },
                            {
                                "id": 3,
                                "portfolio_slo_id": 1,
                                "index": 3,
                                "name": "_unset_",
                                "evaluations": [
                                    {
                                        "id": 11,
                                        "artifact_id": 3,
                                        "evaluation_index": 1,
                                        "student_index": 1,
                                        "evaluation": [],
                                        "file": null
                                    }
                                ]
                            }
                        ],
                        "id": 1,
                        "department_id": 1,
                        "index": 2,
                        "description": "Design, implement, and evaluate a computing-based solution to meet a given set of computing requirements in the context of the program's discipline.",
                        "metrics": [
                            {
                                "id": 1,
                                "slo_id": 1,
                                "index": 1,
                                "name": "Identify and interpret client needs and design constraints",
                                "exceeds": "n/a",
                                "meets": "n/a",
                                "partially": "n/a",
                                "not": "n/a"
                            }
                        ]
                    }
                ],
                "course": {
                    "department": "cs",
                    "number": 498,
                    "section": 1,
                    "semester": "fall",
                    "year": 2019
                }
            })
        })

    })

    describe('new', () => {
        // this is ran after each unit test
        afterEach(() => {
            // this is needed to restore the CoursePortfolio model back to it's original state
            // we don't want to break all future unit tests
            sandbox.restore()
        })

        it('should error on non-existent course', async () => {

            const Course = require('../../../main/models/Course')

            const fake_course = {
                department_id: 40, // this isn't a real dept
                course_number: 5000, // this isn't a real course number
                instructor: 1, // these other values shouldn't matter
                semester: 1,
                year: "2019",
                num_students: 30,
                student_learning_outcomes: ["1"],
                section: 1
            }

            // This is our search query for courses
            sandbox.stub(Course, "query").returns({
                where: sandbox.stub().returns({
                    where: sinon.stub().returns([])
                })
            })

            await expect(course_portfolio.new(fake_course)).to.be.rejectedWith("No existing course for Dept 40, Course No. 5000");
        })

        it('should insert for existing courses', async () => {

            const Portfolio = require('../../../main/models/CoursePortfolio')

            const real_course = {
                department_id: 1, // this is a real dept
                course_number: 498, // this is a real course number
                instructor: 1,
                semester: 1,
                year: "2019",
                num_students: 30,
                student_learning_outcomes: ["1"],
                section: 100
            }
            sandbox.stub(Portfolio, "query").returns({
                where: sandbox.stub().returns({
                    where: sinon.stub().returns([])
                }),
                insert: sandbox.stub().returns([real_course])
            })

            const actual_output = await course_portfolio.new(real_course);

            await expect(actual_output).to.deep.equal([real_course]);
        })
	})
	
	describe('Get Random Students', () =>{
		
		// this is ran after each unit test
		afterEach(() => {
			// this is needed to restore the CoursePortfolio model back to it's original state
			// we don't want to break all future unit tests
			sandbox.restore()
			sinon.restore()
		})
		
		it('No Students', async () =>{
			// Arange
			const input = []

			// Act & Assert
			await expect(course_portfolio.getRandomStudents(input)).to.be.rejectedWith(Error, 'The must be students.')
		})

		it('1 Student', async () =>{
			// Arange
			const input = [1]
			const expected_output = [1]

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('9 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9]
			const expected_output = [1, 2, 3, 4, 5, 6, 7, 8, 9]

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('10 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
			const expected_output = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('11 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			const expected_output = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
			const stub = sinon.stub(Math, "random")
			stub.onCall(0).returns(0)
			stub.onCall(1).returns(0.1)
			stub.onCall(2).returns(0.2)
			stub.onCall(3).returns(0.3)
			stub.onCall(4).returns(0.5)
			stub.onCall(5).returns(0.6)
			stub.onCall(6).returns(0.7)
			stub.onCall(7).returns(0.8)
			stub.onCall(8).returns(0.9)
			stub.onCall(9).returns(0.99)

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('49 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
						11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
						21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
						31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						41, 42, 43, 44, 45, 46, 47, 48, 49]
			const expected_output = [1, 2, 11, 12, 21, 22, 31, 32, 41, 42]
			const stub = sinon.stub(Math, "random")
			stub.onCall(0).returns(0)
			stub.onCall(1).returns(0.03)
			stub.onCall(2).returns(0.21)
			stub.onCall(3).returns(0.23)
			stub.onCall(4).returns(0.41)
			stub.onCall(5).returns(0.43)
			stub.onCall(6).returns(0.62)
			stub.onCall(7).returns(0.64)
			stub.onCall(8).returns(0.82)
			stub.onCall(9).returns(0.84)

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('54 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
						11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
						21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
						31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
						51, 52, 53, 54]
			const expected_output = [1, 2, 12, 13, 23, 24, 34, 35, 45, 46]
			const stub = sinon.stub(Math, "random")
			stub.onCall(0).returns(0)
			stub.onCall(1).returns(0.03)
			stub.onCall(2).returns(0.21)
			stub.onCall(3).returns(0.23)
			stub.onCall(4).returns(0.41)
			stub.onCall(5).returns(0.43)
			stub.onCall(6).returns(0.62)
			stub.onCall(7).returns(0.64)
			stub.onCall(8).returns(0.82)
			stub.onCall(9).returns(0.84)

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('55 Students', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
						11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
						21, 22, 23, 24, 25, 26, 27, 28, 29, 30,
						31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
						41, 42, 43, 44, 45, 46, 47, 48, 49, 50,
						51, 52, 53, 54, 55 ]
			const expected_output = [1, 2, 12, 13, 23, 24, 35, 36, 46, 47, 55]
			const stub = sinon.stub(Math, "random")
			stub.onCall(0).returns(0)
			stub.onCall(1).returns(0.03)
			stub.onCall(2).returns(0.21)
			stub.onCall(3).returns(0.23)
			stub.onCall(4).returns(0.41)
			stub.onCall(5).returns(0.43)
			stub.onCall(6).returns(0.62)
			stub.onCall(7).returns(0.64)
			stub.onCall(8).returns(0.82)
			stub.onCall(9).returns(0.84)
			stub.onCall(10).returns(0.99)

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})

		it('Repeat Indeces', async () =>{
			// Arange
			const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
			const expected_output = [1, 2, 3, 4, 6, 7, 8, 9, 10, 11]
			const stub = sinon.stub(Math, "random")
			stub.onCall(0).returns(0)
			stub.onCall(1).returns(0.1)
			stub.onCall(2).returns(0.1)
			stub.onCall(3).returns(0.2)
			stub.onCall(4).returns(0.3)
			stub.onCall(5).returns(0.5)
			stub.onCall(6).returns(0.6)
			stub.onCall(7).returns(0.7)
			stub.onCall(8).returns(0.8)
			stub.onCall(9).returns(0.9)
			stub.onCall(10).returns(0.99)

			// Act 
			const actual_output = await course_portfolio.getRandomStudents(input)

			// Assert
			expect(actual_output).to.deep.equal(expected_output)
		})
	})

})