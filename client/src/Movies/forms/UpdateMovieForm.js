import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function UpdateMovieForm({getMovieList}){
  const { push } = useHistory();

  const { id } = useParams();

  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });

  const onSubmit = (e) => {
    axios.put(`http://localhost:5000/api/movies/${id}`, movie)
    push(`/movies/${movie.id}`);
  };

  const handleChange = (e) => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "stars") {
      value = value.split(",");
    }
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }

    setMovie({
      ...movie,
      [e.target.name]: value,
    });
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/api/movies/${id}`).then((res) => {
      setMovie(res.data);
    });
  }, [id]);

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={movie.title}
        />
        
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={movie.director}
        />
        
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          value={movie.metascore}
        />
   
        <input
          type="text"
          name="star"
          onChange={handleChange}
          value={movie.stars}
        />
        
        <input type="submit" />
      </form>
    </div>
  );
};

