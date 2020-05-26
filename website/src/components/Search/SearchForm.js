import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';


class SearchForm extends Component {
	constructor(props) {
		super(props)

		this.state = {
			searchTerm: "all"
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({ searchTerm: event.target.value });
	}

	handleSubmit(e) {
		const searchData = {
            searchText: e.target.value,
            searchTerm: this.state.searchTerm
        }

		if (e.key === 'Enter') {
			this.props.searchingGame(searchData)
		}
	}

	render() {
		const { classes } = this.props;
		const { searchTerm } = this.state;

		return (
			<div className={classes.root}>
				<Grid container justify="center" alignItems="center" direction="row" className={classes.bgBlock} style={{ border: '1px solid white' }}>
					<Grid item xs={6} sm={5} >
						<div className={classes.search} >
							<div className={classes.searchIcon} >
								<SearchIcon />
							</div>
							<div>
								<InputBase
									variant="outlined"
									placeholder="Search games"
									classes={{
										root: classes.inputRoot,
										input: classes.inputInput
									}}
									style={{ height: 55, border: '1px solid #C4C4C4', borderRadius: 4 }}
									onKeyPress={this.handleSubmit}
								/>
							</div>
						</div>
					</Grid>
					<Grid item xs={3} sm={2} md={1} >
						<div >

							<FormControl className={classes.formControl} >
								{/* <InputLabel >Search by : </InputLabel> */}
								<Select
									className={classes.selector}
									value={searchTerm}
									onChange={this.handleChange}
									variant="outlined"
								>
									<MenuItem value={"all"}>All</MenuItem>
									<MenuItem value={"boardGameName"}>Games</MenuItem>
									<MenuItem value={"city"}>Cities</MenuItem>
									<MenuItem value={"playerName"}>Users</MenuItem>
								</Select>
							</FormControl>
						</div>
					</Grid>
				</Grid>
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
		// background: "#F5F9FC"
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
		width: '100%',
		// [theme.breakpoints.up('sm')]: {
		// 	marginLeft: theme.spacing.unit * 3,
		// 	width: 'auto'
		// }
	},
	searchIcon: {
		width: theme.spacing.unit * 5,
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
		paddingLeft: theme.spacing.unit * 7,
		transition: theme.transitions.create('width'),
		width: '100%',
		// [theme.breakpoints.up('md')]: {
		// 	width: 200
		// }
	},
	formControl: {
		margin: theme.spacing(2),
		// minWidth: 120,
	},

})


export default connect(null, {})(withRouter(withStyles(styles)(SearchForm)))