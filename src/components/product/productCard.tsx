import { HTMLAttributes} from "react";
import Image, { StaticImageData } from "next/image";
export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  variant?: "small" | "large";
  price: number;
  currency: string;
  title: string;
  deliveryDate: string;
  imageUrl: string | StaticImageData;
};

export const ProductCard = ({
  variant = "large",
  price,
  currency,
  title,
  deliveryDate,
  imageUrl,
  className,
  ...props
}: ProductCardProps) => {

  return (
    <div
      className={`product-card overflow-hidden inline-flex flex-col items-start justify-center ${variant === 'small' ? 'w-[150px]' : 'w-[200px]'
        } ${className}`}
      {...props}
    >
      <div className="w-full inline-flex items-center justify-start">
        <Image
          src={imageUrl}
          alt={title}
          className={`w-full object-cover ${variant === 'small' ? 'h-[150px]' : 'h-[200px]'
            }`}
        />
      </div>

      <div className={`w-full flex flex-col items-start justify-start p-2 ${variant === 'small' ? 'px-2 py-1' : 'px-2 py-1'
        }`}>
        <div className="w-full inline-flex items-start justify-start gap-1 pb-1">
          <span className="product-text text-xl font-normal leading-7">
            {price.toFixed(2)}
          </span>
          <span className="product-text text-xl font-normal leading-7">
            {currency}
          </span>
        </div>

        <div className="w-full inline-flex items-start justify-center pb-1">
          <p className={`w-full product-text line-clamp-2 ${variant === 'small' ? 'text-xs' : 'text-sm'
            } font-light leading-snug opacity-90`}>
            {title}
          </p>
        </div>

        <div className="w-full inline-flex items-end justify-between pt-1 pb-1">
          <span className="contrast-text text-[10px] font-normal leading-[14px] ">
            <span>Delivery on </span> 
            <span className="capitalize"> {deliveryDate} </span>
          </span>
          <button className="p-0.5 flex items-center justify-start gap-2.5">
            <InfoIcon className="text-[var(--icons-color)]" />
          </button>
        </div>
      </div>
    </div>
  );
};

const InfoIcon = ({ className }: { className?: string }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M4 5.33329V3.99996M4 2.66663H4.00333M7.33333 3.99996C7.33333 5.84091 5.84095 7.33329 4 7.33329C2.15905 7.33329 0.666664 5.84091 0.666664 3.99996C0.666664 2.15901 2.15905 0.666626 4 0.666626C5.84095 0.666626 7.33333 2.15901 7.33333 3.99996Z"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);