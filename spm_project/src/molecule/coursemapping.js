// Import All React Related files here
import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Import All Router Links here

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';
import { setTransfer } from "../reduxslice/courseSlice";
import { courseSkillTransfer } from "../reduxslice/filterskillcourseSlice";

// Import all the molecules files here

// Import ALL material UI things here
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/system';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';




function Coursemapping() {
    // For some reason only works after i set the state here
    const [mappingName, setMappingName] = useState("")
    const [courseName, setCourse] = useState([])
    const [receivedskills, showSkills] = useState([])
    const [selectedSkillsToRemove, addSkillsDeleted] = useState(useSelector((state) => state.transferselectedskills.transfer))
    const [currMappedCourses, setCurrMappedCourses] = useState([])
    const [currMappedRoles, setCurrMappedRoles] = useState([])

    const dispatch = useDispatch()
    // Initalisation of the useNavigate instance
    const navigate = useNavigate();
    // Navigation to a new page to map the new skills

    function handleClick() {
        navigate("/selectcourse")
        dispatch(courseSkillTransfer(receivedskills))
    }

    function handleClick2() {
        navigate("/selectjobrole")
        // dispatch(courseSkillTransfer(receivedskills))
    }

    // Discard changings to the state as well 
    // function discardChanges() {
    //     // discard and reset the localstate
    //     addSkillsDeleted([])
    //     // discard global state
    //     dispatch(setTransfer([]))

    // }
    var selectedSkills = []
    for(var i = 1; i < selectedSkillsToRemove.length; i ++){
        selectedSkills.push(selectedSkillsToRemove[i])
    }
    //Choosing the mapping, skills to to course or skills to role
    // function setMappingName() {
    // }

    // Confirmation to end point to add to the database
    // function confirmMapping() {
    //     // Get from the localstate of selectedSkillsToRemove
    //     console.log(selectedSkillsToRemove, "skills to remove")
    //     // Need to find a way to pass in the courseid here! Just testing this for the user story
    //     let selectedSkills = []
    //     for(var i = 1; i < selectedSkillsToRemove.length; i ++){
    //         selectedSkills.push(selectedSkillsToRemove[i])
    //     }
    //     let courseId = selectedSkillsToRemove[0]['course_id'];
    //     console.log(selectedSkills, "should have no course details");
    //     // var url = "http://127.0.0.1:5000/course/update/COR001"
    //     var url = `http://127.0.0.1:5000/course/update/${courseId}`
    //     const options = {
    //         method: "POST",
    //         headers: {
    //             'Content-Type': 'application/json',
    //             "Access-Control-Allow-Origin": "http://localhost:3000/mappings"
    //         },
    //         body: JSON.stringify(selectedSkills)
    //     }

    //     fetch(url, options)
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             // RELOAD PAGE
    //             // Remove the localchanges and update state
    //             discardChanges()
    //             // update the localstate for skills to display on the page
    //             showSkills(data.data.skills)
    //             alert("Skill has been added successfully!")
    //             navigate('/mappings')
    //         })

    // }
    // Function to load course from db
    // useEffect(() => {
    //     const fetchMyAPI = async () => {
    //         let response = await fetch("http://127.0.0.1:5000/course/view/COR001")
    //         const result = await response.json()

    //         if (response.ok) {
    //             if (result.data.skills.length != 0) {
    //                 console.log(result.data.skills, "data-skills")
    //                 // Transfers existing course skills to the courseskills page
    //                 await showSkills(result.data.skills)
    //                 console.log("helo")
    //             }
    //             await setCourse([result.data.coursedetails.course_id, result.data.coursedetails.course_name])
    //             console.log('timmy-course', courseName);
    //         }
    //     }
    //     fetchMyAPI()
    //         .then(result => {
    //             console.log(result)
    //             dispatch(courseSkillTransfer(receivedskills))
    //         })

    // }, [])
    // 2nd parameter is known as a dependency array

    // call to backend to get the courses which have currently been mapped
    useEffect(() => {
        const fetchMyAPI = async() => {
            let response = await fetch("http://127.0.0.1:5000/course/view/coursesmapped");
            const result = await response.json();
            setCurrMappedCourses(result.data['coursedetails']);
        }
        fetchMyAPI();

        const fetchMyAPI2 = async() => {
            let response = await fetch("http://127.0.0.1:5000/jobrole/view/jobrolesmapped");
            const result = await response.json();
            setCurrMappedRoles(result.data['jobroledetails']);
        }
        fetchMyAPI2();
    }, [])

    return (
        <Container>
            <Box>
                <Grid paddingTop="5%" container>
                    <Grid item xs={6}>
                        <Grid item>
                            <Button variant="contained" onClick = {() => setMappingName("skillsCourse")}>Map skills to course</Button>
                        </Grid>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item>
                            <Button variant="contained" onClick = {() => setMappingName("skillsRole")}>Map skills to role</Button>
                        </Grid>
                    </Grid>
                </Grid>
                
                {mappingName == "" &&
                <Grid container paddingTop="5%" spacing={5}>
                    <Grid item xs = {12}>
                        <Typography component='h1' variant="overline" color="success.main" align = 'center' sx={{fontWeight: 'bold' }}>
                                    Please choose something to map! 
                        </Typography>
                    </Grid>
                </Grid>
                }
                
                {mappingName == "skillsCourse" &&
                    <Grid>
                        <Grid container paddingTop="5%" spacing={5}>
                            <Grid item xs = {12}>
                                <Typography align = 'center' component="h1" variant="outline">
                                    Mapping Skill To Course
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={8} paddingTop="3%">
                            <Grid item xs={12}>
                            {/* First table for current mapped skills */}
                            <TableContainer component={Paper}>
                                <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                                    Current Mapped Courses
                                </Typography>
                                <Table stickyheader size="small" sx={{
                                        backgroundColor: "white",
                                        borderRadius: '16px',
                                    }}>
                                    <TableHead>
                                        <TableRow textAlign="center">
                                            <TableCell sx={{ fontWeight: 'bold' }}>Course ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Skill ID</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Skill Name</TableCell>
                                            <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currMappedCourses.length != 0 ? (currMappedCourses.map((singleOutput) => (
                                            <>
                                            <TableRow>
                                                <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.course_id}</TableCell>
                                                <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.course_name}</TableCell>
                                            </TableRow>
                                                {singleOutput.skills.map((singleSkill) => (
                                                    <TableRow>                                                 
                                                        <TableCell>{singleSkill['skill_id']}</TableCell>
                                                        <TableCell>{singleSkill['skill_name']}</TableCell>
                                                        <TableCell>{singleSkill['skill_desc']}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </>
                                        ))): (
                                            <TableRow textAlign='center'>
                                                <TableCell align="center" colSpan={12}>
                                                    "You do not have any mappings"
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <IconButton color="info" onClick={handleClick} sx={{ p: 2 }}><AddCircleIcon /></IconButton>
                        </Grid>
                    </Grid>
                    </Grid>
                }
                
                {mappingName == "skillsRole" &&
                    <Grid>
                    <Grid container paddingTop="5%" spacing={5}>
                        <Grid item xs = {12}>
                            <Typography align = 'center' component="h1" variant="outline">
                                Mapping Skill To Job Role
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid container spacing={8} paddingTop="3%">
                        <Grid item xs={12}>
                        {/* First table for current mapped skills */}
                        <TableContainer component={Paper}>
                            <Typography component='h1' variant="overline" color="success.main" align="left" gutterBottom sx={{ p: 2, fontWeight: 'bold' }}>
                                Current Mapped Job Roles
                            </Typography>
                            <Table stickyheader size="small" sx={{
                                    backgroundColor: "white",
                                    borderRadius: '16px',
                                }}>
                                <TableHead>
                                    <TableRow textAlign="center">
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Course Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role ID</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Job Role Name</TableCell>
                                        <TableCell sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {currMappedRoles.length != 0 ? (currMappedRoles.map((singleOutput) => (
                                        <>
                                        <TableRow>
                                            <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.jobrole_id}</TableCell>
                                            <TableCell rowSpan = {singleOutput.skills.length + 1}>{singleOutput.jobrole_name}</TableCell>
                                        </TableRow>
                                        {singleOutput.skills.map((singleSkill) => (
                                            <TableRow>
                                                <TableCell>{singleSkill['skill_id']}</TableCell>
                                                <TableCell>{singleSkill['skill_name']}</TableCell>
                                                <TableCell>{singleSkill['skill_desc']}</TableCell>
                                            </TableRow>
                                        ))}
                                        </>
                                    ))): (
                                        <TableRow textAlign='center'>
                                            <TableCell align="center" colSpan={12}>
                                                "You do not have any mappings"
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <IconButton color="info" onClick={handleClick2} sx={{ p: 2 }}><AddCircleIcon /></IconButton>
                    </Grid>
                </Grid>
                </Grid>
                }
            </Box>




        </Container>
    )



}

export default Coursemapping;