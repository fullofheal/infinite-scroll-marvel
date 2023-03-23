import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Header from "../header";
import Spinner from "../spinner";

// const Page404 = lazy(() => import('../pages/404'));
const MainPage = lazy(() => import("../pages/MainPage"));
const FavouritesPage = lazy(() => import("../pages/FavouritesPage"));
// const SingleComicLayout = lazy(() => import('../pages/singleComicLayout/SingleComicLayout'));
// const SingleCharacterLayout = lazy(() => import('../pages/singleCharacterLayout/SingleCharacterLayout'));
// const SinglePage = lazy(() => import('../pages/SinglePage'));

const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <main>
          <Suspense fallback={<Spinner />}>
            <Routes>
              <Route end path="/" element={<MainPage />} />
              <Route end path="/favourites" element={<FavouritesPage />} />
              {/* <Route 
                                end path="/comics" 
                                element={<ComicsPage/>}/>
                            <Route 
                                end path="/comics/:id"
                                element={<SinglePage Component={SingleComicLayout} dataType='comic'/>}/>
                            <Route 
                                end path="/characters/:id"
                                element={<SinglePage Component={SingleCharacterLayout} dataType='character'/>}/>                            
                            <Route 
                                end path="*" 
                                element={<Page404/>}/> */}
            </Routes>
          </Suspense>
        </main>
      </div>
    </Router>
  );
};

export default App;
