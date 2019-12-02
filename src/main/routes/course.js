var express = require('express');
var mustache = require('../common/mustache')
var html = require('../common/html')
var course_portfolio_lib = require('../lib/course_portfolio')
var router = express.Router();

const Department = require('../models/Department')
const TermType = require('../models/TermType')
const Portfolio = require('../models/CoursePortfolio')
const Course = require('../models/Course')

const course_manage_page = async (res, course_id) => {
    let course_info = {
        student_learning_outcomes: [
            {
                index: 1,
                description: 'n/a',
                metrics: [
                    {
                        name: 'n/a',
                        exceeds: 'n/a',
                        meets: 'n/a',
                        partially: 'n/a',
                        not: 'n/a'
                    },
                    {
                        name: 'n/a',
                        exceeds: 'n/a',
                        meets: 'n/a',
                        partially: 'n/a',
                        not: 'n/a'
                    },
                    {
                        name: 'n/a',
                        exceeds: 'n/a',
                        meets: 'n/a',
                        partially: 'n/a',
                        not: 'n/a'
                    },
                    {
                        name: 'n/a',
                        exceeds: 'n/a',
                        meets: 'n/a',
                        partially: 'n/a',
                        not: 'n/a'
                    },
                ],
                artifacts: [
                    {
                        name: 'n/a',
                        evaluations: [
                            {
                                index: 1,
                                evaluation: [
                                    {
                                        metric: 1,
                                        value: 6
                                    },
                                    {
                                        metric: 2,
                                        value: 6
                                    },
                                    {
                                        metric: 3,
                                        value: 6
                                    },
                                    {
                                        metric: 4,
                                        value: 6
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    };

    res.render('base_template', {
        title: 'CS498 Course Portfolio',
        body: mustache.render('course/manage', course_info)
    })
}


const setReadOnly = async (portfolio_id, readonly) => {
    await Portfolio.query()
        .where({ "id": portfolio_id })
        .patch({ "readonly": readonly })
}

const sortPortfolios = (portfolios) => {
    // very statically sorts the portfolios
    const date = new Date();
    const current_year = date.getFullYear();
    const current_month = date.getMonth();

    // very rudimentary semester divisions, only by month
    let semester;
    if (current_month < 5) {
        semester = "SPRING";
    } else if (current_month < 6) {
        semester = "SUMMER 1"
    } else if (current_month < 7) {
        semester = "SUMMER 1"
    } else if (current_month < 6) {
        semester = "SUMMER 2"
    } else {
        semester = "FALL"
    }
    const current_portfolios = portfolios.filter(p => p.year == current_year && p.term_name === semester);
    const old_portfolios = portfolios.filter(p => p.year != 2019 || p.term_name !== semester);
    return { current_portfolios: current_portfolios, old_portfolios: old_portfolios };
}
//this function retrives all the relevent entries and sorts them
const getPortfolios = async () => {

    //join all relevant data
    const portfolios = await Course.query().select('*')
        .join('department', 'department.id', 'course.department_id')
        .join('portfolio', 'portfolio.course_id', 'course.id')
        .join("portfolio_slo", "portfolio.id", "portfolio_slo.portfolio_id")
        .join("artifact", "portfolio_slo.id", "artifact.portfolio_slo_id")
        .join('term', "portfolio.semester_term_id", "term.id")

    // clean that data for easier display 
    portfolios.forEach((portfolio) => {
        portfolio.course_name = String(portfolio.identifier).toUpperCase() + String(portfolio.number) + " - Section " + portfolio.section;
        portfolio.term_name = String(portfolio.value).toUpperCase();
    })

    return portfolios;
}


const course_new_page = async (res, department = false) => {
    const departments = await Department.query().select()
    const semesters = await (await TermType.query()
        .findById('semester'))
        .$relatedQuery('terms')
    let student_learning_outcomes = false

    if (department) {
        student_learning_outcomes = await (await Department.query().findById(department))
            .$relatedQuery('student_learning_outcomes')
    }

    res.render('base_template', {
        title: 'New Course Portfolio',
        body: mustache.render('course/new', {
            departments,
            department,
            student_learning_outcomes,
            semesters
        })
    })
}

/* GET course home page */
router.route('/')
    .get(html.auth_wrapper(async (req, res, next) => {
        const portfolios = await getPortfolios();
        const { current_portfolios, old_portfolios } = sortPortfolios(portfolios);

        res.render('base_template', {
            title: 'Course Portfolios',
            body: mustache.render('course/index', {
                current_portfolios,
                old_portfolios
            })
        })
    }))

/* GET course page */
router.route('/:id')
    .get(html.auth_wrapper(async (req, res, next) => {
        if (req.params.id === 'new') {
            await course_new_page(res)
        } else {
            await course_manage_page(res, req.params.id)
        }
    }))
    .post(html.auth_wrapper(async (req, res, next) => {
        if (req.params.id === 'new') {
            if (req.body.course_submit) {
                const course_portfolio = await course_portfolio_lib.new({
                    department_id: req.body.department,
                    course_number: req.body.course_number,
                    instructor: 1,
                    semester: req.body.semester,
                    year: req.body.course_year,
                    num_students: req.body.num_students,
                    student_learning_outcomes: Object.entries(req.body)
                        .filter(entry => entry[0].startsWith('slo_') && entry[1] === 'on')
                        .map(entry => entry[0].split('_')[1]),
                    section: req.body.course_section
                })

                res.redirect(302, `/course/${course_portfolio.id}`)
            } else {
                await course_new_page(res, req.body.department)
            }
        } else {
            await course_manage_page(res, 499)
        }
    }))

module.exports = router;
module.exports.getPortfolios = getPortfolios;
module.exports.sortPortfolios = sortPortfolios;
module.exports.setReadOnly = setReadOnly;

