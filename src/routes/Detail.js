import { useState, useEffect, useContext } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import './../App.css';
import shinHan from './../프디아_공고.png';


function Detail(props) {

    let [num, setNum] = useState('')
    let [count, setCount] = useState(0)
    let { id } = useParams();
    let 찾은상품 = props.shoes.find((x) => x.id == id)
    let [탭, 탭변경] = useState(0)
    let [fade, setFade] = useState('')
    let navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [props.탭]) //화면 부드럽게 하는 효과

    useEffect(() => {
        window.scrollTo(0, 0);
      }, [id]); //페이지 전환시 스크롤 맨 위로

    return (
        <div className={`container start ${fade}`}>
            <div className="row">
                <div className="col-md-6">
                    <img src="https://blog.kakaocdn.net/dn/dg5fpM/btqwMdBY480/yBALyxESNGxdULrhjEW1L1/img.jpg" width="100%" />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은상품.title}</h4>
                    <p>{찾은상품.content}</p>
                    <p>D-{찾은상품.price}</p>
                    <button className="btn btn-danger" onClick={()=>{ navigate('write'); }}>지원하기</button>
                </div>
            </div>

            <Nav variant="tabs" defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(0) }} eventKey="link0">상세요강</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(1) }} eventKey="link1">접수기간/방법</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { 탭변경(2) }} eventKey="link2">기업정보</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent 탭={탭} />

            <Outlet></Outlet>
        </div>
    )
};

function TabContent(props) {
    let [fade, setFade] = useState('')

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)
        return () => {
            setFade('')
        }
    }, [props.탭]) //화면 부드럽게 하는 효과

    return (
        <div className={`start ${fade}`}>
            {[<div><img src={shinHan} alt="My Image" /></div>, <div>내용1</div>, <div>내용2</div>][props.탭]}
        </div>
    )
}

export default Detail;