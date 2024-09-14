import { fetchFromStore } from "../../utils/fetchFromStore";
import PropTypes from "prop-types";

const Home = () => {
  // const { currentUser } = useSelector((state) => state.auth);
  const { currentUser } = fetchFromStore("auth");
  return (
    <div className="custom-padding-container">
      <h2> Home Page </h2>
      <h2>{currentUser ? currentUser.name : ""}</h2>
    </div>
  );
};

Home.propTypes = {};

export default Home;
