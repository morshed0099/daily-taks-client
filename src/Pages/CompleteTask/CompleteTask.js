import { async } from '@firebase/util';
import React, { useContext } from 'react';
import { useQuery } from 'react-query';
import { userAuth } from '../../AuthProvider';
import CompleteTaskCard from './CompleteTaskCard';

const CompleteTask = () => {
    const { user } = useContext(userAuth);
    const { data: completeTsk = [],refetch,isFetching } = useQuery({
        queryKey: ['completeTsk'],
        queryFn: async () => {
            const res = await fetch(`https://daily-task-server-one.vercel.app/completetask/${user?.email}`)
            const data = res.json()
            return data;
        }
    })
   
    if (isFetching) {
        return <h1 className='text-2xl text-center text-blue-800'>loading</h1>
    }
    return (
        <div className='p-3 mx-8 my-4 shadow-2xl rounded-2xl'>

            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>
                                <h1>Image</h1>
                            </th>
                            <th>Title</th>
                            <th>AuthorEmail</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>

                        {
                            completeTsk?.length ===0 ?<p className='text-3xl text-blue-800 text-center'>no data found</p>:
                            completeTsk.map(task => <CompleteTaskCard
                                task={task}
                                key={task._id}
                                refetch={refetch}
                            ></CompleteTaskCard>)
                        }
                    </tbody>

                   

                </table>
            </div>


        </div>
    );
};

export default CompleteTask;