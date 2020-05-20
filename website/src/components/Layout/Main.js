import React from 'react';
import Grid from '@material-ui/core/Grid';
import NavBar from './NavBar';
import Footer from './Footer';
import Header from './Header'


const Main = ({ children }) => (
    <div style={{height: "100%"}}>
        <NavBar />
        <Header />
        <Grid container justify="center">
            <Grid item xs={12} sm={8} style={{ marginTop: 10 }}>
                {children}
            </Grid>
        </Grid>
        <Footer />
    </div>
);


export default Main;