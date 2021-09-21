import React from 'react';
import logo from '../Assets/logo.png';

export const Navbar = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-primary">
        <a href="https://spacex.com" className="navbar-brand">
          <img
            src={logo}
            alt="SpaceX"
            className="rounded"
          />
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#nav">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ml-auto">
            <div>
              <span className="text-white">Be notified when next launch occurs!</span>
              <form className="form-inline">
                <input className="form-control mr-sm-2" type="email" placeholder="Email" />
                <button className="btn btn-info my-2 my-sm-0" type="submit">Submit</button>
              </form>
            </div>
          </ul>
        </div>
      </nav>
    </div>
  )
}
