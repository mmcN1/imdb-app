import {
  Button,
  createTheme,
  Tab,
  Tabs,
  TextField,
  ThemeProvider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect, useState } from "react";
import { REACT_APP_API_KEY } from "../../config/config";
import SingleContent from "../../components/Content/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";

const Search = () => {
  const [type, setType] = useState(0);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [content, setContent] = useState([]);
  const [numOfPages, setNumOfPages] = useState();

  const darkTheme = createTheme({
    palette: {
      mode: "dark",
      primary: {
        main: "#fff",
      },
    },
  });

  const fetchSearch = async () => {
    const S_API_URL = `https://api.themoviedb.org/3/search/${
      type ? "tv" : "movie"
    }?api_key=${REACT_APP_API_KEY}&query=${searchText}&page=${page}&include_adult=false`;

    await fetch(S_API_URL)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setContent(data.results);
        setNumOfPages(
          data.total_pages > 500 ? (data.total_pages = 500) : data.total_pages
        );
      });
  };

  useEffect(() => {
    fetchSearch();
    window.scroll(0, 0);
    // eslint-disable-next-line
  }, [type, page]);

  console.log(searchText);
  console.log(type);

  return (
    <div>
      <ThemeProvider theme={darkTheme}>
        <div style={{ display: "flex", margin: "10px 0" }}>
          <TextField
            label="Search"
            className="search"
            style={{ flex: 1 }}
            variant="filled"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            variant="contained"
            style={{ marginLeft: "20px" }}
            onClick={fetchSearch}
          >
            <SearchIcon />
          </Button>
        </div>
        <Tabs
          value={type}
          indicatorColor="primary"
          textColor="primary"
          onChange={(event, newValue) => {
            setType(newValue);
            setPage(1);
          }}
          style={{ paddingBottom: 5 }}
        >
          <Tab label="Movies" style={{ width: "50%", margin: "auto" }} />
          <Tab label="Tv Series" style={{ width: "50%", margin: "auto" }} />
        </Tabs>
      </ThemeProvider>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={type ? "tv" : "movie"}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      {numOfPages > 1 && (
        <CustomPagination setPage={setPage} numOfPages={numOfPages} />
      )}
    </div>
  );
};

export default Search;
