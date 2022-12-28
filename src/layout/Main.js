import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../Shered/Footer';
import Header from '../Shered/Header';

const Main = () => {
    return (
        <div>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;