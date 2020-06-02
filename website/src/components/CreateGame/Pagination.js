import React from 'react'
import {withStyles} from '@material-ui/core'
import Pagination from '@material-ui/lab/Pagination';

const Pagina = ({postPerPage, totalPosts, paginate, classes}) => {
    let pageNumber = 1;

    for(let i = 2; i<= Math.ceil( totalPosts / postPerPage); i++) {
        pageNumber++ 
    }
    
    return(
        <div className={classes.pagination} >
            <Pagination count={pageNumber} variant="outlined" onChange={(e, page) => paginate(page)} />
        </div>
    )
}
const styles =  {
    pagination: {
        margin: '1rem 0'
    }
}


export default withStyles(styles)(Pagina)