import React from 'react';
import { Link } from 'react-router-dom';
import ReactTimeAgo from 'react-time-ago';

const DetailsCard = ({ task,handelComplete}) => {

    const { title, description, date, author, imgaes, _id } = task
    const { userName, userEmail, userImage } = author
    return (
        <div className="card W-96 card-compact  shadow-xl">
            <figure><img src={imgaes} alt="" /></figure>
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
                    <p><ReactTimeAgo date={date} locale="en-US" timeStyle="facebook" /></p>
                </div>
                </div>

                <div className="card-actions justify-end">
                    <button onClick={(event) => handelComplete(event, _id)} className="btn btn-primary btn-sm">Complete</button>
                    <Link to={`/task/${_id}`}> <button className="btn btn-primary btn-sm">Edit</button></Link>

                </div>
            </div>
        </div>
    );
};

export default DetailsCard;