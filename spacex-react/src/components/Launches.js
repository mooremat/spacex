import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import LaunchItem from './LaunchItem';
import LandingPage from './LandingPage';
import SearchBar from './SearchBar';
import LoadingSpinner from './LoadingSpinner';

const LAUNCHES_QUERY = gql`
 query LaunchesQuery {
   launches {
     flight_number
     mission_name
     launch_date_local
     launch_success
     upcoming
     links {
       mission_patch_small
     }
   }
 }
`;

export class Launches extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
      search: ''
    }
  }

  onChange = event => this.setState({ search: event.target.value });

  render() {
    return (
      <Fragment>
        <LandingPage />
        <div className="launches">
          <div className="container">
            {/* <SearchBar onChange={this.onChange} /> */}
            <div className="container-fluid">
              <Query query={LAUNCHES_QUERY}>
                {
                  ({ loading, error, data }) => {
                    if (loading) return <LoadingSpinner loading={loading} />
                    if (error) console.log(error);

                    const { search } = this.state;
                    const filteredLaunch = data.launches.filter(launch => {
                      return launch.mission_name.toLowerCase().includes(search.toLowerCase()) ||
                            launch.launch_date_local.includes(search)
                    })
                    return (
                      <div className="row">
                        {
                          filteredLaunch.filter(launch => !launch.upcoming)
                            .map(launch => (
                              <LaunchItem key={launch.flight_number} launch={launch} />
                            ))
                        }
                      </div>
                    )
                  }
                }
              </Query>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default Launches;
