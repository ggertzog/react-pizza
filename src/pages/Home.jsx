import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';

import { SearchContext } from '../App';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/Pagination';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
  const sortType = sort.sortProperty;
  const { items, status } = useSelector((state) => state.pizza);

  const onClickCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const { searchValue } = React.useContext(SearchContext);

  const [orderType, setOrderType] = useState(false);

  const getPizzas = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = orderType ? 'asc' : 'desc';

    dispatch(
      fetchPizzas({
        category,
        search,
        order,
        sortType,
        currentPage,
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType,
        categoryId,
        currentPage,
      });

      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortType, orderType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редaкс
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort,
        }),
      );

      isSearch.current = true;
    }
  }, []);

  // Если был первий рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortType, orderType, searchValue, currentPage]);

  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort orderType={orderType} setOrderType={setOrderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка <icon>😕</icon>
          </h2>
          <p>
            К сожалению, не удалось получить пиццы.
            <br />
            Попробуйте повторить попытку позже.
          </p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
