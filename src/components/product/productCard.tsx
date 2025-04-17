import { HTMLAttributes} from "react";
import Link from "next/link";
import Image, {  StaticImageData } from "next/image";
export type ProductCardProps = HTMLAttributes<HTMLDivElement> & {
  variant: "small" | "large";
  price: number;
  currency: "$" | "PLN";
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
      className={`product-card overflow-hidden h-full flex-col items-start justify-center ${variant === 'small' ? 'w-[150px]' : 'w-[200px]'
        } ${className ?? ' '}`}
      {...props}
    >
      <div className="w-full inline-flex items-center justify-start">
        <Image
          src={imageUrl}
          alt={title}
          className={`w-full shrink-0object-cover ${variant === 'small' ? 'h-[150px]' : 'h-[200px]'
            }`}
        />
      </div>

      <Link href='/' className={`w-full flex flex-col h-full grow items-start justify-start p-2 ${variant === 'small' ? 'px-2 py-1' : 'px-2 py-1'
        }`}>
        <div className="w-full inline-flex items-start justify-start gap-1 pb-1">
          <span suppressHydrationWarning={true} className="product-text text-xl font-normal leading-7">
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
            <span suppressHydrationWarning={true} className="capitalize"> {deliveryDate} </span>
          </span>
          <div className="p-0.5 flex items-center justify-start gap-2.5">
            <InfoIcon className="text-[var(--icons-color)]" />
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ProductCardList = ({
  categoryName,
  cards,
  weekdays
}: { 
  categoryName: string,
  cards: {
    id: number;
    variant: "small" | "large";
    price: number;
    currency: "$" | "PLN";
    title: string;
    deliveryDate: Date;
    imageUrl: string | StaticImageData;
  }[], 
  weekdays: Array<string> }) =>{
  return(
    <div className="w-full max-w-[1440px] px-1 relative inline-flex justify-between items-start">
      <div data-color="Dark" className="flex-1 max-w-[1432px] pb-8 bg-[var(--page-bg)] inline-flex flex-col justify-start items-start gap-2.5 overflow-hidden">
        <div className="self-stretch px-2 py-6 bg-[var(--elements-bg)] flex flex-col justify-start items-start gap-2">
          <Link href ='/' className="self-stretch pb-4 inline-flex justify-start items-center gap-2.5">
            <div className="justify-start text-[var(--text-color)] text-3xl font-medium font-['Montserrat'] leading-10">{categoryName}</div>
          </Link>
          <div className="self-stretch px-1 flex flex-col justify-start items-start gap-2.5 overflow-hidden">
            <div className="self-stretch inline-flex justify-start items-start gap-2 overflow-hidden w-fit">
              {
                cards.map((product) => (
                  <ProductCard
                    key={product.id}
                    variant="large"
                    price={product.price}
                    currency={product.currency}
                    title={product.title}
                    deliveryDate={'' + weekdays[product.deliveryDate.getDay()] || 'ERROR'}
                    imageUrl={product.imageUrl}
                  />
                ))
              }  
            </div>
          </div>
        </div>
      </div>
      <div className="size-10 left-[1436px] top-[242px] absolute origin-top-left rotate-180 opacity-30 bg-elements-bg-dark outline outline-1 outline-offset-[-1px] outline-[var(--border-color)]">
        <div className="size-6 left-[32px] top-[33px] absolute origin-top-left rotate-180 outline outline-[1.50px] outline-offset-[-0.75px] outline-[var(--border-color)]" />
      </div>
    </div>
  )
}




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