import React from 'react'
import Pagination from '@material-ui/lab/Pagination';

const Pagina = ({postPerPage, totalPosts, paginate}) => {
    let pageNumber = 1;

    for(let i = 2; i<= Math.ceil( totalPosts / postPerPage); i++) {
        pageNumber++ 
    }
    
    return(
        <div >
            <Pagination count={pageNumber} variant="outlined" onChange={(e, page) => paginate(page)} />
        </div>
    )
}



export default Pagina