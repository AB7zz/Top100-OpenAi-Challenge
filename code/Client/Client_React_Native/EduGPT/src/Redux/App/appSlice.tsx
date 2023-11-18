import {createSlice} from '@reduxjs/toolkit';

const appStateSlice = createSlice({
  name: 'appReducer',
  initialState: {
    loggedIn:false,
    userType:"teacher",
    homeUrl:"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/home",
    addUrl:"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/Test",
    statsUrl:"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/progress/test1",
    studyUrl:"https://65572e38447a837804abf719--stalwart-naiad-fbb5b1.netlify.app/Test",
  },

  reducers: {
    setLoggedIn: (state, action) => {
      console.log("called")
      state.loggedIn = action.payload;
    },
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
  },
});

export const {setLoggedIn,setUserType} = appStateSlice.actions;

export default appStateSlice.reducer;
