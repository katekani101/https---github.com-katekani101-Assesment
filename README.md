# Param_ChuckNorris_App

An interactive GraphQL wrapper for the https://chucknorris.io API

Developed in VSCode

## Usage
To run locally 

Run command `npm run dev` on your VSCode console to run both the apollo graphql sever and the App

### Queries

Retrieve a list of available categories

```
{
  categories {
	name
  }
}
```

Retrieve a random Chuck Norris joke from one of the available categories

```
{
  random(category: "dev") {
	value
  }
}
