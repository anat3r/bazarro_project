import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { StaticImageData } from 'next/image';
import { InfoIcon } from '@/components/iconsSVG/icons'; // Adjust the import path as necessary
// Type definitions
interface ProductCardProps {
  id: number;
  variant?: 'small' | 'large';
  price: number;
  currency: string;
  title: string;
  deliveryDate: string;
  imageUrl: string | StaticImageData;
}

// Product Card Component
const ProductCard: React.FC<ProductCardProps> = ({
  id,
  variant = 'large',
  price,
  currency,
  title,
  deliveryDate,
  imageUrl,
}) => {
  // Determine size based on variant
  const wClasses: {'small' : string; 'large': string} = {
    'small': 'w-36',
    'large': 'w-50'
  };
  const hClasses: { 'small': string; 'large': string } = {
    'small': 'h-36',
    'large': 'h-50'
  };

  return (
    <article className={`flex-col ${wClasses[variant]} h-fit bg-[var(--elements-bg)] text-[var(--text-color)] hover:**:text-[var(--contrast-color)]`}>
        <Link href={`/product/${id}`} className="flex-col">
        <Image className={`${wClasses[variant]} ${hClasses[variant]}`} src={imageUrl} alt="Watch" width={variant == 'large' ? 200 : 144} height={variant == 'large' ? 200 : 144} />
          <div className="flex-col gap-1 py-2 px-1"> {/* Description */}
          <h2 className="font-[Lato] font-normal text-lg" suppressHydrationWarning>{`${price.toFixed(2)} ${currency}`}</h2>
            <span className="font-[Montserrat] font-light text-sm line-clamp-3 overflow-ellipsis">
              {title}
            </span>
            <span className="flex items-center gap-1 text-[var(--contrast-color)]">
            <div className=" text-xs" suppressHydrationWarning>
                {'Delivery on ' + deliveryDate}
              </div>
              <div className=" hover:bg-gray-700 pt-0.5 px-1">
                <InfoIcon />
              </div>
            </span>
          </div></Link>
      </article>
  );
};

export default ProductCard;