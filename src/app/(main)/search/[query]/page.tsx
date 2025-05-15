'use client'
import { useMemo, useState, useEffect } from "react";
import { organizeProductsByCategory } from "@/lib/fake-api/functions";
import { getWN } from "@/lib/utils";
import CategoryWrapper from "@/components/product/ProductCardList";
import { useParams, useSearchParams } from "next/navigation";
import { Product } from "@/lib/fake-api/functions";
export default function SearchPage({
}) {
  const {query} = useParams<{query: string}>()
  const decodedQuery = decodeURIComponent(query);
  const searchParams = useSearchParams()
  const [lang, setLang] = useState('en-US')
  const [weekdays, setWeekdays] = useState(getWN(lang))
  const category = searchParams.get('category')?.replace(/_/g, ' ');
  const prodByCat = organizeProductsByCategory('PL', 'PLN')
  const categ = useMemo(() => prodByCat.find((el) => el.categoryName == category) || {categoryName: 'All products', products: []}, [prodByCat, category])
  const products: Product[] = useMemo(() => categ.categoryName == 'All products' ? 
  (prodByCat.reduce((previousValue : Product[], currentValue) => 
    {
    return [...previousValue, ...currentValue.products]
    } , []))
    .filter((prod: Product) => prod.title.toLowerCase().includes(decodedQuery.toLowerCase())) : 
    categ.products.filter((value: Product) => value.title.toLowerCase().includes(decodedQuery.toLowerCase())),[categ, prodByCat, decodedQuery])
  
  useEffect(() => {
    setLang(navigator.language)
    setWeekdays(getWN(lang))
  }, [lang]);// create local day name
  
    return (
    <CategoryWrapper categoryName={categ?.categoryName} productsList={products} weekdays={weekdays}>

    </CategoryWrapper>
  );
}