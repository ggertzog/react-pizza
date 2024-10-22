import React from 'react';
import './scss/app.scss';

import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

export default function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            <PizzaBlock title="Маргарита" price={395} />
            <PizzaBlock title="Чизбургер" price={495} />
            <PizzaBlock title="Четерыре сыра" price={525} />
            <PizzaBlock title="Четыре сезона" price={444} />
          </div>
        </div>
      </div>
    </div>
  );
}