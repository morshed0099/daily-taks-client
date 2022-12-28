import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import img from '../../Images/107723-logindvdvd.gif'
import google from '../../Images/google.png'
import github from '../../Images/github.png'
import { userAuth } from '../../AuthProvider';
import { toast } from 'react-hot-toast';

const Login = () => {

  const location=useLocation()
  const navigate=useNavigate()
  let from = location.state?.from?.pathname || "/"
const {loginWithEmail,createUserGoogle,createUserGithub}=useContext(userAuth)
  const handelSubmit=(event)=>{
    event.preventDefault()
    const form=event.target;
    const email=form.email.value;
    const password=form.password.value;
    loginWithEmail(email,password)
    .then(result=>{
      const user=result.user
      toast.success('login succecfully')
      form.reset()
      navigate(from, { replace: true });
    }).catch(error=>{
      toast.error(error.message);
    })

  }
  const handelGoogle=()=>{
    createUserGoogle()
       .then(result=>{
        const user=result.user
        toast.success('user login successfully')
        navigate(from, { replace: true });
       }).catch(error=>{
        toast.error(error.message)
       })
  }
  const handelGithub=()=>{
    createUserGithub()
    .then(result=>{
      const user=result.user
        toast.success('login successfully')
        navigate(from, { replace: true });

    }).catch(error=>{
      toast.error(error.message);
    })
  }
  return (
    <div className='mx-5 mb-4 mt-4 p-0 md:p-8'>
      <div className="hero rounded-2xl shadow-2xl">
        <div className="hero-content  md:flex-row-reverse">
          <div className="text-center w-full hidden md:block">

            <img className='' src={img} alt="" />

          </div>

          <div className=" w-96 -ml-[15px]  md:w-full">
            <h1 className='font-bold text-2xl  mt-3 mb-1 text-center'>Please Login First</h1>
            <form onSubmit={handelSubmit}>
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input name='email' type="text" placeholder="email" className="input input-bordered" />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input type="text" name='password' placeholder="password" className="input input-bordered" />
                  <label className="label">
                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                  </label>
                </div>
                <div className="form-control mt-6">
                  <button className="btn btn-primary">Login</button>
                </div>
              </div>
            </form>

            <div className="divider mx-8 -mt-[10px]">OR</div>
            <div className='flex justify-center '>
              <button onClick={handelGithub} className='mr-2'> <img src={github} className='h-6 w-6' alt="" /></button>
              <button onClick={handelGoogle}> <img src={google} className='h-6 w-6' alt="" /></button>
            </div>
            <div className='ml-8 mt-3 '>
              Are You New ? <Link to='/signup'><span className='text-orange-600 text-1xl font-bold'>SignUp</span></Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;