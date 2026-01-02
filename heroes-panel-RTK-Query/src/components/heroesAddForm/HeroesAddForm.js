import { useState } from "react";
import { useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import { selectAll } from "../heroesFilters/filtersSlice";
import { useCreateHeroMutation } from "../../api/apiSlice";

import store from "../../store";

const HeroesAddForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [element, setElement] = useState("");

  const [createHero] = useCreateHeroMutation();
  const { filtersLoadingStatus } = useSelector((state) => state.filters);

  const filters = selectAll(store.getState());
  console.log(filters);

  const onSubmit = async (e) => {
    e.preventDefault();
    const hero = { id: uuidv4(), name, description, element };
    createHero(hero).unwrap();
  };

  const renderFiltersList = (arr) => {
    if (arr.length === 0 && filtersLoadingStatus === "idle") return <option disabled>Элементов пока нет</option>;

    return arr.map((el) => {
      return (
        el.name !== "all" && (
          <option key={el.name} value={el.name}>
            {el.name}
          </option>
        )
      );
    });
  };

  return (
    <form className="border p-4 shadow-lg rounded" onSubmit={(e) => onSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input required type="text" value={name} onChange={(e) => setName(e.target.value)} name="name" className="form-control" id="name" placeholder="Как меня зовут?" />
      </div>

      <div className="mb-3">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea required value={description} onChange={(e) => setDescription(e.target.value)} name="text" className="form-control" id="text" placeholder="Что я умею?" style={{ height: "130px" }} />
      </div>

      <div className="mb-3">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select required value={element} onChange={(e) => setElement(e.target.value)} className="form-select" id="element" name="element">
          <option value="">Я владею элементом...</option>
          {renderFiltersList(filters)}
        </select>
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};

export default HeroesAddForm;
