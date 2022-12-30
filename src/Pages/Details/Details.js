import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useLoaderData, useNavigate } from 'react-router-dom';
import DetailsCard from './DetailsCard';

const Details = () => {
    const detailsTask = useLoaderData()
    console.log(detailsTask,'linewwww');
    const navigate = useNavigate()

    const handelComplete = (event, id) => {
        event.preventDefault()
        fetch(`https://daily-task-server-morshed0099.vercel.app/complete/${id}`, {
            method: "PATCH",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ complete: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('task complete successfully')
                    navigate('/completetask');
                }
            });

    }
    return (
        <div className='max-w-[600px] mx-auto p-8 '>
            {
                detailsTask.map(task => <DetailsCard
                    key={task._id}
                    task={task}
                    handelComplete={handelComplete}
                ></DetailsCard>)
            }
        </div>
    );
};

export default Details;