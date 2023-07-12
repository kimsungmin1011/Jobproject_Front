import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useState, useEffect } from 'react'
import './../App.css';


function ApplicationDetail() {
  const { applyId } = useParams();
  const [data, setData] = useState(null);
  let navigate = useNavigate();

  const postApply = () => {
    axios.post('https://port-0-employmentservice-likelion-20zynm2mljud9i6q.sel4.cloudtype.app/api/apply', {
      "applyId": data.applyId,
      "employId": data.employId,
      "name": data.name,
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
        console.log(data.applyId)
        console.log(data.employId)
      })
  }

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

  const [phoneNo, setphoneNo] = useState('')

  const [content1, setContent1] = useState('');
  const [content2, setContent2] = useState('');
  const [content3, setContent3] = useState('');
  const [content4, setContent4] = useState('');


  // 이벤트 핸들러 추가
  const onContent1Change = (e) => {
    setContent1(e.target.value);
  };

  const onContent2Change = (e) => {
    setContent2(e.target.value);
  };

  const onContent3Change = (e) => {
    setContent3(e.target.value);
  };

  const onContent4Change = (e) => {
    setContent4(e.target.value);
  };


  useEffect(() => {
    axios.get(`https://port-0-employmentservice-likelion-20zynm2mljud9i6q.sel4.cloudtype.app/api/apply/${applyId}`)
      .then((response) => {
        setData(response.data.result);
        console.log(response.data.result)
      })
      .catch(() => {
        console.log('Failed to fetch data');
      });
  }, [applyId]); // note the dependency array here, this ensures the useEffect will run again if applyId changes

  if (data) {
    return (
      <div>
        <h1><strong>자기소개서 수정</strong></h1>
        <p>지원자 이름: {data.name}</p>
        <p>회사: {employIdToCompanyName[data.employId + 1]}</p>

        <br /><br /><p className='ply'>성별</p>
        <select onChange={handleGenderChange}>
          <option value="">--선택하세요--</option>
          <option value="Male">남성</option>
          <option value="Female">여성</option>
        </select>

        <br /><br /><p className='ply'>주소</p>
        <input
          type="text"
          defaultValue={data.residence}
          onChange={handleAddressChange}
          placeholder="주소를 입력하세요"
        />

        <br /><br /><p className='ply'>생년월일</p>
        <input
          type="text"
          defaultValue={data.birth}
          onChange={handleBirthdateChange}
          placeholder="YYYY-MM-DD"
        />

        <br /><br /><p className='ply'>경력 유무</p>
        <input
          type="checkbox"
          checked={data.careerYn}
          onChange={handleExperienceChange}
        />

        <br /><br /><p className='ply'>전화번호</p>
        <input onChange={e => setphoneNo(e.target.value)} type='number' defaultValue={data.phoneNo} ></input>


        <br /><br /><h5 className='ply'>1. 우리 회사에 지원한 이유와 입사 후 회사에서 이루고 싶은 꿈을 기술하십시오.</h5><p className='ply'></p>
        <textarea
          name="content1"
          cols="115"
          rows="15"
          defaultValue={data.content1}
          onChange={onContent1Change}
        ></textarea>
        <br /><br /><h5 className='ply'>2. 본인의 성장과정을 간략히 기술하되 현재의 자신에게 가장 큰 영향을 끼친 사건, 인물 등을 포함하여 기술하시기 바랍니다.</h5><p className='ply'></p>
        <textarea
          name="content2"
          cols="115"
          rows="15"
          defaultValue={data.content2}
          onChange={onContent2Change}
        ></textarea><br /><br /><h5 className='ply'>3. 최근 사회이슈 중 중요하다고 생각되는 한가지를 선택하고 이에 관한 자신의 견해를 기술해 주시기 바랍니다.</h5><p className='ply'></p>
        <textarea
          name="content3"
          cols="115"
          rows="15"
          defaultValue={data.content3}
          onChange={onContent3Change}
        ></textarea><br /><br /><h5 className='ply'>4. 하고싶은 말을 자유롭게 기술해 주시기 바랍니다.</h5><p className='ply'></p>
        <textarea
          name="content4"
          cols="115"
          rows="15"
          defaultValue={data.content4}
          onChange={onContent4Change}
        ></textarea>

        <button className="btn btn-danger" onClick={() => postApply()}>제출하기</button>
      </div>
    );
  } else {
    return <div>지원자 ID와 일치하는 자기소개서가 없습니다.</div>
  }
}

export default ApplicationDetail;
