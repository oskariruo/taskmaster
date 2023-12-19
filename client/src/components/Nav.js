import React from 'react';
import { Link } from 'react-router-dom';

export default function Nav(){
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/yesterday">Yesterday</Link>
                </li>
                <li>
                    <Link to="/today">Today</Link>
                </li>
                <li>
                    <Link to="/tomorrow">Tomorrow</Link>
                </li>
            </ul>
        </nav>
    );
};