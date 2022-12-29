import React from 'react';
import ReactTimeAgo from 'react-time-ago';

const AllTask = ({ task }) => {
    console.log(task);
    const { title, description, date, author, imgaes } = task
    const { userName, userEmail, userImage } = author
    return (
        <div className="card card-compact w-full shadow-xl">
            <figure><img src={imgaes} alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{description}</p>
                <p>Author:</p>
                <div className="avatar flex justify-start ">
                    <div className="w-14 h-14 mr-3 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <img alt='' src={userImage} />
                    </div>
                    <div>
                        <h4>{userName}</h4>
                        <p><ReactTimeAgo date={date} locale="en-US" timeStyle="facebook"/></p>
                    </div>
                </div>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">Details</button>
                </div>
            </div>
        </div>
    );
};

export default AllTask;