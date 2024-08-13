import { configureStore, createSlice} from "@reduxjs/toolkit";
import user from './store/userSlice.js';

let stock = createSlice({
    name : 'stock',
    initialState : [10,11,12]
})

let item = createSlice({
    name : 'item',
    initialState : [
        {id : 3, title : 'White and Black',count :2, price:15000},
        {id : 4, title : 'Grey Yordan', count :1, price:21000}
    ], 
    reducers : {
        countUp(state,action){ // 전송받은 id값과 같은 id값을 갖는 상품의 index를 찾아 값을 올려줌
            let findProduct = state.findIndex(x=> x.id == action.payload);
            console.log(findProduct)
            state[findProduct].count += 1
        },
        addItem(state, action){
            state.push(action.payload)
        }
    }
})

export let {countUp, addItem} = item.actions

export default configureStore({
    reducer : {
        user : user.reducer,
        stock : stock.reducer,
        item : item.reducer
    }
})