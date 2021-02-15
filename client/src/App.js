import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import GetJokes from "./components/GetJokes";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import "./components/MyCss.css";

const cache = new InMemoryCache();

const client = new ApolloClient({
  cache: cache,
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>  
      <Navbar />
      <GetJokes />
    </ApolloProvider>
  );
}

export default App;
