
import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { userAuth } from '../../AuthProvider';


const SignUp = () => {
    const { createUserEmail ,updateUserInfo,setLoader,loader} = useContext(userAuth);
      const location =useLocation()
      const navigate=useNavigate()
    const from =location.state?.from?.pathname || '/'
    const handelSubmit=(event)=>{
        setLoader(true);
         event.preventDefault()
        const form=event.target
        const email=form.email.value;
        const displayName=form.name.value;
        const password=form.password.value;
        const image=form.image.files[0];
        const formData= new FormData();
        formData.append('image', image);
        
       console.log(formData);       
       const url =`https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_KEY}`
       fetch(url,{
        method:"POST",
        body:formData,
       })
       .then(res=>res.json())
       .then(data=>{
        const photoURL=data.data.display_url        
        const userUpdateData = {
            displayName: displayName,
            photoURL: photoURL,

        }
        createUserEmail(email,password)
        .then(result=>{
            const user=result.user;
            updateUserInfo(userUpdateData)
            .then(()=>{
                createUser(form,displayName,photoURL,email,password)
            })
            .catch(error=>{
                console.error(error)
                toast.error(error.message);
            })
        })
        .catch(error=>{
            console.error(error)
            toast.error(error.message);
        })
       })
 
    }

    const createUser=(form,name,photoURL,email,password)=>{
        const user ={
            email,
            name,
            password,
            photoURL
        }
        console.log(email,name,password,photoURL);
        fetch('https://daily-task-server-morshed0099.vercel.app/users',{
            method:"Post",
            headers:{"content-type":"application/json"},
            body:JSON.stringify(user)
        }).then(res=>res.json()).then(data=>{
            if(data.acknowledged){
                toast.success('user create sunccesfully')
                form.reset()
                setLoader(false)
                navigate(from, { replace: true });
            }
        })
    }
    return (
        <div className='w-96 mx-auto mb-4 mt-4'>
            <div className="hero rounded-2xl shadow-2xl">
                <div className="hero-content  md:flex-row-reverse">

                    <div className=" w-96 -ml-[15px] mx-auto">
                        <h1 className='font-bold text-3xl  mt-3 mb-1 text-center'>SignUp</h1>
                        <form onSubmit={handelSubmit}>
                            <div className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Name</span>
                                    </label>
                                    <input required type="text" name='name' placeholder="Your Name" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Image</span>
                                    </label>
                                    <input required name='image' type="file" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span  className="label-text">Email</span>
                                    </label>
                                    <input name='email' required type="text" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span required className="label-text">Password</span>
                                    </label>
                                    <input name='password' type="text" placeholder="password" className="input input-bordered" />

                                </div>
                                <div className="form-control mt-6">
                                    <button className="btn btn-primary">{loader ? 'loading ...':'SignUp'}</button>
                                </div>
                            </div>
                        </form>
                        <div className='ml-8'>
                            Alredy Register ? <Link to='/login'><span className='text-orange-600 text-1xl font-bold'>Login</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;