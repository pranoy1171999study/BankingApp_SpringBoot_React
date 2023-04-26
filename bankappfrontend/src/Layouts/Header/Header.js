import React from 'react'
import "./Header.css"
const Header = ({inner}) => {
  return (
   <>
    <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <a className="navbar-brand " href="#">Bank Zone</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav" dangerouslySetInnerHTML={{__html: inner}}>
                
            </ul>
        </div>
        </nav>
    </header>
   </>
  )
}

export default Header
