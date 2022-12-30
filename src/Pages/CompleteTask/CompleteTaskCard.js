import React from 'react';
import { toast } from 'react-hot-toast';

const CompleteTaskCard = ({ task, refetch }) => {
    const { imgaes, authorEmail, title, _id } = task
    const handelDelete = (e, id) => {
        const yes = window.confirm('are you sure delete')
        e.preventDefault();
        if (yes) {
            fetch(`https://daily-task-server-one.vercel.app/completetask/${id}`, {
                method: "DELETE",
                headers: { "content-type": "application/json" },
            }).then(res => res.json()).then(data => {                
                if (data.deletedCount > 0) {
                    toast.success('delete succesfully')
                    refetch();
                }

            })
        }
    }

    const handelIncomplete=(e,id)=>{
        e.preventDefault();
        fetch(`https://daily-task-server-one.vercel.app/incomplete/${id}`,{
            method:"PATCH",
            headers:{"content-type":"application/json"},
            body:JSON.stringify()
        }).then(res=>res.json()).then(data=>{
            console.log(data);
            if(data.modifiedCount>0){
                toast.success('incomplete update successfully');
                refetch();
            }
           
        })
    }
    return (
        <>
            <tr>

                <td>
                    <div className="flex items-center space-x-3">
                        <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                                <img src={imgaes} alt="Avatar Tailwind CSS Component" />
                            </div>
                        </div>

                    </div>
                </td>
                <td>
                    <h1>{title}</h1>
                </td>
                <td>
                    <h1>{authorEmail}</h1>
                </td>
                <td>
                    <button onClick={(e) => handelDelete(e, _id)} className='btn btn-sm btn-primary mr-2'>Delete</button>
                    <button onClick={(e)=>handelIncomplete(e,_id)} className='btn btn-sm btn-success'>Incmplete</button>
                </td>

            </tr>
        </>
    );
};

export default CompleteTaskCard;