'use client'
import { useMemo, use, useState, useEffect } from "react";
import { organizeProductsByCategory } from "@/lib/fake-api/functions";
import { getWN } from "@/lib/utils";
import CategoryWrapper from "@/components/product/ProductCardList";
import { StaticImageData } from "next/image";

interface Product {
  id: number;
  variant?: 'small' | 'large';
  price: number;
  currency: string;
  title: string;
  deliveryDate: Date;
  imageUrl: string | StaticImageData;
}
export default function SearchPage({
  params,
  searchParams,
  
}) {
  const prms = use(params)
  const decodedQuery = decodeURIComponent(prms.query);
  const searchPar = use(searchParams)
  const [lang, setLang] = useState('en-US')
  const [weekdays, setWeekdays] = useState(getWN(lang))
  const category = searchPar.category?.replace(/_/g, ' ');
  const prodByCat = organizeProductsByCategory('PL', 'PLN')
  const categ = useMemo(() => prodByCat.find((el) => el.categoryName == category) || {categoryName: 'All products'}, [prodByCat, category])
  const products: Product[] = useMemo(() => categ.categoryName == 'All products' ? prodByCat.reduce((prev, categ) => 
    [...prev, ...categ.products]
    , Array<Product>())
    .filter((prod: Product) => prod.title.toLowerCase().includes(decodedQuery.toLowerCase())) : 
    categ.products.filter((prod: Product) => prod.title.toLowerCase().includes(decodedQuery.toLowerCase())),[categ, prodByCat])
  
  useEffect(() => {
    setLang(navigator.language)
    setWeekdays(getWN(lang))
  }, [lang]);// create local day name
  
    return (
    <CategoryWrapper categoryName={categ?.categoryName} productsList={products} weekdays={weekdays}>

    </CategoryWrapper>
  );
}