import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header";
import SimpleBottomNavigation from "./components/NavBar/NavBar";
import { Container } from "@material-ui/core";
import Trending from "./pages/Trending/Trending";
import Series from "./pages/Series/Series";
import Search from "./pages/Search/Search";
import Movies from "./pages/Movies/Movies";


const App = () => {
  return (
    <BrowserRouter>

      <Header />
      <div className="app">
        <Container>
          <Routes overlap='rectangular'>
            <Route path="/" Component={Trending} exact />
            <Route path="/movies" Component={Movies} />
            <Route path="/series" Component={Series} />
            <Route path="/search" Component={Search} />
          </Routes>
        </Container>
      </div>
      <SimpleBottomNavigation />
    </BrowserRouter>
  );
}

export default App;
