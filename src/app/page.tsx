'use client'
import { ProductCard } from "@/components/product/productCard";
import { useEffect, useState } from "react";
import { getWN } from "@/lib/utils";
import watch from '../../public/watch.png'
const products = [{
    id: '0',
    variant : "small",
    price: 10.99,
    currency: "$",
    title: "Best watches id 1",
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: '1',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Best watches id 2",
    deliveryDate: new Date('11.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: '2',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Good Product",
    deliveryDate: new Date('12.04.2025'),
    imageUrl: watch,
  }, 
  {
    id: '3',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Good Product",
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: '4',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Good Product",
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: '5',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Good Product",
    deliveryDate: new Date('10.04.2025'),
    imageUrl: watch,
  },
  {
    id: '6',
    variant: "small",
    price: 10.99,
    currency: "$",
    title: "Good Product",
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
    <div data-color="Light" className=" bg-[var(--elements-bg)] w-full max-w-[1432px] pb-8 bg-gray(page-bg-ligth) inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
      <div className="self-stretch px-2 py-6 bg-white(elements-bg-ligthtext-dark) flex flex-col justify-start items-start gap-2">
        <div className="self-stretch pb-4 inline-flex justify-start items-center gap-2.5">
          <div className="justify-start text-balck(page-bg-darktext-ligth) text-3xl font-medium font-['Montserrat'] leading-10">Especially for you</div>
        </div>
        <div className="self-stretch px-1 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch inline-flex justify-start items-center gap-2 overflow-hidden">
            {
              products.map((product) => (
                <ProductCard
                  key={Number(product.id)}
                  variant="large"
                  price={product.price}
                  currency={product.currency}
                  title={product.title}
                  deliveryDate={''+ weekdays[product.deliveryDate.getDay()] || 'ERROR' }
                  imageUrl={product.imageUrl}
                />
              ))
            }  
          </div>
        </div>
      </div>
    </div>
  );
}
