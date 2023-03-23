import { Helmet } from "react-helmet";
import AppBanner from "../appBanner/AppBanner";
import Characters from "../characters";
import ErrorBoundary from "../errorBoundary";

const MainPage = () => {
  console.log("render");

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
