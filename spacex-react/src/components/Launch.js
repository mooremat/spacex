import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import Images from './Images';
import { Navbar } from './Navbar';
import { resolveFieldValueOrError } from 'graphql/execution/execute';

const LAUNCH_QUERY = gql`
  query LaunchQuery($flight_number: Int!) {
    launch(flight_number: $flight_number) {
      flight_number
      mission_name
      launch_year
      launch_success
      launch_date_local
      details
      rocket {
        rocket_id
        rocket_name
      }
      links {
        mission_patch_small
        youtube_id
        flickr_images
      }
    }
  }
`;

const getHeight = url => {
  return new Promise((res,rej) => {
    let img = new Image();
    img.onload = () => res(img.height)
    img.src = url;
  })
}

export class Launch extends Component {
  render() {
    let { flight_number } = this.props.match.params;
    flight_number = parseInt(flight_number);
    return (
      <Fragment>
        <Navbar />
        <Query query={LAUNCH_QUERY} variables={{ flight_number }}>
          {
            ({ loading, error, data }) => {
              if (loading) return <LoadingSpinner loading={loading} />
              if (error) console.log(error)

              const {
                mission_name,
                flight_number,
                launch_year,
                launch_succes,
                details,
                rocket: {
                  rocket_id,
                  rocket_name,
                  rocket_type
                },
                links: {
                  youtube_id,
                  flickr_images   
                }
              } = data.launch;              
              return (
                <>
                <div className="container mt-3">
                  <Link to="/" className="btn btn-success">Back</Link>
                  <h1 className="display-4 text-white-50 my-3">Mission: {mission_name}</h1>
                  <h6 className="text-white-50 font-weight-bold">Launch Number: {flight_number}</h6>
                  <h6 className="text-white-50 mb-3 font-weight-bold">Year: {launch_year}</h6>
                  <iframe
                    title={flight_number}
                    width="560"
                    height="315"
                    src={`https://youtube.com/embed/${youtube_id}`}
                    frameBorder="0"
                    allowFullScreen>
                  </iframe>
                  <p className="text-white-50 font-weight-bold mt-3" style={{ maxWidth: '960px' }}>Details: {details || 'None'}</p>
                </div>
                <br/>
                <div className="container">
                  <h1 className='text-white-50'>Image Gallery</h1>
                  {flickr_images.length !== 0 ? (
                    <div className="row">
                      {/* .sort( (a,b) => a.clientHeight - b.clientHeight) */}
                      {
                        flickr_images.map((image, index) => (
                          <Images  key={index} image={image} />
                        ))
                      }
                    </div>
                  ) : <p className="text-light">No images available.</p>
                  }
                </div>
                </>
              );
            }
          }
        </Query>
      </Fragment>
    )
  }
}

export default Launch;
