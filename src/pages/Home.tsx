import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';

import { useSelector } from 'react-redux';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import Pagination from '../components/Pagination';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const sortBy = sort.sortProperty;
  const { items, status } = useSelector(selectPizzaData);

  const onClickCategory = useCallback((id: number) => {
    dispatch(setCategoryId(id));
  }, []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

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
        sortBy,
        currentPage: String(currentPage),
      }),
    );

    window.scrollTo(0, 0);
  };

  // Если изменили параметры и был первый рендер
  // useEffect(() => {
  //   if (isMounted.current) {
  //     const queryString = qs.stringify({
  //       sortProperty: sortBy,
  //       categoryId,
  //       currentPage,
  //     });      

  //     navigate(`?${queryString}`);
  //   }

  //   isMounted.current = true;
  // }, [categoryId, sortBy, orderType, currentPage]);

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редaкс
  // useEffect(() => {
  //   if (window.location.search) {
  //     const params = (qs.parse(window.location.search.substring(1)) as unknown) as SearchPizzaParams;      
  //     const sort = list.find((obj) => obj.sortProperty === params.sortBy);
      
  //     dispatch(setFilters({
  //       categoryId: Number(params.category),
  //       searchValue: params.search,
  //       currentPage: Number(params.currentPage),
  //       sort: sort || list[0],
  //     }));

  //     isSearch.current = true;
  //   }
  // }, []);

  // Если был первий рендер, то запрашиваем пиццы
  useEffect(() => {
    getPizzas();

    isSearch.current = false;
  }, [categoryId, sortBy, orderType, searchValue, currentPage]);

  const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={onClickCategory} />
        <Sort value={sort} setOrderType={setOrderType} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error-info">
          <h2>
            Произошла ошибка 😕
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
