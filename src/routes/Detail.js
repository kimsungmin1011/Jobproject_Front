import { useState, useEffect, useContext, createContext } from "react";
import { useParams, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setId } from './../store';
import { Nav } from 'react-bootstrap'
import './../App.css';
import shinHan from './../img/프디아_공고.png';
import axios from 'axios';


function Detail(props) {

    let [num, setNum] = useState('')
    let [count, setCount] = useState(0)
    let { id } = useParams();

    const dispatch = useDispatch();
    props.setEmployeeId(id);

    // useEffect를 이용하여 컴포넌트가 렌더링될 때 ID 값을 store에 저장합니다.
    useEffect(() => {
      dispatch(setId(id));
    }, [id, dispatch]);
    
    let 찾은회사 = props.shoes.find((x) => x.employId - 1 == id);
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


    if (!찾은회사) {
        return <div>공고를 찾을 수 없습니다.</div>;
    }

    return (
        <div className={`container start ${fade}`}>
            <div className="row">
                <div className="col-md-6">
                    <img src={require(`./../img/${찾은회사.content}.png`)} width='100%' />
                </div>
                <div className="col-md-6 mt-4">
                    <h4 className="pt-5">{찾은회사.companyName}</h4>
                    <p>{찾은회사.title}</p>
                    <p>{찾은회사.expDate}</p>
                    <button className="btn btn-danger" onClick={() => { navigate('write'); }}>지원하기</button>
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
            <TabContent 탭={탭} 찾은회사={찾은회사} />

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


    const companyInfoDiv = (
        <div className='companyInfo'>
            <img src={require(`./../img/${props.찾은회사.content}.png`)} />
            <h2>{props.찾은회사.companyName}</h2>
            <p>기업규모: {props.찾은회사.corporateForm}</p>
            <p>사업분야: {props.찾은회사.industry}</p>
            <p>본사: {props.찾은회사.location}</p>
            <a href={props.찾은회사.url}>{props.찾은회사.url}</a>
        </div>
    );



    return (
        <div className={`start ${fade}`}>
            {[<div>
                <table className="job-table">
            <thead>
                <tr>
                    <th>채용분야</th>
                    <th>고용형태</th>
                    <th>경력요건</th>
                    <th>학력요건</th>
                    <th>급여</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.찾은회사.title}</td>
                    <td>{props.찾은회사.jobType}</td>
                    <td>{props.찾은회사.career}</td>
                    <td>{props.찾은회사.education}</td>
                    <td>{props.찾은회사.salary}</td>
                </tr>
            </tbody>
        </table>
            </div>, <div>내용1</div>, companyInfoDiv][props.탭]}
        </div>
    )
}

export default Detail;