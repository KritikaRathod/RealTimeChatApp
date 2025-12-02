import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverurl } from '../main';

function SignUp() {
  let navigate = useNavigate();
  let [show, setshow] = useState(false);
  let [userName, setuserName] = useState("");
  let [userEmail, setuserEmail] = useState("");
  let [password, setpassword] = useState("");

  const handlesignup = async (e) => {
    e.preventDefault();
    try {
      let result = await axios.post(
        `${serverurl}/api/auth/signup`,
        {
          userName,
          email: userEmail,
          password
        },
        { withCredentials: true }
      );
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="w-full h-[100vh] bg-slate-200 flex items-center justify-center">
      <div className='w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>

        <div className='w-full h-[200px] bg-[#19cdff] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
          <h1 className='text-gray-600 font-bold text-[30px]'>
            welcome to <span className='text-white'>ConnectHub</span>
          </h1>
        </div>

        <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handlesignup}>

          <input
            type="text"
            placeholder='userName'
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'
            onChange={(e) => setuserName(e.target.value)}
            value={userName}
          />

          <input
            type="email"
            placeholder='userEmail'
            className='w-[90%] h-[50px] outline-none border-2 border-[#20c7ff] px-[20px] py-[10px] bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]'
            onChange={(e) => setuserEmail(e.target.value)}
            value={userEmail}
          />

          <div className='w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
            <input
              type={show ? "text" : "password"}
              placeholder='password'
              className='w-[90%] h-[50px] outline-none px-[20px] py-[10px] bg-white text-gray-700 text-[19px]'
              onChange={(e) => setpassword(e.target.value)}
              value={password}
            />
            <span
              className='absolute top-[9px] right-[20px] text-[19px] text-[#20c7ff] font-semibold cursor-pointer'
              onClick={() => setshow(prev => !prev)}
            >
              {show ? "hidden" : "show"}
            </span>
          </div>

          <button className='p-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-200 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner'>
            signup
          </button>

          <p className='cursor-pointer' onClick={() => navigate("/login")}>
            Already Have An Account ? <span className='text-[#20c7ff] font-bold'>Login</span>
          </p>

        </form>
      </div>
    </div>
  )
}

export default SignUp;
