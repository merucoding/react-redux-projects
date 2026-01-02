import classNames from "classnames";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchFilters } from "./filtersSlice";
import { setActiveFilter } from "./filtersSlice";
import { useGetHeroesQuery } from "../../api/apiSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
  const { filtersLoadingStatus, activeFilter } = useSelector((state) => state.filters);

  const dispatch = useDispatch();
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();

  const filtersList = ["all", ...new Set(heroes.map((hero) => hero.element))];

  useEffect(() => {
    dispatch(fetchFilters());
    // eslint-disable-next-line
  }, []);

  if (filtersLoadingStatus === "loading") {
    return <Spinner />;
  } else if (filtersLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const buttonsRender = (filtersList) => {
    return filtersList.map((filter) => {
      const btnClass = classNames({
        btn: true,
        "btn-outline-dark": filter === "all",
        "btn-danger": filter === "fire",
        "btn-primary": filter === "water",
        "btn-success": filter === "wind",
        "btn-secondary": filter === "earth",
        active: activeFilter === filter,
      });

      return (
        <button key={filter} className={btnClass} onClick={() => dispatch(setActiveFilter(filter))}>
          {filter}
        </button>
      );
    });
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">{buttonsRender(filtersList)}</div>
      </div>
    </div>
  );
};

export default HeroesFilters;
