import { useState } from "react";
import "./SearchBar.scss";
import {Link} from "react-router-dom";

const types = ["buy", "rent"];

const SearchBar = () => {
  //inicializo el estado con el tipo "rent" y el resto vacio
  const [query, setQuery] = useState({
    type: "buy",
    location: "",
    minPrice: 0,
    maxPrice: 0,
  });

  // Esta función cambia el tipo de búsqueda cuando el usuario hace clic en uno de los botones de tipo
  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val })); //Usamos setQuery para actualizar el estado de la búsqueda, manteniendo los valores anteriores y cambiando el tipo
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            // Agregamos la clase "active" al botón si coincide con el tipo de búsqueda actual
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="nomber"
          name="maxPrice"
          min={0}
          max={1000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link to={`/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`}>
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
};

export default SearchBar;
