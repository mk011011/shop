import {Table} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { changeAge, changeName } from './../store/userSlice.js'
import { countUp } from '../store.js'

function Cart(){

    let item = useSelector((state)=> state.item)
    let name = useSelector((state)=> state.user)

    let dispatch = useDispatch()


    return (
        <div>
            <h6>{name.name} {name.age}의 장바구니</h6>
            <button onClick={()=>{
                dispatch(changeAge(10))
            }}>버튼</button>
        <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경</th>
          </tr>
        </thead>
        <tbody>

            {
                item.map((a,i)=>
                        <>
                        <tr key={i}>
                        <td>{item[i].id}</td>
                        <td>{item[i].title}</td>
                        <td>{item[i].count}</td>
                        <td>
                            <button onClick={()=>{
                                dispatch(countUp(item[i].id))
                            }}>+</button>
                        </td>
                        </tr>
                        </>
                )
            }
          
        </tbody>
      </Table>
      </div>
    )
}

export default Cart