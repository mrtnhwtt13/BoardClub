import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ListGames from './ListGames';
import ListNearestGames from './ListNearestGames'



function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}


TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};


function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    'aria-controls': `scrollable-force-tabpanel-${index}`,
  };
}


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  title: {
    color: '#595959',
    display: 'flex',
    justifyContent: 'center'
  }, 
  
}));


export default function Homepage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <h1 className={classes.title}>UPCOMING GAMES</h1>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        variant="scrollable"
        fullWidth={true}
        centered
        scrollButtons="on"
        aria-label="scrollable auto tabs example"
      >
        <Tab label="All games" {...a11yProps(0)} />
        <Tab label="Friends' games" {...a11yProps(1)} />
        <Tab label="Favorite games" {...a11yProps(1)} />
        <Tab label="Nearest games" {...a11yProps(1)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        < ListGames selection="all" />
      </TabPanel>
      <TabPanel value={value} index={1}>
        < ListGames selection="friends" />
      </TabPanel>
      <TabPanel value={value} index={2}>
        < ListGames selection="favorite" />
      </TabPanel>
      <TabPanel value={value} index={3}>
        < ListNearestGames />
      </TabPanel>
    </div>


  );
}