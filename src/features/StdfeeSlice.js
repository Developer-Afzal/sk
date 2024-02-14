import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   Apr: [{id:2324, fee:'paid'}],
   May: [{id:2324, fee:'paid'}],
   Jun: [{id:2324, fee:'paid'}],
   Jul: [{id:2324, fee:'paid'}],
   Aug: [{id:2324, fee:'paid'}],
   Sep: [{id:2324, fee:'paid'}],
   Oct: [{id:2324, fee:'paid'}],
   Nov: [{id:2324, fee:'paid'}],
   Dec: [{id:2324, fee:'paid'}],
   Jan: [{id:2324, fee:'paid'}],
   Feb: [{id:2324, fee:'paid'}],
   Mar: [{id:2324, fee:'paid'}],
}

export const StdFeeSlice = createSlice ({
    name:'fees',
    initialState,
    reducers:{
        AcceptFee:(state, action)=>{
            console.log(action.payload);
            switch(action.payload.month){
                case 'Jan':
                    console.log('Jan');
                    state.Jan.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Feb':
                    console.log('feb');
                    state.Feb.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Mar':
                    console.log('Mar');
                    state.Mar.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Apr':
                    console.log('Apr');
                    state.Apr.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'May':
                    console.log('May');
                    state.May.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Jun':
                    console.log('Jun');
                    state.Jun.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Jul':
                    console.log('Jul');
                    state.Jul.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Aug':
                    console.log('Aug');
                    state.Aug.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Sep':
                    console.log('Sep');
                    state.Sep.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Oct':
                    console.log('Oct');
                    state.Oct.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Nov':
                    console.log('Nov');
                    state.Nov.push({id:action.payload.Enroll, fee:'paid'})
                    break;
                case 'Dec':
                    console.log('Dec');
                    state.Dec.push({id:action.payload.Enroll, fee:'paid'})
                    break;
            }
            // state.action.payload = action.payload
        }
    }
}) 

export const {AcceptFee} = StdFeeSlice.actions
export default StdFeeSlice.reducer;