import React, { useContext, useState } from 'react';
import { useQuery } from 'react-query';
import { userAuth } from '../../AuthProvider';
import MyTaskeCard from '../../Shered/MyTaskeCard';


const MyTask = () => {
    const { user, loader, setLoader } = useContext(userAuth)
  
    const { data: myTask = [], refetch, isFetching } = useQuery({

        queryKey: ['myTaks'],
        queryFn: async () => {
            const res = await fetch(`https://daily-task-server-one.vercel.app/myTask?email=${user?.email}`)
            const data = await res.json()
            return data;
        }

    })

    if (isFetching) {
        return <h1 className='text-2xl text-center text-blue-800'>loading</h1>
    }
   

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mx-4'>
                {

                    myTask?.length === 0? <p className='text-3xl text-blue-800 text-center'>no data found</p>:
                    myTask.map(task => <MyTaskeCard
                        key={task._id}
                        task={task}
                        refetch={refetch}                    
                    ></MyTaskeCard>)
                }
            </div>
        
        </div>
    );
};

export default MyTask;