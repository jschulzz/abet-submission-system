const Portfolio = require('../models/CoursePortfolio')
const Course = require('../models/Course')


module.exports.new = async ({
    department_id,
    course_number,
    instructor,
    semester,
    year,
    num_students,
    student_learning_outcomes,
    section
}) => {

    //Make sure this portfolio matches to a real course
    const matching_courses = await Course.query().where('number', course_number).where('department_id', department_id) ;

    if (matching_courses.length === 0) {
        throw new Error(`No existing course for Dept ${department_id}, Course No. ${course_number}`);
    } else {
        const portfolio = {
            course_id: parseInt(matching_courses[0].id),
            instructor_id: parseInt(instructor),
            num_students: parseInt(num_students),
            section: parseInt(section),
            semester_term_id: parseInt(semester),
            year: parseInt(year)
        };
        return await Portfolio.query().debug('enabled').insert(portfolio);
    }
}


module.exports.get = async (portfolio_id) => {
    let raw_portfolio = await Portfolio.query()
        .eager({
            course: {
                department: true
            },
            instructor: true,
            semester: true,
            outcomes: {
                slo: {
                    metrics: true
                },
                artifacts: {
                    evaluations: true
                }
            }
        })
        .findById(portfolio_id)

    let portfolio = {
        portfolio_id: raw_portfolio.id,
        course_id: raw_portfolio.course_id,
        instructor: raw_portfolio.instructor,
        num_students: raw_portfolio.num_students,
        outcomes: [],
        course: {
            department: raw_portfolio.course.department.identifier,
            number: raw_portfolio.course.number,
            section: raw_portfolio.section,
            semester: raw_portfolio.semester.value,
            year: raw_portfolio.year
        },
    }

    for (let i in raw_portfolio.outcomes) {
        portfolio.outcomes.push(Object.assign({
            artifacts: raw_portfolio.outcomes[i].artifacts
        }, raw_portfolio.outcomes[i].slo))
    }

    return portfolio
}