import React from 'react'
import { withStyles } from '@material-ui/core'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteGames from './Edit/FavoriteGames'


function TopGames(props) {
    const { classes } = props;
    return (
        <div>
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
        </div>
    )
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


export default withStyles(styles)(TopGames)