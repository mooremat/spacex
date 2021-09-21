const axios = require('axios');
const BaseURL = 'https://api.spacexdata.com/v3/launches';

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLList,
  GraphQLSchema
} = require('graphql');

const LaunchType = new GraphQLObjectType({
  name: 'Launch',
  fields: () => ({
    flight_number: { type: GraphQLInt },
    mission_name: { type: GraphQLString },
    launch_year: { type: GraphQLString },
    launch_date_local: { type: GraphQLString },
    launch_success: { type: GraphQLBoolean },
    upcoming: { type: GraphQLBoolean },
    details: { type: GraphQLString },
    rocket: { type: RocketType },
    links: { type: LinkType }
  })
});

const RocketType = new GraphQLObjectType({
  name: 'Rocket',
  fields: () => ({
    rocket_id: { type: GraphQLString },
    rocket_name: { type: GraphQLString },
    rocket_type: { type: GraphQLString },
  })
});

const LinkType = new GraphQLObjectType({
  name: 'Links',
  fields: () => ({
    mission_patch_small: { type: GraphQLString },
    youtube_id: { type: GraphQLString },
    flickr_images: { type: new GraphQLList(GraphQLString) }
  })
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    launches: {
      type: new GraphQLList(LaunchType),
      resolve(parent, args) {
        return axios
          .get(`${BaseURL}`)
          .then(res => res.data);
      }
    },
    launch: {
      type: LaunchType,
      args: {
        flight_number: { type: GraphQLInt }
      },
      resolve(parent, args) {
        return axios
          .get(`${BaseURL}/${args.flight_number}`)
          .then(res => res.data);
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});
