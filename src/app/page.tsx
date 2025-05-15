'use client'
import CategoryWrapper  from "@/components/product/ProductCardList";
import { useEffect, useState } from "react";
import { getWN } from "@/lib/utils";
import { organizeProductsByCategory } from "@/lib/fake-api/functions";

export default function Home() {
  const [lang, setLang] = useState('en-US')
  const [weekdays, setWeekdays] = useState(getWN('en-US'))
  const [categories, setCategories] = useState(organizeProductsByCategory('EN', '$'))
  useEffect(() =>{
    setCategories(organizeProductsByCategory('PL', 'PLN'))
  }, [])
  useEffect(() => {
    setLang(navigator.language)
    setWeekdays(getWN(lang))
  }, [lang]);// create local day name
  return (
    <>
      {categories.map((category, id) => 
      (
      <CategoryWrapper
        key={id}
        categoryName={category.categoryName}
        productsList={category.products}
        weekdays={weekdays}
      /> 
      ))
      }
    </>
  );
}
