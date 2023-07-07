import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Carousel } from 'react-bootstrap'
import bg from './img/bg.png';
import { createContext, useState } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom'
import Detail from './routes/Detail';
import Event from './routes/Event';
import axios from 'axios'
import Cart from './routes/Cart.js'
import mainVideo from './mainvideo.mp4';
import netWork from './Network.mp4';

function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  return (
    <div className='App'>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}>JOBDANKOOK</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>🏠홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>📑이력서 관리</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={
          <>
            <div className="main-bg">
              <Carousel>
                <Carousel.Item interval={5000}>
              <video muted autoPlay loop>
                <source src={mainVideo} type="video/mp4" />
              </video>
              <div class="text fadein">
                <p>당신의 땀이 결실을 맺을 수 있도록</p>
                <h2>JOBDANKOOK</h2>
              </div>
              </Carousel.Item>
              <Carousel.Item interval={5000}>
              <video muted autoPlay loop>
                <source src={netWork} type="video/mp4" />
              </video>
              <div class="text fadein">
                <p>맞춤형 취업 컨설팅</p>
              </div>
              </Carousel.Item>
              </Carousel>
            </div>
            <div className="container">
              <button onClick={() => {
                axios.get('https://codingapple1.github.io/shop/data2.json').then((결과) => {
                  console.log(결과.data)
                  let copy = [...shoes, ...결과.data]
                  setShoes(copy)
                })
                  .catch(() => {
                    console.log('실패함')
                  })
              }}>더보기</button>
              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i + 1} ></Card>
                })}
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={
          <Detail shoes={shoes} />
        } />

        <Route path="/cart" element={<Cart />}></Route>

        <Route path="/event" element={<Event />}>
          <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
          <Route path="two" element={<div>생일기념 쿠폰 받기</div>} />
        </Route>
        <Route path="*" element={<div>없는 페이지</div>} />
      </Routes>
    </div>
  );
}

function Card(props) {
  let navigate = useNavigate();
  return (
    <div className="col-md-4" onClick={() => { navigate(`/detail/${props.i - 1}`) }}>
      <img src={'https://codingapple1.github.io/shop/shoes' + props.i + '.jpg'} width="80%" />
      <h5>{props.shoes.title}</h5>
      <h4>{props.shoes.content}</h4>
      <p>D-{props.shoes.price}</p>
    </div>
  )
}
export default App;