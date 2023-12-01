import { REACT_APP_API_KEY } from "../../config/config";
import SingleContent from "../../components/Content/SingleContent";
import { useState, useEffect } from "react";
import CustomPagination from "../../components/Pagination/CustomPagination";
import GenresMovie from "../../Genres/GenresMovie";
import useGenre from "../../useGenre/useGenre";

const Movies = () => {
  const [content, setContent] = useState([]);
  const [page, setPage] = useState(1);
  const [numOfPages, setNumOfPages] = useState();
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreUrl = useGenre(selectedGenres)

  const M_API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreUrl}`;

  useEffect(() => {
    fetch(M_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent(data.results);
        setNumOfPages(data.total_pages > 500 ? data.total_pages = 500 : data.total_pages);
      });
    // eslint-disable-next-line
  }, [page, genreUrl]);

  return (
    <div>
      <span className="pageTitle">Movies</span>
      <GenresMovie type='movie' genres={genres} setGenres={setGenres} selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} />
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type='movie'
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 &&
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      }
    </div>
  );
};

export default Movies;
