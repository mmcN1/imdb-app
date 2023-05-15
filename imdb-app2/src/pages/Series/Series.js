import { useState, useEffect } from "react";
import { REACT_APP_API_KEY } from "../../config/config";
import GenresSeries from "../../Genres/GenresMovie";
import SingleContent from "../../components/Content/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
import useGenre from "../../useGenre/useGenre";


const Series = () => {
    const [content, setContent] = useState([]);
    const [page, setPage] = useState(1);
    const [numOfPages, setNumOfPages] = useState();
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genreUrl = useGenre(selectedGenres)

    const TV_API_URL = `https://api.themoviedb.org/3/discover/tv?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}&include_null_first_air_dates=false&with_genres=${genreUrl}`;

    useEffect(() => {
        fetch(TV_API_URL)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setContent(data.results);
                setNumOfPages(data.total_pages > 500 ? data.total_pages = 500 : data.total_pages);
                window.scroll(0, 0)
            });
        // eslint-disable-next-line
    }, [page, genreUrl]);


    return (
        <div>
            <span className="pageTitle" style={{marginTop: '-10px'}}>Tv Series</span>
            <GenresSeries type='tv' genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
            <div className="trending">
                {content &&
                    content.map((c) => (
                        <SingleContent
                            key={c.id}
                            id={c.id}
                            poster={c.poster_path}
                            title={c.title || c.name}
                            date={c.first_air_date || c.release_date}
                            media_type='tv'
                            vote_average={c.vote_average}
                        />
                    ))}
            </div>
            {numOfPages > 1 &&
                <CustomPagination setPage={setPage} numOfPages={numOfPages} page={1} />
            }
        </div>
    )
}

export default Series;