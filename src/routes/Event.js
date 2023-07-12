import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { createContext, useState, useEffect } from 'react';
import { Table } from 'react-bootstrap'
import { useSelector } from "react-redux"


function Event() {
    const [data, setData] = useState({});
    let state = useSelector((state) => { return state })

    const employIdToCompanyName = {
        1: "현대자동차(주)",
        2: "(주)한화",
        3: "(주)비바리퍼블리카",
        4: "(주)부산은행",
        5: "한국도로공사",
        6: "인천국제공항보안(주)",
        7: "(주)우아한형제들",
        8: "(주)넥슨",
        9: "(주)원풍",
    };


    useEffect(() => {
        axios.get('https://port-0-employmentservice-likelion-20zynm2mljud9i6q.sel4.cloudtype.app/api/apply')
            .then((결과) => {
                console.log(결과.data.result);
                setData(결과.data.result);
            })
            .catch(() => {
                console.log('실패함');
            });
    }, []);

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>지원자명</th>
                        <th>회사명</th>
                        <th>수정하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cart.map((a, i) =>
                            <tr key={i}>
                                <td>{i}</td>
                                {/* <td>{data[i].name}</td>
                                <td>{data[i].employId}</td> */}
                                <td>{data[i]?.name}</td>
                                <td>{employIdToCompanyName[data[i]?.employId]}</td>
                                <td>📝</td>
                            </tr>
                        )
                    }
                </tbody>
            </Table>
            <Outlet></Outlet>
        </div>
    );
}

export default Event;
