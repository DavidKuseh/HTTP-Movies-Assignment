import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialMovie = {
    title : '',
    director : '',
    metascore : '',
    stars : ''
}

const UpdateMovieForm = (props) => {
    const { match, movies } = props;

    const [ movie, setMovie ] = useState(initialMovie);

    useEffect(() => {
        const id = match.params.id;
        const editMovie = movies.find(movie => `${movie.id}` === id);
        if (editMovie) {
            setMovie(editMovie);
        }
    },[match, movies]);

    const handleChange = e => {
        setMovie({...movie, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(() => {
            props.history.push(`/movies/${movie.id}`);
            setMovie(initialMovie);
        })
        .catch(err => console.log(err))

    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>Title</label>
                <input 
                    type="text"
                    name="title" 
                    placeholder="title"
                    value={movie.title}
                    onChange={handleChange}
                />
                 <label>Director</label>
                <input 
                    type="text"
                    name="director" 
                    placeholder="director"
                    value={movie.director}
                    onChange={handleChange}
                />
                 <label>Metascore</label>
                <input 
                    type="text"
                    name="metascore" 
                    placeholder="metascore"
                    value={movie.metascore}
                    onChange={handleChange}
                />
                 <label>Actors</label>
                <input 
                    type="text"
                    name="stars" 
                    placeholder="stars"
                    value={movie.stars}
                    onChange={handleChange}
                />
                <button>Update</button>
            </form>
        </div>
    )
}

export default UpdateMovieForm;

