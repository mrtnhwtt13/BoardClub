import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';


class City extends Component {
    render () {
        const {city, classes} = this.props

        return (
            <div className={classes.root}>
                <Link onClick={() => this.props.selectCity(city.city, city.code)} >
                    <p className={classes.city}>{city.city} ({city.code})</p>                
                </Link>
            </div>
        )
    }
}

const styles = {
    root: {
        width: '100%',
    }, 
    city: {
        color: '#595959',
        display: 'flex',
        justifyContent: 'left',
        textAlign: 'left',
        paddingLeft: 50
    }
}


export default withStyles(styles)(City);