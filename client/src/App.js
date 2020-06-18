import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import axios from "axios";

import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import AddMovieForm from "./Movies/forms/AddMovieForm";
import UpdateMovieForm from "./Movies/forms/UpdateMovieForm";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  // console.log("Progress of movieList",movieList)
console.log(savedList)
  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => {
        
        setMovieList(res.data);
        
      })
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} getMovieList={getMovieList} />
      </Route>

      <Route path="/update-movie/:id">
      <UpdateMovieForm 
      setSavedList={setSavedList}
      getMovieList={getMovieList} 
      />
      </Route>

      <Route path="/add-movie">
        <AddMovieForm
          setMovieList={setMovieList}
        />
      </Route>
    </>
  );
};

export default App;