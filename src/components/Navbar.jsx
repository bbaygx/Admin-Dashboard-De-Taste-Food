import React,{useEffect} from 'react'
import{FaUserSecret} from '../utils'
import { useAuth } from '../auth/Auth'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getData } from '../api'
import {Link} from 'react-router-dom'
import {AiOutlinePlus} from '../utils'

const Navbar = () => {




  useEffect(()=>{
    
  },[])


  const navigate = useNavigate()
    const openSidebar = () => {
        window.document.getElementById('my-drawer-2').click()
    }

    const {logOut, currentUser} = useAuth()


    const handleLogOut = async () => {
        try{
            await logOut()
            localStorage.removeItem('user')
            navigate('/')
        } catch(err){
            console.log(err)
        }
    }

  return (
    <>
    <div className="navbar z-50 top-0 fixed bg-base-100 shadow-xl">
    <div className="flex-none">

  </div>
  <div className="flex-1">
    <a className="btn btn-ghost normal-case text-xl">Admin De Taste</a>
  </div>
  <div className="flex-none gap-2">

    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar ">
        <div className="">
          <FaUserSecret className='text-4xl text-gray-600 w-10 rounded-full'/>
        </div>
      </label>
      <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><Link to='/table'>Table</Link></li>
        <li onClick={handleLogOut}><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>

{/* <div className="mt-24 px-5">
  {
    isLoading ? <div className="alert">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <span>Loading .... (Karena Data Harus Diisi Minimal 1)</span>
  </div> : ""
  }
</div> */}

    </>
  )
}

export default Navbar