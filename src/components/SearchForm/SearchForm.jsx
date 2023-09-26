/* eslint-disable react-hooks/exhaustive-deps */
import searchIcon from "../../images/search.svg";
import "./SearchForm.css";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import { useFormValidation } from "../../hooks/useFormValidation";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ERROR_MESSAGE } from "../../utils/constants";

function SearchForm({ onSubmit, handleCheckboxClick, checkbox }) {
  const { pathname } = useLocation();
  const { values, handleChange, isValid, setValues, setIsValid } =
    useFormValidation();
  const [isEmpty, setIsEmpty] = useState(false);

  useEffect(() => {
    setIsValid(true);
  }, []);

  useEffect(() => {
    if (pathname === "/movies") {
      setValues({
        search: localStorage.getItem("searchString"),
      });
    }
  }, [setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    if (values.search) {
      setIsEmpty(false);
      onSubmit(values.search);
    } else {
      setIsEmpty(true);
    }
  }

  return (
    <section className="search">
      <form className="search__form" onSubmit={handleSubmit}>
        <div className="search__container">
          <img className="search__img" src={searchIcon} alt="лупа"></img>
          <div className="search__input-container">
            <input
              className="search__input"
              name="search"
              type="text"
              id="input-search"
              placeholder="Фильм"
              autoComplete="off"
              value={values.search || ""}
              onChange={handleChange}
              disabled={!isValid}
            />
            {isEmpty && (
              <span
                className={`search__input-error ${
                  isEmpty
                    ? "search__input-error_visible "
                    : ""
                }`}
              >
                {ERROR_MESSAGE.SEARCH_FORM_ERROR}
              </span>
            )}
          </div>
          <button type="submit" className="search__btn" disabled={!isValid}>
            Найти
          </button>
        </div>
        <div className="search__devider"></div>
        <div className="search__checkbox">
          <FilterCheckbox
            handleCheckboxClick={handleCheckboxClick}
            checkbox={checkbox}
          />
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
