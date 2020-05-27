import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Paper, Grid, Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'



class Card extends Component {

    render () {
        const {classes, user} = this.props  
        let userPicture = null
        let userName = null  

        if(user.avatar != ''){
            userPicture = (
                <img className={classes.image} src={user.avatar} height="100" />
            )
            } else {
                userPicture = (
                    <img className={classes.image} src='https://i.imgur.com/wPNa9Vj.jpg' height="100" />
                )
            }
        
        userName = (
            <span className={classes.name}> {user.login} </span>
        )

        return (
            <div className={classes.root}>
                <Link to={`/profile/${user._id}`}>
                <Paper className={classes.paper}>
                    <div>
                    <Grid container spacing={2} direction="row" className={classes.bgBlock}>
                    <Grid item>    
                        {userPicture}
                    </Grid> 
                    <Grid item xs={7} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                        <Typography gutterBottom variant="subtitle1">
                        <div className={classes.name}>{userName}</div>
                        </Typography>
                    </Grid>
                    </Grid> 
                    </Grid>
                    </Grid>
                    </div>
                </Paper>
                </Link>
            </div>
        )
    }
}

const styles = {
root: {
    flexGrow: 1,
},
paper: {
    padding: 10,
    marginTop: 10
},
bgBlock: {
    width: '100%',    
},
name: {
    color: '#595959',
    fontSize: '2rem',
    marginTop: "20px",
    marginBottom: "0px",
},
image: {
        borderRadius: 5,
        overflow: "hidden",
    }
}



export default (withStyles(styles)(Card));