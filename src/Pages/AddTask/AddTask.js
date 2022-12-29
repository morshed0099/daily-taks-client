import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { userAuth } from '../../AuthProvider';

const AddTask = () => {

    const { user ,setLoader,loader} = useContext(userAuth);
    const userName = user?.displayName;
    const userEmail = user?.email;
    const userImage = user?.photoURL;
    const date=new Date()
    const author = {
        userName,
        userEmail,
        userImage,
    }
    const hadelTaskSubmit = (event) => {
        setLoader(true)
        event.preventDefault();
        const form = event.target;
        const title = form.taksName.value;
        const description = form.description.value;
        const image = form.image.files[0];
        const authorEmail = userEmail;

        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_KEY}`
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json())
            .then(data => {
                const imgaes = data.data.display_url

                const task={
                    title,
                    description,
                    authorEmail,
                    imgaes,
                    author,
                    date,
                    complete:false,
               
                }

                fetch('https://daily-task-server-one.vercel.app/tasks', {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(task)
                }).then(res=>res.json()).then(data=>{
                    if(data.acknowledged){
                        toast.success('task added succesfully');
                        setLoader(false)
                        form.reset();
                    }
                })
            })

    }
    return (
        <>  
             <h1 className='text-center text-3xl mt-3 mb-3 font-bold'> Add Task</h1>
            <form onSubmit={hadelTaskSubmit} className='mx-w-[1400px] mx-auto'>
                <div className='m-3 p-3 gap-3 mx-8 rounded-2xl  shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>

                    <div>
                        <label className="label">
                            <span className="label-text">Type Title Here</span>
                        </label>
                        <input name='taksName' type="text" placeholder="Taks Name" className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">Upload Image</span>
                        </label>
                        <input name='image' type="file" placeholder="Type here" className="border  w-full" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Write Description</span>
                        </label>
                        <textarea name='description' className="textarea w-full textarea-bordered" placeholder="Say details about your task"></textarea>

                        <button className='btn btn-sm btn-primary w-full'>{loader ?"please wait ...":"Save Taks"}</button>
                    </div>


                </div>
            </form>
        </>
    )
};

export default AddTask;