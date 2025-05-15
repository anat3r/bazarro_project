// app/product/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { TruckIcon,  } from '@/components/iconsSVG/icons';
import { getProduct } from '@/lib/fake-api/functions';
import watch from '@/../public/watch.png';
import headphones from '@/../public/headphones.png';
import { localCapitalize } from '@/lib/utils';
interface ProductPageProps {
  params: { id: string };
}



export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProduct(params.id);
  const category = localCapitalize(product.category_id.trim().replace('cat_', '').split('_')[0])
  const sub_category = localCapitalize(product.category_id.trim().replace('cat_', '').split('_')[1])
  if (!product) return notFound();

  return (
    <div className="max-w-full w-full mx-auto px-4 py-8">
      {/* Хлебные крошки */}
      <div className="text-sm text-[var(--text-color)] mb-4">
        <span className="hover:text-[var(--site-color)] cursor-pointer">{category}</span> &gt;
        <span className="hover:text-[var(--site-color)] cursor-pointer">{sub_category}</span> &gt;
        <span className="text-[var(--site-color)]">{product.title}</span>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Галерея изображений */}
        <div className="flex-1 bg-[var(--elements-bg)] p-4 rounded-lg border border-[var(--border-color)]">
          <div className="relative h-96 mb-4">
            <Image
              src={category == 'Headphones' ? headphones : watch}
              alt={product.title}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex gap-2">
            {product.images.slice(0, 4).map((img, index) => (
              <div key={index} className="w-20 h-20 relative border border-[var(--border-color)] cursor-pointer">
                <Image
                  src={category == 'Headphones' ? headphones : watch}
                  alt={`${product.title} variant ${index}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Информация о товаре */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-[var(--text-color)] mb-2">{product.title}</h1>
          <div className="text-lg text-[var(--text-color)] mb-4">{product.description}</div>

          {/* Бренд и рейтинг */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[var(--contrast-color)]">Brand: SoundMaster</span>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400">★</span>
              ))}
              <span className="text-[var(--text-color)] ml-2">(42 reviews)</span>
            </div>
          </div>

          {/* Цена */}
          <div className="bg-[var(--elements-bg)] p-4 rounded-lg border border-[var(--border-color)] mb-6">
            {product.original_price && (
              <div className="text-lg text-gray-500 line-through">
                ${product.original_price.toFixed(2)}
              </div>
            )}
            <div className="text-3xl font-bold text-[var(--site-color)] mb-2">
              ${product.price.toFixed(2)}
            </div>
            {product.original_price && (
              <div className="text-[var(--contrast-color)]">
                Save ${(product.original_price - product.price).toFixed(2)} ({Math.round((1 - product.price / product.original_price) * 100)}%)
              </div>
            )}
          </div>

          {/* Доставка */}
          <div className="bg-[var(--elements-bg)] p-4 rounded-lg border border-[var(--border-color)] mb-6">
            <div className="flex items-center gap-2 mb-2">
              <TruckIcon color="var(--site-color)" />
              <span className="font-bold text-[var(--text-color)]">Delivery options</span>
            </div>
            {product.delivery_terms.map((delivery, i) => (
              <div key={i} className="flex justify-between items-center mb-1">
                <span className="text-[var(--text-color)]">
                  {delivery.carrier_id === 'carrier_dpd' ? 'DPD' : 'InPost'} -
                  {delivery.cost === 0 ? ' Free' : ` $${delivery.cost.toFixed(2)}`}
                </span>
                <span className="text-[var(--contrast-color)]">
                  {delivery.min_days}-{delivery.max_days} business days
                </span>
              </div>
            ))}
          </div>

          {/* Кнопки */}
          <div className="flex flex-col gap-3">
            <button className="bg-[var(--site-color)] text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Add to Cart
            </button>
            <button className="bg-[var(--contrast-color)] text-white py-3 px-6 rounded-lg font-bold hover:opacity-90 transition-opacity">
              Buy Now
            </button>
          </div>

          {/* Гарантии */}
          <div className="flex items-center gap-4 mt-6 text-sm text-[var(--text-color)]">
            <div className="flex items-center gap-1">
              <span>30-day returns</span>
            </div>
            <div className="flex items-center gap-1">
              <span>2-year warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Детали товара */}
      <div className="mt-12 bg-[var(--elements-bg)] p-6 rounded-lg border border-[var(--border-color)]">
        <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Product Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {product.attributes.map((attr, i) => (
            <div key={i} className="flex">
              <span className="w-1/3 font-medium text-[var(--text-color)]">{attr.key}:</span>
              <span className="text-[var(--text-color)]">{attr.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Отзывы */}
      <div className="mt-12">
        <h2 className="text-xl font-bold text-[var(--text-color)] mb-4">Customer Reviews</h2>
        <div className="bg-[var(--elements-bg)] p-6 rounded-lg border border-[var(--border-color)]">
          <div className="text-center text-[var(--text-color)]">
            No reviews yet. Be the first to review this product!
          </div>
        </div>
      </div>
    </div>
  );
}