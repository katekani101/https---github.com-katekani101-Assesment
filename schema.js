const axios = require("axios");
const { response } = require("express");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLSchema,
} = require("graphql");

const baseURL = "https://api.chucknorris.io/jokes/";

//Resolving all categories
const CategoryType = new GraphQLObjectType({
  name: "Category",
  fields: () => ({
    name: { type: GraphQLString },
  }),
});

//Resolving a random joke given a category
const JokesType = new GraphQLObjectType({
  name: "Random",
  fields: () => ({
    value: { type: GraphQLString },
  }),
});

//getting data
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    categories: {
      type: new GraphQLList(CategoryType),
      resolve(parent, args) {
        return axios
          .get(`${baseURL}categories`)
          .then((response) => response.data)
          .then((data) => data.map((name) => ({ name })));
      },
    },
    random: {
      type: JokesType,
      args: {
        category: { type: GraphQLString },
      },
      resolve(parent, args) {
        return axios
          .get(
            `${baseURL}random?category=${args.category}`
          )
          .then((response) => response.data);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
