
import React from 'react';
import { useQuery } from 'react-query';
import AllTask from './AllTask';

const Home = () => {
    const { data: allTaks = [], refetch } = useQuery({
        queryKey: ['allTaks'],
        queryFn: async () => {
            const res = await fetch('https://daily-task-server-one.vercel.app/allTaks')
            const data = await res.json()
            return data
        }
    })
    console.log(allTaks);
    return (
        <div>
            <h2 className='text-3xl font-bold text-center mt-6 mb-3'>All Task</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4  p-4 mx-4'>
                {
                    allTaks.map(task => <AllTask
                        key={task._id}
                        task={task}
                    ></AllTask>)
                }
            </div>
        </div>
    );
};

export default Home;