import React from 'react'
import "./PageSize.css"

const PageSize = ({pageHandleFun}) => {
  return (
    <select id="page-size" onChange={(e)=>{pageHandleFun(e.target.value)}}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
    </select>
  )
}

export default PageSize
