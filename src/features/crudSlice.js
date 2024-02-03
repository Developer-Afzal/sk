import { createSlice, nanoid } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'

const initialState = {
    users:[
      {id:68124,S_Name:'Afzal Ansari', S_Fname:'Suhail Ansari', S_Mname:'Sayara Bano', Address:'537 GHA/ 323, LKO',Pincode:'223242', Coaching_Time:'4:00 To 7:00', P_Contact:'909898765', Date_of_Birth:'2024-12-23', S_Board:'CBSE', S_Class:'X', Fee:'1500'},
      {id:87891,S_Name:'Asad Ansari', S_Fname:'Suhail Ansari', S_Mname:'Sayara Bano', Address:'537 GHA/ 323, LKO',Pincode:'786723', Coaching_Time:'4:00 To 7:00', P_Contact:'909898765', Date_of_Birth:'2024-12-23', S_Board:'CBSE', S_Class:'X', Fee:'1500'},
      {id:29998,S_Name:'Ahid Ansari', S_Fname:'Suhail Ansari', S_Mname:'Sayara Bano', Address:'537 GHA/ 323, LKO',Pincode:'878893', Coaching_Time:'4:00 To 7:00', P_Contact:'909898765', Date_of_Birth:'2024-12-23', S_Board:'CBSE', S_Class:'X', Fee:'1500'},
      {id:89789,S_Name:'Rahul Singh', S_Fname:'Vijay Singh', S_Mname:'Neelam Singh', Address:'nehru Place, Delhi',Pincode:'908978', Coaching_Time:'4:00 To 7:00', P_Contact:'909898765', Date_of_Birth:'2024-12-23', S_Board:'CBSE', S_Class:'X', Fee:'1500'},
      {id:98989,S_Name:'Afzal Ansari', S_Fname:'Suhail Ansari', S_Mname:'Sayara Bano', Address:'537 GHA/ 323, LKO',Pincode:'098776', Coaching_Time:'4:00 To 7:00', P_Contact:'909898765', Date_of_Birth:'2024-12-23', S_Board:'CBSE', S_Class:'X', Fee:'1500'},
    ],
    ViewUser:[]
  }

export const FetchPost = createAsyncThunk('fetch/post', async () =>{
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
  } catch (error) {
    return error.message;
  }
})

  export const crudSlice = createSlice ({
    name:'crud',
    initialState,
    reducers:{
        Insert:(state, action)=>{
            let user = {
              id:nanoid(),
              S_Name:action.payload.S_Name,
              S_Fname:action.payload.S_Fname,
              S_Mname:action.payload.S_Mname,
              Address:action.payload.Address,
              Pincode:action.payload.Pincode,
              Coaching_Time:action.payload.Coaching_Time,
              P_Contact:action.payload.P_Contact,
              Date_of_Birth:action.payload.Date_of_Birth,
              S_Board:action.payload.S_Board,
              S_Class:action.payload.S_Class,
              Fee:action.payload.Fee,

            }
            // state.users = [user, ...state.users]
            state.users.unshift(user)
        },

        Updation:(state, action)=>{
          const {id} = action.payload
          // console.log('slice call', id);

          let INDEX = state.users.findIndex(itm=> {
           return itm.id === id
           })
          //  console.log(INDEX);
           state.users[INDEX] = action.payload
           
        },

        Deletion:(state, action)=>{
          let INDEX = state.users.findIndex(itm => {
            return itm.id === action.payload
          })
          state.users.splice(INDEX, 1)
       
        },

        Read:(state, action) => {
          state.ViewUser = action.payload
        }


    },
    extraReducers:(builder)=>{
      builder.addCase(FetchPost.fulfilled, (state, action) =>{
      })
    }
  })


  export const {Insert, Updation, Deletion, Read } = crudSlice.actions;
  export default crudSlice.reducer