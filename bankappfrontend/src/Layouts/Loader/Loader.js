import React from 'react'
import "./Loader.css"
const Loader = ({active}) => {
    if(active){
        return (
            <div className="loader">
                
            </div>
          )
    }else{
        return (
            <div className="stop-loader">
                
            </div>
          )
    }
  
}

export default Loader
