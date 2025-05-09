'use client'
import { /*ProductCard,*/ ProductCardList } from "@/components/product/productCard";
import { useEffect, useState } from "react";
import { getWN } from "@/lib/utils";
import watch from '../../public/watch.png'
import { StaticImageData } from "next/image";
import HeaderWrapper from "@/components/header/header";
const lorem = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.Vivamus egestas ut libero sit amet dictum.Pellentesque.'.split(/,|\.|\ /).filter((word) => word.length > 1)
console.log(lorem);
const products: {
  id: number;
  variant: "small" | "large";
  price: number;
  currency: "$" | "PLN";
  title: string;
  deliveryDate: Date;
  imageUrl: string | StaticImageData;
}[] = [{
    id: 0,
  variant: "large",
    price: Math.random()*100,
    currency: "$",
  title: lorem.slice(0,5).join(' '),
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: 1,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(1, 7).join(' '),
    deliveryDate: new Date('11.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: 2,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(2, 9).join(' '),
    deliveryDate: new Date('12.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: 3,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(0,4).join(' '),
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: 4,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(2, 8).join(' '),
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: 5,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(3, 9).join(' '),
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: 6,
    variant: "large",
    price: Math.random() * 100,
    currency: "$",
    title: lorem.slice(3, 5).join(' '),
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
 ]


export default function Home() {
  const [lang, setLang] = useState<string>();
  const [weekdays, setWeekdays] = useState<Array<string>>([]);
  useEffect(() => {
    // Код выполняется только в браузере
    if(!lang) setLang(navigator.language); // Получаем локаль браузера
    setWeekdays(getWN(lang))
    setTimeout(() => console.log(getWN(lang)), 1000);
  }, [lang]);
  return (
    <>
      <HeaderWrapper />
      <ProductCardList categoryName="Best watches" cards={products} weekdays={weekdays} />
      <ProductCardList categoryName="Good watches" cards={products} weekdays={weekdays} />
      <ProductCardList categoryName="Normal watches" cards={products} weekdays={weekdays} />
      <ProductCardList categoryName="Not best watches" cards={products} weekdays={weekdays} />
      <ProductCardList categoryName="Worst ever watches" cards={products} weekdays={weekdays} />
    </>
  );
}
