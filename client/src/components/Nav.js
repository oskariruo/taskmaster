import React from 'react';
import { Link } from 'react-router-dom';
import  { AppBar, Button, Text } from '@mui/material';
export default function Nav(){
    return (
        <AppBar position='static'>
            <Button>
                <Link to="/yesterday">Yesterday</Link>
            </Button>
            <Button>
                <Link to="/today">Today</Link>
            </Button>
            <Button>
                <Link to="/tomorrow">Tomorrow</Link>
            </Button>
        </AppBar>
    );
};