import { Helmet } from "react-helmet";
import AppBanner from "../AppBanner";
import Characters from "../Characters";
import ErrorBoundary from "../ErrorBoundary";

const MainPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel characters information" />
        <title>Marvel information portal</title>
      </Helmet>
      <AppBanner page="main" />
      <div className="char__content">
        <ErrorBoundary>
          <Characters />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default MainPage;
