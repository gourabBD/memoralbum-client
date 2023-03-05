import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import signature from "../../signature.png"

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
        .then(() => { })
        .catch(err => console.log(err));
}
    return (
        <div>
      <div className="navbar bg-base-100">
  <div className="flex-1">
    <Link to={"/"} className="btn btn-ghost normal-case text-xl">
        <img className='h-10' src={signature} alt="" />
    </Link>
  </div>

  <div className="flex justify-between gap-2">
  <div className='lg:block md:block hidden  mr-5'>
        {
          user?.uid? <p>{user?.displayName}</p> :<></>
        }
       </div>
    <div className="dropdown dropdown-end">
     {user?.uid? <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
       {user?.photoURL?<div>
       
        <img alt='' src={user?.photoURL} />
       </div>: <img alt='' src="https://i.ibb.co/pZSrPm0/Inked2-LI.jpg" />}
      
        </div>
      </label>:<></>}
      <ul tabIndex={0} className="mt-3 mb-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
       
      <div className='lg:hidden md:hidden block  mr-5'>
        {
          user?.uid? <p>{user?.displayName}</p> :<></>
        }
       </div>
       {user?.uid ? <li onClick={handleLogOut} className='btn btn-ghost'>Logout</li>:<><p className='text-lg text-red-600'>LogIn First!</p></>}
      </ul>
    </div>
    
  </div>
</div>
        </div>
    );
};

export default Navbar;