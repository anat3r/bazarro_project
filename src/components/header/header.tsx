import React, { HTMLAttributes } from "react";
import Image from "next/image";
import logo from "../../public/logo.svg";
export type HeaderWrapperProps = HTMLAttributes<HTMLDivElement>;

export const HeaderWrapper = ({ className, ...props }: HeaderWrapperProps) => {
  return (
    <div
      className={`self-stretch h-32 bg-elements-bg-dark inline-flex flex-col justify-start items-center ${className}`}
      {...props}
    >
      <HeaderContainer>
        <LogoSection />
        <SearchSection />
        <AccountSection />
      </HeaderContainer>
      <MainNavWrapper>
        <CategoriesSection />
        <AdditionalContent />
      </MainNavWrapper>
    </div>
  );
};

const HeaderContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="self-stretch flex-1 py-3 inline-flex justify-center items-start gap-2 overflow-hidden">
    <div className="flex-1 self-stretch max-w-[1440px] px-4 flex justify-start items-center gap-2">
      {children}
    </div>
  </div>
);

const MainNavWrapper = ({ children }: { children: React.ReactNode }) => (
  <div className="self-stretch h-12 py-0.5 border-t border-border-dark inline-flex justify-center items-center overflow-hidden">
    <div className="flex-1 self-stretch max-w-[1440px] flex justify-start items-center">
      {children}
    </div>
  </div>
);

const LogoSection = () => (
  <div className="self-stretch pl-1 pr-6 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
    <div className="w-28 h-6 flex flex-col justify-start items-start gap-2.5">
      <Image
        src={logo}
        alt="Logo"
        width={112}
        height={24}
        className="self-stretch h-6 object-cover" 
      />
    </div>
  </div>
);

const SearchSection = () => (
  <div className="flex-1 self-stretch px-2 py-1.5 inline-flex flex-col justify-center items-center gap-2.5 overflow-hidden">
    <div className="self-stretch inline-flex justify-start items-start">
      <div className="flex-1 inline-flex flex-col justify-start items-start gap-2">
        <div className="self-stretch h-10 min-w-60 px-4 py-3 bg-elements-bg-dark outline outline-1 outline-offset-[-1px] outline-border-dark inline-flex justify-start items-center overflow-hidden">
          <div className="flex-1 justify-start text-[var(--icons-color)] text-base font-normal font-['Inter'] leading-none">
            Type here...
          </div>
        </div>
      </div>
      <div className="w-44 self-stretch px-4 py-2.5 bg-elements-bg-dark border-t border-b border-border-dark flex justify-start items-center gap-1 overflow-hidden">
        <div className="justify-start text-[var(--text-color)] text-sm font-normal font-['Lato'] leading-none">
          Select Category
        </div>
        <SvgArrowDown />
      </div>
      <div className="h-10 p-3 bg-site-color flex justify-center items-center gap-2 overflow-hidden">
        <div className="justify-start text-[var(--text-color)] text-base font-medium font-['Montserrat'] leading-none">
          Search
        </div>
      </div>
    </div>
  </div>
);

