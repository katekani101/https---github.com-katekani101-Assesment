import React from "react";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

// Create GraphQL queries

const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

const GET_JOKE = gql`
  query Joke($category: String) {
    random(category: $category) {
      value
    }
  }
`;

function Categories({ onCategorySelected }) {
  const { loading, error, data } = useQuery(GET_CATEGORIES);
  if (loading) return <h1>Loading....</h1>;
  if (error) return `Error! ${error.message}`;

  return (
    <div className="joke">
      <div className="container">
        <div className="card">
          <div className="card-header">
            <h5>
              {" "}
              Select Below Chuck Norris Joke Category to See Related Jokes
            </h5>
          </div>
          <div className="jokeCategory">
          <select name="category" onChange={onCategorySelected}>
            {data.categories.map((category, id) => (
              <option className="name" key={id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function Random({ category }) {
  const { loading, error, data, refetch, networkStatus } = useQuery(GET_JOKE, {
    variables: { category },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 4) return <h1>Loading....</h1>;
  if (loading) return <h1>Loading....</h1>;
  if (error) return `${error}`;
  console.log(data.random.value);

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h3> HERE IS THE JOKE</h3>
        </div>
        <div className="result">
          <p>{data.random.value}</p>
        </div>
      </div>
      <button className="btn2" type="button" onClick={() => refetch()}>
        Refresh
      </button>
    </div>
  );
}

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: "animal" };
  }

  onCategorySelected = ({ target }) => {
    this.setState(() => ({ selectedCategory: target.value }));
  };

  render() {
    return (
      <div className="generator">
        <div>
          <Categories onCategorySelected={this.onCategorySelected} />
        </div>
        <div>
          {this.state.selectedCategory && (
            <Random category={this.state.selectedCategory} />
          )}
        </div>
      </div>
    );
  }
}

export default Joke;
