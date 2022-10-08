// Import All React Related files here
import * as React from 'react';
import { useState,useEffect, useCallback } from 'react';



// Import All Router Links here

// Import All Redux ToolKit here

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




// Just to try: 
import {useSelector} from 'react-redux';


function Hrskills() {
  
  // Just to try: 
  // state.transfer (this transfer refers to the store.js , what name you linked it to )
  // 3rd paramter will be the initial state , one of the ojbect name 
  const jiepeng = useSelector((state) => state.transfer.transfer)


  const [output , handleoutput] = useState([])

//   const handleusername = (data) => {
//     setlogin(event.target.value)
// }
  
  useEffect(() => {

    const fetchMyAPI = async () => {
      let response = await fetch("http://127.0.0.1:5000/api/viewskills")
      response = await response.json()
      handleoutput(response.data)
    }

    fetchMyAPI()
  },[])

  console.log(typeof output)
  console.log(output)

  


  return (
      <Container>
        {console.log(jiepeng)}
        <Box marginTop="5%">

          
          <Grid container spacing={1}>
            <Grid item xs={6} alignContent="left">
              <Typography variant="h6" textAlign="left">
                Skills Management Dashboard
              </Typography>
            </Grid>
            <Grid item xs={2}></Grid>

            <Grid item xs={4}>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button>Add</Button>
                <Button>Delete</Button>
                <Button>Update</Button>
              </ButtonGroup>
            </Grid>
          </Grid>

          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TableContainer>
                <Table sx={{ minWidth: 650 }}>
                  <TableHead>
                    <TableRow>

                      <TableCell>Skill Id</TableCell>
                      <TableCell>Skill Name</TableCell>
                      <TableCell>Skill Description</TableCell>
                      <TableCell>Skill Status</TableCell>

                    </TableRow>
                  </TableHead>
                  {/* The body of the Table Goes here */}
                  <TableBody>
                    {output.map((singleoutput) => (
                      <TableRow>
                      <TableCell>{singleoutput.skill_id}</TableCell>
                      <TableCell>{singleoutput.skill_name}</TableCell>
                      <TableCell>{singleoutput.skill_desc}</TableCell>
                      <TableCell>{singleoutput.skills_status}</TableCell>
                    </TableRow>
                    ))}
                    {/* For Loop the Content here */}
                    

                                            {/* <TableRow>
                          <TableCell>{oneoutput.skill_id}</TableCell>
                          <TableCell>{oneoutput.skill_name}</TableCell>
                          <TableCell>{oneoutput.skill_desc}</TableCell>
                          <TableCell>{oneoutput.skills_status}</TableCell>
                        </TableRow> */}
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

export default Hrskills;