import "./appBanner.scss";
import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";

const AppBanner = ({ page }) => {
  return (
    <div className="app__banner">
      <img src={avengers} alt="Avengers" />
      <div className="app__banner-text">
        {page === "main"
          ? "More than 1500 superheroes to explore!"
          : "The list of your favourite superheroes!"}
        <br />
        {page === "main" ? "Just scroll down!" : "All in one place."}
      </div>
      <img src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default AppBanner;
