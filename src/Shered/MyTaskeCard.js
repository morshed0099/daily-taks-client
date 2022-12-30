import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';


const MyTaskeCard = ({ task }) => {


    const { title, imgaes, _id } = task

    return (
        <div className="card card-compact w-full shadow-xl">
            <figure><img src={imgaes} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <div className="card-actions justify-end">
                </div>
            </div>
            <Link to={`/details/${_id}`}> <button className="btn mt-2 mb-2 px-2 w-full btn-primary btn-sm">Details</button></Link>
        </div>
    );
};

export default MyTaskeCard;