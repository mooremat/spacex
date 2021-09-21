import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

export const LaunchItem = ({ launch }) => {
  const {
    flight_number,
    mission_name,
    launch_date_local,
    launch_success,
    upcoming,
    links: {
      mission_patch_small
    }
  } = launch;
  return (
      <div className="col-sm-6 col-md-4 col-lg-3 my-3">
        <div className="card card-border card-tone" style={{display: upcoming && 'none'}}>
          <Link to={`/launch/${flight_number}`}> 
            <img src={mission_patch_small} className="card-img-top px-3 pt-3" alt="" />
          </Link>
          <div className="card-body">
            <h5 className="card-title">{mission_name}</h5>
            <h6 className="card-text">Date: <Moment format="YYYY-MM-DD HH:mm">{launch_date_local}</Moment></h6>
            <h6 className="card-text">Successful: {launch_success ? 'Yes' : 'No'}</h6>
            <Link to={`/launch/${flight_number}`} className="btn btn-info mt-2">Learn More</Link>
          </div>
        </div>
      </div>
  )
}

export default LaunchItem;