import { useEffect } from "react";
import { REACT_APP_API_KEY } from "../config/config";

const GenresSeries = ({
    selectedGenres,
    setSelectedGenres,
    genres,
    setGenres,
    type,
}) => {

    const fetchGenres = async () => {
        const GTV_API_URL = `https://api.themoviedb.org/3/genre/tv/list?api_key=${REACT_APP_API_KEY}&language=en-US`;

        await fetch(GTV_API_URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setGenres(data.genres);
            });
    }

    useEffect(() => {
        fetchGenres()

        return () => {
            setGenres()
        };
        // eslint-disable-next-line
    }, []);

    const addChip = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
        setGenres(genres.filter(g => g.id !== genre.id));
    }

    const removeChip = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
    }

    return (

        <div style={{ padding: '10px' }}>
            {selectedGenres && selectedGenres.map((genre) => (
                <Chip label={genre.name}
                    style={{ margin: '4px' }}
                    size={"small"}
                    color="primary"
                    key={genre.id}
                    clickable
                    onDelete={() => removeChip(genre)}
                />
            ))}
            {genres && genres.map((genre) => (
                <Chip label={genre.name}
                    style={{ margin: '4px', color: 'black', backgroundColor: 'aliceblue' }}
                    size={"small"}
                    key={genre.id}
                    clickable
                    onClick={() => addChip(genre)}
                />
            ))}
        </div>
    );
};

export default GenresSeries;