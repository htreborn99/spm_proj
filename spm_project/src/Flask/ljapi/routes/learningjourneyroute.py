from logging import error
from re import L
from shutil import register_archive_format
from flask import Blueprint, jsonify, request
from ..models import db, Role, Jobrole,Course,Skill,Staff,Learningjourney,Registration

learningjourney = Blueprint('learningjourneyroute', __name__)
# TO CALL API, USE /learningjourney/<route>
# Replace and change this. This is just dummy data for you to follow the format
@learningjourney.route('/display/')
def route1():
    learningjourney = Learningjourney.query.first()
    array = []
    for item in learningjourney.course:
        array.append(
            item.to_dict()
        )
    return jsonify(
        {   
            "jobrole" : learningjourney.to_dict(),
            "skillassociated": array
        }
    )

@learningjourney.route("/displaymain", methods=['POST'])
def displaymain():
    frontend_input = request.get_json()

    staff_id = frontend_input['staff_id']
    # print("This is from Learning: ",staff_id)
    # Success! 
    learning_journey_database = Learningjourney.query.filter_by(staff_id=staff_id).all()
    result_arr = []

    for item in learning_journey_database:
        result_arr.append(item.to_dict())

    print(learning_journey_database)
    return jsonify(
        {
            "code" : 200,
            "data" : result_arr
        }
    )

@learningjourney.route("/jobrole_name", methods=['POST'])
def displayjobname():
    frontend_input = request.get_json()

    jobrole_id = frontend_input['jobrole']
    print("This is the jobrole id", jobrole_id)
    # print("This is from Learning: ",staff_id)
    # Success! 
    jobroledatabase = Jobrole.query.filter_by(jobrole_id=jobrole_id).first().to_dict()

    return jsonify(
        {
            "code" : 200,
            "data" : jobroledatabase
        }
    )


@learningjourney.route("/viewcourselearningjourney", methods=['POST'])
def viewcourselearningjourney():
    frontend_input = request.get_json()
    jobrole_id = frontend_input['jobroleid']
    staff_id = frontend_input['staff_id']

    learningjourney_id = frontend_input['learningjourneyid']
    jobroledatabase = Learningjourney.query.filter_by(learningjourney_id=learningjourney_id).first()
    array = []

    for item in jobroledatabase.course:
        object = item.to_dict()
        course_id = object['course_id']
        course_name = object['course_name']
        course_description = object['course_desc']

        # Call out for Registration with filter_by Course_ID and Staff_ID 
        registration_database = Registration.query.filter_by(course_id = course_id, staff_id=staff_id).first()
        registration_database = registration_database.to_dict()

        registration_status = registration_database['reg_status']
        registration_completion_status = registration_database['completion_status']

        array.append(
            {
                "course_id" : course_id,
                "course_name" : course_name,
                "course_description" : course_description,
                "reg_status" : registration_status,
                "completion_status" : registration_completion_status
            }
        )

    return jsonify(
        {
            "code" : 200,
            "data" : array
        }
    )


@learningjourney.route("/deletecoursesinlearningjourney", methods=['DELETE'])
def deletecoursesinlearningjourney():
    frontend_input = request.get_json()
    courseid = frontend_input['course_id']
    learningjourney_id = frontend_input['learning_journey_id']

    # print("This is from delete coruses", courseid)
    # print("This is from delete coruses", learningjourney_id)

    jobroledatabase = Learningjourney.query.filter_by(learningjourney_id=learningjourney_id).first()

    course_to_remove = Course.query.filter_by(course_id=courseid).first()

    try:
        jobroledatabase.course.remove(course_to_remove)
        db.session.commit()
        return jsonify({
            "code" :200,
            "data": "Delete is successful!"
        })

    except:
        print(error)
        return jsonify({
            "code" :404,
            "data": "Delete is unsuccessful!"
        })


@learningjourney.route("/addingcoursesinlearningjourney", methods=['POST'])
def addingcoursesinlearningjourney():
    frontend_input = request.get_json()
    frontend_courseid = frontend_input['course_id']
    frontend_learning_journey_id = frontend_input['learning_journey_id']

    print(frontend_courseid)
    print(frontend_learning_journey_id)

    jobroledatabase = Learningjourney.query.filter_by(learningjourney_id=frontend_learning_journey_id).first()
    course_data = Course.query.filter_by(course_id=frontend_courseid).first()

    try:
        jobroledatabase.course.append(course_data)
        db.session.commit()
        return jsonify({
            "code" :200,
            "data": "Add Skill to learning journey is successful!"
        })

    except:
        print(error)
        return jsonify({
            "code" :404,
            "data": "Adding of Skill to learning journey is unsuccessful!"
        })

@learningjourney.route("/viewcoursesinjobrole", methods=['POST'])
def viewcoursesinjobrole():
    frontend_input = request.get_json()

    jobroleid = frontend_input['jobrole_id']
    saved_courses = frontend_input['course_saved']
    print(saved_courses)

    # [{'skill_id': 1, 'skill_name': 'Mobile Design Architecture Skill', 'skill_desc': 'Able to create Prototyping frameworks, user flows, mockups.', 'skill_status': 'Active'}]
    searchup_array = []
    for course in saved_courses:
        searchup_array.append(course['course_id'])

    print(searchup_array)


    jobroles = Jobrole.query.filter_by(jobrole_id=jobroleid).first()
    skills_array = []
    output_array = []

    print(jobroles)
    # In one JobRole, print out all the skills
    for skill in jobroles.skill:
        skills_array.append(skill.to_dict())
    
    print(skills_array)
    # For every skills, print out all the courses
    for skills in skills_array:
        # print(skills['skill_id'])
        skill = Skill.query.filter_by(skill_id=skills['skill_id']).first()
        # print(skill.skills_to_course)
        for one_skill in skill.skills_to_course:
            if one_skill.to_dict()['course_id'] not in searchup_array:
                print("This is one skill",one_skill.to_dict()['course_id'])
                output_array.append(one_skill.to_dict())

    # print(output_array)
    return jsonify({
        "code": 200,
        "data": output_array
    })