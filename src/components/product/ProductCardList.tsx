import React from 'react';
import ProductCard from './ProductCard'; // Assuming ProductCard is in the same directory
import { Product } from '@/lib/fake-api/functions';

interface CategoryWrapperProps {
  categoryName: string;
  productsList: Product[];
  weekdays: string[];
  variant?: 'small' | 'large';
}

const CategoryWrapper: React.FC<CategoryWrapperProps> = ({ categoryName, productsList, weekdays, variant = 'large' }) => {
  return (
    <div className="w-full max-w-[1440px] px-1 relative bg-[var(--page-bg)] flex justify-between items-start">
      <div
        data-color="Dark"
        className="flex-1 max-w-[1432px] mb-8 flex bg-[var(--elements-bg)] flex-col justify-start items-start gap-2.5 overflow-hidden shadow-sm"
      >
        {/* Category Header */}
        <div className="self-stretch px-2 py-6 flex flex-col justify-start items-start gap-2">
          <div className="self-stretch pb-4 flex justify-start items-center gap-2.5">
            <h2 className="justify-start text-[var(--text-color)] text-3xl font-medium font-['Montserrat'] leading-10">
              {categoryName}
            </h2>
          </div>
        </div>

        {/* Products List */}
        <div className="self-stretch px-1 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
          <div className="self-stretch flex justify-start items-start gap-2 overflow-x-auto pb-4">
            {productsList.map((product) => (
              <div key={+product.id} className="flex-shrink-0">
                <ProductCard
                  id={`${product.id}`}
                  variant={variant || 'large'}
                  price={product.price}
                  currency={product.currency}
                  title={product.title}
                  deliveryDate={weekdays[product.deliveryDate.getDay()]}
                  imageUrl={product.imageUrl}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryWrapper;