// Import All React Related files here
import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import { useState,useEffect, useCallback } from 'react';

// Import All Redux ToolKit here
import { useSelector, useDispatch } from 'react-redux';


// Import all the molecules files here

// Import ALL material UI things here
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardActionArea } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import ButtonGroup from '@mui/material/ButtonGroup';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';

import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircle from '@mui/icons-material/AddCircle';



function Ljaddskills() {
  let navigate = useNavigate();

    // I need to fetch back the courses that are tagged to this job role
    const learningjourney_id = useSelector((state) => state.viewlearningjourney.current_learningjourney)
    const jobrole_id = useSelector((state) => state.viewlearningjourney.jobrole_id)

    const staff_id = useSelector((state) => state.session.staff_id)
    const staff_fname = useSelector((state) => state.session.staff_fname)
    const staff_lname = useSelector((state) => state.session.staff_lname)
    const dept = useSelector((state) => state.session.dept)
    const email = useSelector((state) => state.session.email)
    const role_id = useSelector((state) => state.session.role_id)
    const role_name = useSelector((state) => state.session.rolename)

    const saved_courses = useSelector((state) => state.viewlearningjourney.saved_courses)


    const [output, setoutput] = useState([])
    
    const [jobname, setjobname] = useState([])

    const addcourse = (courseid) => {
      const result = {'course_id': courseid, "learning_journey_id" : learningjourney_id} 
      const options = {
        method: "POST",
        headers: {
              'Content-Type': 'application/json',
              "Access-Control-Allow-Origin": "http://localhost:3000/learningjourneyviewcourse"
              },
        body: JSON.stringify(result)
      }
      fetch("http://127.0.0.1:5000/learningjourney/addingcoursesinlearningjourney", options)
      .then(response => response.json())
      .then(data => {
        alert(data.data)
      })
      navigate("/learningjourneyviewcourse", {replace: true})
    }


    // This is to know the Role Name from the Role Id.
    useEffect(() => {
        // I need to know who have logged in. 
        const result = {"jobrole": jobrole_id}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000/learningjourneyaddskills"
            },
            body: JSON.stringify(result)
        }
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/learningjourney/jobrole_name", options)
            response = await response.json()
            setjobname(response.data['jobrole_name'])
            console.log("This is the ljAddskills",response.data)
      }
      fetchMyAPI()
    },[])

    // This part onwards will fetch back all the information
    useEffect(() => {
        // I need to know who have logged in. 
        const result1 = {"jobrole_id": jobrole_id, "course_saved": saved_courses}
        const options = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:3000/learningjourneyaddskills"
            },
            body: JSON.stringify(result1)
        }
        const fetchMyAPI = async () => {
            let response = await fetch("http://127.0.0.1:5000/learningjourney/viewcoursesinjobrole", options)
            response = await response.json()
            // console.log(result1)
            setoutput(response.data)
            // console.log("This is the LjViewCourse",response.data['jobrole_name'])
      }
      fetchMyAPI()
      // console.log("This is from ljAddskills",result)

    },[])
    
    // console.log(output)
    return (
        <Container>
          
            <Box marginTop="5%">
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Adding Courses to Learning Journey ID: {learningjourney_id}
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
                
            </Grid>
          </Grid>
          
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography textAlign="left">
                Job: {jobname}
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>

                      <TableCell>Course Id</TableCell>
                      <TableCell>Course Name</TableCell>
                      <TableCell>Course Description</TableCell>
                      <TableCell>Course Type</TableCell>
                      <TableCell>Course Category</TableCell>
                      <TableCell>Track</TableCell>

                    </TableRow>
                  </TableHead>
                  {/* The body of the Table Goes here */}
                  <TableBody>
                    {output.map((singleoutput) => 
                      <TableRow>
                      <TableCell>{singleoutput["course_id"]}</TableCell>
                      <TableCell>{singleoutput.course_name}</TableCell>
                      <TableCell>{singleoutput.course_desc}</TableCell>
                      <TableCell>{singleoutput.course_type}</TableCell>
                      <TableCell>{singleoutput.course_category}</TableCell>
                      <TableCell>
                        <IconButton color="primary" onClick={() => addcourse(singleoutput["course_id"])}><AddCircle/></IconButton>
                      </TableCell>

                    </TableRow>
                    )}
                    {output.length == 0 ? <TableCell colSpan={5}><Typography textAlign="center" color="secondary">There is no skills left to be added to Learning Journey.</Typography></TableCell>  : <></>}

                  </TableBody>
                  
                  {/* End of the Body Table  */}
                </Table>
              </TableContainer>
            </Grid>
          </Grid>

        </Box>
        </Container>
  );
}

export default Ljaddskills;