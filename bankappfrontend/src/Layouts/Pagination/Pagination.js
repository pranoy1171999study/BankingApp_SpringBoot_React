import React from 'react'
import "./Pagination.css";


const Pagination = ({data}) => {

function pgoLeft(){
  data.page.fun.goLeft();
}
function pgoRight(){
  data.page.fun.goRight();
}

  return (
    <div id="pagination-container">
        <div className="lr" onClick={pgoLeft}>&lt;</div>
        <div className='count'>{data.page.current+1}/{data.page.total}</div>
        <div className="lr" onClick={pgoRight} >&gt;</div>
    </div>
  )
}

export default Pagination
