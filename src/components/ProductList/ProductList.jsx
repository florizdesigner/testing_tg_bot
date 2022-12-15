import React, { useState } from "react";
import "./ProductList.css";
import ProductItem from "../ProductItem/ProductItem";
import productItem from "../ProductItem/ProductItem";
import { useTelegram } from "../../hooks/useTelegram";
import { useCallback, useEffect } from "@types/react";

const products = [
  {
    id: "1",
    title: "Кофта Carhartt",
    price: "8990.00",
    description: "Коричневая флисовая кофта",
  },
  {
    id: "2",
    title: "Шапка The North Face",
    price: "2490.00",
    description: "Черная классическая шапка от именитого бренда",
  },
  {
    id: "3",
    title: "Джинсы Evisu",
    price: "6990.00",
    description: "Японская классика",
  },
  {
    id: "4",
    title: "Чиносы Dickies",
    price: "3990.00",
    description: "Супер базовые брюки",
  },
  {
    id: "5",
    title: "Кеды Converse",
    price: "4490.00",
    description: "Пара из старой коллекции 2019 года",
  },
  {
    id: "6",
    title: "Сумка-тоут Carhartt",
    price: "6990.00",
    description: "Большая сумка-тоут с большим количеством отделений",
  },
];
const ProductList = (props) => {
  const [addedItems, setAddedItems] = useState([]);
  const { tg, queryId } = useTelegram();

  const onSendData = useCallback(() => {
    const data = {
      products: addedItems,
      totalPrice: getTotalPrice(addedItems),
      queryId,
    };
    fetch("http://localhost:8000", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.parse(data),
    });
  }, []);

  useEffect(() => {
    tg.onEvent("mainButtonClicked", onSendData);
    return () => {
      tg.offEvent("mainButtonClicked", onSendData);
    };
  }, [onSendData]);

  const getTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      return (acc += Number(item.price));
    }, 0);
  };

  const onAdd = (product) => {
    const alreadyAdded = addedItems.find((item) => item.id === product.id);

    let newItems = [];

    if (alreadyAdded) {
      newItems = addedItems.filter((item) => item.id !== product.id);
    } else {
      newItems = [...addedItems, product];
    }

    setAddedItems(newItems);

    if (newItems.length === 0) {
      tg.MainButton.hide();
    } else {
      tg.MainButton.show();
      tg.MainButton.setParams({
        text: `Купить за ${getTotalPrice(newItems)}`,
      });
    }
  };
  return (
    <div>
      {products.map((item) => {
        return <ProductItem product={item} onAdd={onAdd} className={"item"} />;
      })}
    </div>
  );
};

export default ProductList;
