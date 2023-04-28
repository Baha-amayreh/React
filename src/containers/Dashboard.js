import React, { useEffect, useState } from 'react';
import PageRoutes from "./PageRoutes";
import Header from '../header/Header';
export default function Dashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
        // Check whether the admin is authenticated
        setIsAuthenticated(localStorage.getItem('authenticatedAdmin'));
    }, []);
    return (
        <>
            <div >
                {isAuthenticated ? <Header /> : null}
            </div>
            <div>
                <PageRoutes />
            </div>
        </>
    )

}