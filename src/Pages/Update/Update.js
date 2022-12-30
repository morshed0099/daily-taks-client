import React from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData } from 'react-router-dom';

const Update = () => {
    const task = useLoaderData()
    const { title, description, imgaes, _id } = task
    console.log(task, 'linke');
    const handelUpdate = (event) => {

        event.preventDefault();
        const form = event.target;
        const upTitle = form.taksName.value;
        const upDescription = form.description.value;
        const image = form.image.files[0];


        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${process.env.REACT_APP_KEY}`
        fetch(url, {
            method: "POST",
            body: formData,
        }).then(res => res.json())
            .then(data => {
                const upImgaes = data.data.display_url

                const updateTask = {
                    upTitle,
                    upDescription,
                    upImgaes,

                }

                fetch(`https://daily-task-server-morshed0099.vercel.app/tasks/${_id}`, {
                    method: "PATCH",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify(updateTask)
                }).then(res => res.json()).then(data => {
                    if (data.modifiedCount > 0) {
                        toast.success("updated successfully");
                    }
                })
            })

    }
    return (
        <>
            <h1 className='text-center text-3xl  mt-3 mb-3 font-bold'>Task Update Here</h1>
            <form onSubmit={handelUpdate} className='mx-w-[1240px] p-8 mx-auto'>
                <div className='m-3 p-3 gap-3  rounded-2xl max-w-[800px] mx-auto shadow-2xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2'>

                    <div>
                        <label className="label">
                            <span className="label-text">Title</span>
                        </label>
                        <input defaultValue={title} name='taksName' type="text" placeholder="Taks Name" className="input input-bordered w-full" />
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input name='image' type="file" placeholder="Type here" className="border  w-full" />
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <textarea defaultValue={description} name='description' className="textarea w-full textarea-bordered" placeholder="Say details about your task"></textarea>

                        <button className='btn btn-sm btn-primary w-full'>Update</button>
                    </div>
                </div>
            </form>
        </>
    );
};

export default Update;