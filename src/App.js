import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, Carousel } from 'react-bootstrap'
import { createContext, useState, useEffect } from 'react';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import Detail from './routes/Detail';
import Event from './routes/Event';
import axios from 'axios'
import Cart from './routes/Cart.js'
import News from './routes/news.js'
import mainVideo from './mainvideo.mp4';
import netWork from './Network.mp4';
import dankook from './img/dankook.png';
import { useSelector } from 'react-redux';
import ApplicationDetail from './routes/ApplicationDetail';


function App() {

  let [shoes, setShoes] = useState(data)
  let navigate = useNavigate();
  let [inputCount, setInputCount] = useState(0);
  let [inputCount2, setInputCount2] = useState(0);
  let [inputCount3, setInputCount3] = useState(0);
  let [inputCount4, setInputCount4] = useState(0);
  let [employeeId, setEmployeeId] = useState(0);


  const [name, setName] = useState('')
  const [phoneNo, setphoneNo] = useState('')

  useEffect(() => {
    axios.get('https://port-0-employmentservice-likelion-20zynm2mljud9i6q.sel4.cloudtype.app/api/employment')
      .then((결과) => {
        console.log(결과.data.result);
        let copy = [...shoes, ...결과.data.result];
        setShoes(copy);
      })
      .catch(() => {
        console.log('실패함');
      });
  }, []);

  const postApply = () => {
    axios.post('https://port-0-employmentservice-likelion-20zynm2mljud9i6q.sel4.cloudtype.app/api/apply', {
      "employId": employeeId,
      "name": name,
      "gender": gender,
      "birth": birth,
      "phoneNo": phoneNo,
      "residence": residence,
      "careerYn": careerYn ? "Y" : "N",
      "content1": content1,
      "content2": content2,
      "content3": content3,
      "content4": content4
    })
      .then(res => {
        console.log(res)
        alert("자소서 저장 성공! 홈으로 이동합니다."); // 요청이 성공하면 alert창 표시
        navigate('/'); // home.js로 리디렉션
      }).catch(err => {
        console.log(err)
        alert("업데이트 실패");
      })
  }

  const [gender, setGender] = useState('');

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const [residence, setResidence] = useState('');

  const handleAddressChange = (event) => {
    setResidence(event.target.value);
  };


  const [birth, setBirthdate] = useState('');

  const handleBirthdateChange = (event) => {
    setBirthdate(event.target.value);
  };

  const [careerYn, setExperience] = useState(false);
  const handleExperienceChange = (event) => {
    setExperience(event.target.checked);
  };


  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [content4, setContent4] = useState('');


  // 이벤트 핸들러 추가
  const onContent1Change = (e) => {
    setInputCount(e.target.value.length);
    setContent1(e.target.value);
  };

  const onContent2Change = (e) => {
    setInputCount2(e.target.value.length);
    setContent2(e.target.value);
  };

  const onContent3Change = (e) => {
    setInputCount3(e.target.value.length);
    setContent3(e.target.value);
  };

  const onContent4Change = (e) => {
    setInputCount4(e.target.value.length);
    setContent4(e.target.value);
  };


  return (
    <div className='App'>

      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand onClick={() => { navigate('/') }}><div class="txt">
            <img src={dankook} width="37.5px" height="37.5px" />
            <span>J</span>
            <span>O</span>
            <span>B</span>
            <span>D</span>
            <span>A</span>
            <span>N</span>
            <span>K</span>
            <span>O</span>
            <span>O</span>
            <span>K</span>
          </div></Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>🏠홈</Nav.Link>
            <Nav.Link onClick={() => { navigate('/event') }}>📑내 자소서 관리</Nav.Link>
            <Nav.Link onClick={() => { navigate('/news') }}>🔍뉴스 검색</Nav.Link>
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
                    <div class="stroke">
                      <h2><strong>JOBDANKOOK</strong></h2>
                    </div>
                  </div>
                </Carousel.Item>
                <Carousel.Item interval={5000}>
                  <video muted autoPlay loop>
                    <source src={netWork} type="video/mp4" />
                  </video>
                  <div class="text">
                    <h2>맞춤형 취업 컨설팅</h2>
                  </div>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="container">


              <div className="row">
                {shoes.map((a, i) => {
                  return <Card shoes={shoes[i]} i={i + 1} ></Card>
                })}
              </div>
            </div>
          </>
        } />
        <Route path="/detail/:id" element={<Detail shoes={shoes} setEmployeeId={setEmployeeId} />}>
          <Route path="write" element={
            <div>
              <br /><br /><h1 className='ply'><strong>지원서 작성하기</strong></h1>
              <br /><br /><h4 className='ply'>기본 정보</h4>
              <br /><p className='ply'>이름</p>
              <input onChange={e => setName(e.target.value)} placeholder='예)홍길동'></input>


              <br /><br /><p className='ply'>성별</p>
              <select value={gender} onChange={handleGenderChange}>
                <option value="">--선택하세요--</option>
                <option value="Male">남성</option>
                <option value="Female">여성</option>
              </select>

              <br /><br /><p className='ply'>주소</p>
              <input
                type="text"
                defaultValue={residence}
                onChange={handleAddressChange}
                placeholder="주소를 입력하세요"
              />

              <br /><br /><p className='ply'>생년월일</p>
              <input
                type="text"
                defaultValue={birth}
                onChange={handleBirthdateChange}
                placeholder="YYYY-MM-DD"
              />

              <br /><br /><p className='ply'>경력 유무</p>
              <input
                type="checkbox"
                checked={careerYn}
                onChange={handleExperienceChange}
              />

              <br /><br /><p className='ply'>전화번호</p>
              <input onChange={e => setphoneNo(e.target.value)} type='number' placeholder="010-1234-5678"></input>


              <br /><br /><h5 className='ply'>1. 우리 회사에 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.</h5><p className='ply'>글자수: {inputCount}</p>
              <textarea
                name="content1"
                cols="115"
                rows="15"
                onChange={onContent1Change}
              ></textarea>

              <br /><br /><h5 className='ply'>2. 본인의 성장과정을 간략히 기술하되 현재의 자신에게 가장 큰 영향을 끼친 사건, 인물 등을 포함하여 기술하시기 바랍니다.</h5><p className='ply'>글자수: {inputCount2}</p>
              <textarea
                name="content2"
                cols="115"
                rows="15"
                onChange={onContent2Change}
              ></textarea>

              <br /><br /><h5 className='ply'>3. 최근 사회이슈 중 중요하다고 생각되는 한가지를 선택하고 이에 관한 자신의 견해를 기술해 주시기 바랍니다.</h5><p className='ply'>글자수: {inputCount3}</p>
              <textarea
                name="content3"
                cols="115"
                rows="15"
                onChange={onContent3Change}
              ></textarea><br />

              <br /><br /><h5 className='ply'>4. 하고싶은 말을 자유롭게 기술해 주시기 바랍니다.</h5><p className='ply'>글자수: {inputCount4}</p>
              <textarea
                name="content4"
                cols="115"
                rows="15"
                onChange={onContent4Change}
              ></textarea><br />

              <button className="btn btn-danger" onClick={() => postApply()}>제출하기</button>


            </div>} />

        </Route>

        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/event/:applyId" element={<ApplicationDetail />} />
        <Route path="/news" element={<News />}></Route>
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
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <div className="col-md-3" onClick={() => { navigate(`/detail/${props.i - 1}`) }}>
      <div
        className={isHovering ? "grow" : ""}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <img src={require(`./img/${props.shoes.content}.png`)} />
        <h6 className='ply'>{props.shoes.companyName}</h6>
        <h4 className='ply'>{props.shoes.title}</h4><br /><br />
        <p className='ply1'>{props.shoes.expDate}까지</p>

      </div></div>
  )
}
export default App;