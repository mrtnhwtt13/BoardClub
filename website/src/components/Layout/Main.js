import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Footer from './Footer';


const Main = ({ children }) => (
    <div>
        <NavBar />
        <Grid container justify="center">
            <Grid item xs={12} sm={6} style={{ marginTop: 30 }}>
                {children}
            </Grid>
        </Grid>
        <div>
            <Footer />
        </div>
    </div>
);


export default Main;