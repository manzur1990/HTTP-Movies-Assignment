import React, {useState} from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddMovieForm = ({setMovieList}) => {
  const { push } = useHistory();
  const [newMovie, setNewMovie] = useState({
    id: Date.now(),
    title: "",
    director: "",
    metascore: "",
    stars: [],
  });


  const addMovieSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/api/movies", {...newMovie})
      .then((res) => setMovieList(res.data))
      .catch((err) => {
        console.log(err);
      });
      push(`/`);
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

    setNewMovie({
      ...newMovie,
      [e.target.name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={addMovieSubmit}>
        <input
          type="text"
          name="title"
          onChange={handleChange}
          value={newMovie.title}
          placeholder="Title"
        />
        <br />
        <input
          type="text"
          name="director"
          onChange={handleChange}
          value={newMovie.director}
          placeholder="Director"
        />
        <br />
        <input
          type="text"
          name="metascore"
          onChange={handleChange}
          value={newMovie.metascore}
          placeholder="Metascore"
        />
        <br />
        <input
          type="text"
          name="star"
          onChange={handleChange}
          placeholder="Stars"
        />
        <br />
        <input type="submit" />
      </form>
    </div>
  );
};

export default AddMovieForm;