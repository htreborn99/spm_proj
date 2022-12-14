import { configureStore  } from "@reduxjs/toolkit";

// Step 1: Import all the slices that you need here! #######################
import loginSlice from "../reduxslice/exampleSlice"
import sessionSlice from "../reduxslice/sessionSlice"
import courseSlice from "../reduxslice/courseSlice"
import filterskillcourseSlice from "../reduxslice/filterskillcourseSlice"
import jobrolesSlice from "../reduxslice/jobrolesSlice";
import jobroleskillSlice from "../reduxslice/jobroleskillSlice";
import viewlearningjourneySlice from "../reduxslice/viewlearningjourneySlice";

export const store = configureStore({
    // This reducer 
    reducer: {
        // Step 2: Add the imported files here. 
        login: loginSlice,
        session: sessionSlice,
        transferselectedskills: courseSlice,
        skillfilter: filterskillcourseSlice,
        jobrole: jobrolesSlice,
        jobroleskill: jobroleskillSlice,
        viewlearningjourney: viewlearningjourneySlice,
        // alan: alanSlice
    }
} 
// 

)

// This is the single store for your entire application, multiple stores are possible but not recommended. 
