import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {Nav} from 'react-bootstrap'
import { addItem } from "../store";
import { useDispatch } from "react-redux";


function Detail(props){

    let [count, setCount] = useState(0)

    let {id} = useParams();

    let findProduct = props.shoes.find(x=> x.id == id);

    let [alert, setAlert] = useState(true)

    let [tab, setTab] = useState(0)

    let dispatch = useDispatch()

    useEffect(()=>{
        let timer = setTimeout(()=>{setAlert(false)},2000)
        console.log(1)
        return ()=>{
            // useEffect가 실행되기 전에 실행됨 (단, mount (X), unmount (O))
            console.log(2)
            clearTimeout(timer) // 타이머 제거해주는 함수
        }
    }, [])


    let [fade, setFade] = useState('')

    useEffect(()=>{
        setFade('end')
        return ()=>{
            setFade('')
        }
    },[])


    return (
        <div className={'container start '+fade}>
            {
                alert == true ? <div className="alert alert-warning">
                2초이내 구매시 할인
            </div> : null
            }
        <div className="row">
            <div className="col-md-6">
            <img src={'https://codingapple1.github.io/shop/shoes'+(findProduct.id + 1)+'.jpg'} width="100%" />
            </div>
            <div className="col-md-6">
            <h4 className="pt-5">{findProduct.title}</h4>
            <p>{findProduct.content}</p>
            <p>{findProduct.price}</p>
            <button className="btn btn-danger" onClick={()=>{
                dispatch(addItem(findProduct))
            }}>주문하기</button> 
            </div>
        </div>
        <Nav variant ="tabs" defaultActiveKey="link0">
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
            </Nav.Item>
        </Nav>
            <TabContent tab={tab} shoes={props.shoes}/>

        </div> 
      )
}

function TabContent({tab,shoes}){

// if(tab ==0){
//     return <div>내용0</div>
// }
// else if(tab ==1){
//     return <div>내용1</div>
// }
// else if(tab ==2){
//     return <div>내용2</div>
// }
    let [fade, setFade] = useState('') 


    useEffect(()=>{ // automatic batching 기능 방지를 위한 setTimeout() 사용
        let timer = setTimeout(()=>{setFade('end')},100)
        return ()=>{
            clearTimeout(timer)
            setFade('')
        }
    }, [tab])


    return <div className={'start '+fade}>
        {[<div>{shoes[0].title}</div>,<div>내용1</div>,<div>내용2</div>][tab]}
    </div>
}


export default Detail;