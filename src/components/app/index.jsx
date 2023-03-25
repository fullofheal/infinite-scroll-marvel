import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../Header";
import Spinner from "../Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const FavouritesPage = lazy(() => import("../pages/FavouritesPage"));

const App = () => {
  return (
    <Router>
      <div className="app">
        <div className="app__wrapper">
          <Header />
          <main>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route end path="/" element={<MainPage />} />
                <Route end path="/favourites" element={<FavouritesPage />} />
                <Route end path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
    </Router>
  );
};

export default App;
