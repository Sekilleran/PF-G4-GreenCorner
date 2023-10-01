import { Link } from "react-router-dom";
import { filterCategory } from "../../Redux/actions/product/action"
import { useDispatch } from "react-redux";
const Category = ({ name, id }) => {

  const dispatch = useDispatch();

  const handleChange = (name) => {
    dispatch(filterCategory(name));
  };

  return (
    <div>
      <Link onClick={() => handleChange(name)}>
        <h1>{name}</h1>
      </Link>
    </div>
  );
};
export default Category;
