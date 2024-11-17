import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    title: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get('https://671bc9142c842d92c3814c4d.mockapi.io/items/' + id);
        setPizza(data);
      } catch (error) {
        alert('Ошибка получения пиццы!');
        navigate('/');
      }
    }

    fetchPizza();
  }, []);

  if(!pizza) {
    return <>'Загрузка...'</>
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