const AccountSection = () => (
  <div className="w-96 self-stretch max-w-96 px-px flex justify-between items-center overflow-hidden">
    <div className="self-stretch px-2 inline-flex justify-start items-center gap-6">
      <div data-svg-wrapper data-size="24" className="relative">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 16V3H1V16H16ZM16 16H23V11L20 8H16V16ZM8 18.5C8 19.8807 6.88071 21 5.5 21C4.11929 21 3 19.8807 3 18.5C3 17.1193 4.11929 16 5.5 16C6.88071 16 8 17.1193 8 18.5ZM21 18.5C21 19.8807 19.8807 21 18.5 21C17.1193 21 16 19.8807 16 18.5C16 17.1193 17.1193 16 18.5 16C19.8807 16 21 17.1193 21 18.5Z" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div className="size- flex justify-start items-center gap-2.5">
        <div data-svg-wrapper data-size="32" className="relative">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3.5 7L7 2.33334H21L24.5 7M3.5 7V23.3333C3.5 23.9522 3.74583 24.5457 4.18342 24.9833C4.621 25.4208 5.21449 25.6667 5.83333 25.6667H22.1667C22.7855 25.6667 23.379 25.4208 23.8166 24.9833C24.2542 24.5457 24.5 23.9522 24.5 23.3333V7M3.5 7H24.5M18.6667 11.6667C18.6667 12.9043 18.175 14.0913 17.2998 14.9665C16.4247 15.8417 15.2377 16.3333 14 16.3333C12.7623 16.3333 11.5753 15.8417 10.7002 14.9665C9.825 14.0913 9.33333 12.9043 9.33333 11.6667" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
      <div data-svg-wrapper data-size="32" className="relative">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M24.3134 5.37833C23.7175 4.78217 23.01 4.30926 22.2313 3.9866C21.4526 3.66394 20.618 3.49787 19.7751 3.49787C18.9322 3.49787 18.0975 3.66394 17.3188 3.9866C16.5401 4.30926 15.8326 4.78217 15.2367 5.37833L14.0001 6.615L12.7634 5.37833C11.5597 4.17469 9.92726 3.4985 8.22506 3.4985C6.52285 3.4985 4.89037 4.17469 3.68672 5.37833C2.48308 6.58198 1.80688 8.21446 1.80688 9.91667C1.80688 11.6189 2.48308 13.2514 3.68672 14.455L14.0001 24.7683L24.3134 14.455C24.9096 13.8591 25.3825 13.1516 25.7051 12.3729C26.0278 11.5942 26.1939 10.7596 26.1939 9.91667C26.1939 9.07377 26.0278 8.23912 25.7051 7.46042C25.3825 6.68172 24.9096 5.97422 24.3134 5.37833Z" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div data-svg-wrapper data-size="32" className="relative">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.16675 14C1.16675 14 5.83341 4.66666 14.0001 4.66666C22.1667 4.66666 26.8334 14 26.8334 14C26.8334 14 22.1667 23.3333 14.0001 23.3333C5.83341 23.3333 1.16675 14 1.16675 14Z" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <path d="M14.0001 17.5C15.9331 17.5 17.5001 15.933 17.5001 14C17.5001 12.067 15.9331 10.5 14.0001 10.5C12.0671 10.5 10.5001 12.067 10.5001 14C10.5001 15.933 12.0671 17.5 14.0001 17.5Z" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      <div data-svg-wrapper data-size="32" className="relative">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25.6666 7C25.6666 5.71666 24.6166 4.66666 23.3333 4.66666H4.66659C3.38325 4.66666 2.33325 5.71666 2.33325 7M25.6666 7V21C25.6666 22.2833 24.6166 23.3333 23.3333 23.3333H4.66659C3.38325 23.3333 2.33325 22.2833 2.33325 21V7M25.6666 7L13.9999 15.1667L2.33325 7" stroke="var(--icons-color)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
    </div>
    <div className="self-stretch px-4 flex justify-center items-center gap-1">
      <div className="justify-start text-[var(--icons-color)] text-base font-normal font-['Inter'] leading-snug">
        My account
      </div>
      <SvgArrowDown />
    </div>
  </div>
);

const CategoriesSection = () => (
  <div className="self-stretch px-2 py-1 border-r border-elements-bg-dark flex justify-center items-center gap-2.5 overflow-hidden">
    <div className="w-20 self-stretch text-center justify-center text-[var(--text-color)] text-sm font-medium font-['Montserrat'] leading-none">
      Categories
    </div>
    <SvgArrowDown />
  </div>
);

const AdditionalContent = () => (
  <div className="flex-1 self-stretch px-1 flex justify-start items-start gap-2">
    {/* Additional content */}
  </div>
);

const SvgArrowDown = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="var(--white-elements-bg-ligthtext-dark-, white)"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default HeaderWrapper;
