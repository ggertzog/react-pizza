import React, { useState, useEffect } from 'react';

import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Categories from '../components/Categories';
import Sort from '../components/Sort';

const Home = () => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCategoryId] = useState(0);
  const [sortType, setSortType] = useState({
    name: 'популярности',
    sortProperty: 'rating',
  });

  const [orderType, setOrderType] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sortBy = sortType.sortProperty;
    const order = orderType ? 'asc' : 'desc';

    fetch(
      `https://671bc9142c842d92c3814c4d.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
    )
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json)) {
          setItems(json);
        } else {
          console.error('Полученные данные не являются массивом:', json);
        }
        setIsLoading(false);
      });

    window.scrollTo(0, 0);
  }, [categoryId, sortType, orderType]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          value={sortType}
          onChangeSort={(id) => setSortType(id)}
          orderType={orderType}
          setOrderType={setOrderType}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
};

export default Home;
