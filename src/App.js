import { useState } from 'react';
import './App.css';
import { Button, Navbar, Container, Nav} from 'react-bootstrap';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet, NavLink } from 'react-router-dom'
import Detail from './routes/Detail.js';
import axios from 'axios';
import Cart from './routes/Cart.js'

function App() {


  let [shoes,setShoes] = useState(data)
  let navigate = useNavigate()
  let [shoesData, setShoesData] = useState(2)
  let [isDisable, setIsDisable] = useState(false)


  return (
    <div className="App">

      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand onClick={()=>{navigate('/')}}>Shop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Home</Nav.Link>
            <Nav.Link onClick={()=>{navigate('/Cart')}}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Routes>
        <Route path='/' element={
          <>
          <div className='main-bg'></div>
          <div className='container'>
            <div className='row'>
              {
                shoes.map((a, index)=>{
                  return (
                    <Card shoes={shoes} index={index}></Card>
                  )
                })
              }
            </div>
          </div>
          <button onClick={()=>{
      
            axios.get('https://codingapple1.github.io/shop/data'+ shoesData +'.json')
              .then((response)=>{
                let copy = [...shoes, ...response.data]
                setShoes(copy)
                
              })
              .catch(()=>{
                console.log('실패함')
              })
              {
                shoesData == 2 ? setShoesData(shoesData+1) : setIsDisable(true)
              }
          }} disabled={isDisable}>버튼</button>
        </>
        }/>
        <Route path='/detail/:id' element={<Detail shoes={shoes}/>}/>
        <Route path='*' element={<div>없는 페이지임</div>}/>
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
        </div>
  );
}

function Card(props){
  return (
    <div className='col-md-4'>
            <NavLink to={"/detail/"+props.index}>
              <img src={'https://codingapple1.github.io/shop/shoes' + (props.index+1) +'.jpg'} width='80%'/>
              </NavLink>
              <h4>{props.shoes[props.index].title}</h4>
              <p>{props.shoes[props.index].content}</p>
              <p>{props.shoes[props.index].price}</p>
              </div>
  )
}


export default App;
