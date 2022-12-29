import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, NavLink } from 'react-router-dom';
import { userAuth } from '../AuthProvider';

const Header = () => {
    const { user, logOut } = useContext(userAuth);
    const handelLogout = () => {
        logOut()
            .then(() => {
                toast.success('logout successfully ')
            }).catch(error => toast.error(error.message))
    }


    const menuItems = <>
        <NavLink to='/' className='mr-2'>Home</NavLink>
        <NavLink to='/addtask' className='mr-2'>Add Task</NavLink>
        <NavLink to='/mytask' className='mr-2'>My Task</NavLink>
        <NavLink to='/completetask' className='mr-2'>Complete Task</NavLink>
        {
            user?.email ? <>

                <button onClick={handelLogout}>LogOut</button>


            </> : <>

                <NavLink to='/login' className='mr-2'>Login</NavLink>
            </>
        }

    </>
    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                        <li className='mr-2'>{menuItems}</li>
                    </ul>
                </div>
                <Link to='/' className="btn btn-ghost normal-case text-xl">Daily task</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li>{menuItems}</li>
                </ul>
            </div>

        </div>
    );
};

export default Header;