import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper'


class SearchForm extends Component {
	constructor (props) {
		super(props)

		this.state = {
            searchTerm: "all"
        }

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange (event) {
		this.setState({ searchTerm: event.target.value });
	}

	handleSubmit (e) {
		const searchData = {
			text: e.target.value
		}

		if (e.key === 'Enter') {
			this.props.searchGames	(searchData, this.props.history)
		}
	}

	render () {
		const { classes } = this.props;
		const { searchTerm } = this.state;

		return (
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<div>
						<Grid container spacing={2} direction="row" className={classes.bgBlock}>
							<Grid item xs={7} sm={7} >
								<div className={classes.search}>
									<div className={classes.searchIcon}>
										<SearchIcon />
									</div>
									<div>
										<InputBase
											placeholder="Search games" 
											classes={{
												root: classes.inputRoot,
												input: classes.inputInput
											}}
											onKeyPress={this.handleSubmit}
										/>
									</div>
								</div>
							</Grid>
							<Grid item xs={5} sm={5} >
								<div>
									<div>
										<FormControl className={classes.formControl}>
											<InputLabel id="demo-simple-select-label">Search by : </InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={searchTerm}
												onChange={this.handleChange}
											>
												<MenuItem value={"all"}>All</MenuItem>
												<MenuItem value={"boardGameName"}>Board Games</MenuItem>
												<MenuItem value={"city"}>Cities</MenuItem>
												<MenuItem value={"playerName"}>Users</MenuItem>
											</Select>
										</FormControl>
									</div>
								</div>
							</Grid>
						</Grid>
					</div>
				</Paper>
			</div>
		)
	}
}


const styles = (theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: 10,
		marginTop: 10,
		background: "#F5F9FC"
	},
	bgBlock: {
		width: '100%',
		
	},
	search: {
		position: 'relative',
		borderRadius: theme.borderRadius,
		backgroundColor: fade(theme.palette.common.white, 0.15),
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		marginRight: theme.spacing.unit * 2,
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			marginLeft: theme.spacing.unit * 3,
			width: 'auto'
		}
	},
	searchIcon: {
		width: theme.spacing.unit * 9,
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit',
		width: '100%'
	},
	inputInput: {
		paddingTop: theme.spacing.unit,
		paddingRight: theme.spacing.unit,
		paddingBottom: theme.spacing.unit,
		paddingLeft: theme.spacing.unit * 10,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: 200
		}
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	}
})


export default connect(null, { })(withRouter(withStyles(styles)(SearchForm)))