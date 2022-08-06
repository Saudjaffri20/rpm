import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';


// images
import logo from '../Assets/images/logo.png'
import user from '../Assets/images/user.png'



const Header = () => {

    const [dropMenu, setDropMenu] = useState(false);

    let navigate = useNavigate();

    const signout = () => {
        localStorage.removeItem('token');
        navigate("/");
    }



  return (
    <div className='top-header fixed z-50 w-full py-5 px-10 bg-white top-0 left-0 shadow-lg'>
        <ul>
          <li className='mr-auto'>
              <img src={logo}  alt='' />
          </li>
          <li>
            <Link to='/patients' className='text-md hover:text-blue-600 text-gray-500 font-semibold ease-in-out duration-300'>
              Patients
            </Link>
          </li>
          <li>
          <div className="relative inline-block text-left">
                    <div>
                        <button 
                            id="headlessui-menu-button-3" 
                            onClick={()=> setDropMenu(!dropMenu)} 
                            type="button" 
                            aria-haspopup="true" 
                            aria-expanded="false" 
                            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium"
                        >
                            <img className="avatar rounded-full h-10 w-10" src={user} alt="" />
                        </button>
                    </div>
                {
                    dropMenu && 
                    <div className="absolute right-0 w-44 mt-2 overflow-hidden origin-top-right bg-white rounded-md drop-shadow-md focus:outline-none">
                        <div className="">
                            {/* <button className="hover:bg-gray-500 hover:text-white text-gray-900 group flex  items-center w-full px-4 py-2 text-sm bg-white" id="headlessui-menu-item-5"> Settings </button> */}
                            <button 
                                className="hover:bg-gray-500 hover:text-white text-gray-900 group flex  items-center w-full px-4 py-2 text-sm bg-white" 
                                id="headlessui-menu-item-6" 
                                role="menuitem"
                                onClick={signout}
                            > 
                                Sign Out 
                            </button>
                        </div>
                    </div>
                }
                </div>
          </li>
        </ul>
      </div>
  )
}

export default Header