import React from'react'
import { Paper, withStyles } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import FavoriteGames from './FavoriteGames'
import SearchGames from './SearchGames'
import { connect } from 'react-redux';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


class EditTopGames extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            errors: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }

    render(){
        const { classes } = this.props;
        const { errors } = this.state;

        return (
            <div className={classes.root}>
                <Paper style={{ padding: 15 }}>
                    {errors.update ?
                        <Alert elevation={0} severity="success">
                            {errors.update}
                        </Alert> :
                        ''
                    } 
                    {errors.already ?
                        <Alert elevation={0} severity="info">
                            {errors.already}
                        </Alert> :
                        ''
                    } 
                    <ExpansionPanel style={{ borderRadius: 4, marginBottom: 60, marginTop: 40 }}>
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            // aria-controls="panel1a-content"
                            // id="panel1a-header"                            
                        >
                            <Typography className={classes.heading}>See your favorite board games</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails >
                            <div style={{ width: '1000px', margin: '0 auto' }}>
                                <FavoriteGames />
                            </div>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>                        
                    <div>
                        <SearchGames />
                    </div>
                </Paper>
            </div>
        )
    }
}


const styles = {
    root: {
        width: '100%',
    },
      heading: {
        fontSize: "15",
        color: "#595959"
    }
}


const mapStateToProps = (state) => ({
    errors: state.errors
})


export default connect(mapStateToProps)(withRouter(withStyles(styles)(EditTopGames)));