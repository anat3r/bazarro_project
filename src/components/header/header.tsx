'use client'
import React, { HTMLAttributes } from "react";
import Image from "next/image";
import logo from "../../../public/logo.svg";
import { SvgArrowDown } from "@/components/iconsSVG/icons";
import { TruckIcon, BagIcon, HeartIcon, EyeIcon, MailIcon } from "@/components/iconsSVG/icons";
import useWindowSize from "@/hooks/useWindowSize";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState, useRef } from 'react';
import { organizeProductsByCategory } from "@/lib/fake-api/functions";
import Cookies from "js-cookie";
import { setTheme } from "@/lib/actions";

export type HeaderWrapperProps = HTMLAttributes<HTMLDivElement>;

export const HeaderWrapper = ({ className, ...props }: HeaderWrapperProps) => {
  const [categories, setCategories] = useState(organizeProductsByCategory('EN', '$').map((el) => el.categoryName))
  const { width, height } = useWindowSize();

  return (
    <div
      className={`
        self-stretch 
        h-32 
        bg-[var(--elements-bg)] 
        flex 
        flex-col 
        justify-start 
        items-center 
        ${className}
      `}
      {...props}
    >
      <HeaderContainer>
        <LogoSection />
        <SearchSection categories={categories} />
        <AccountSection windowWidth={width} />
      </HeaderContainer>
      <MainNavWrapper>
        <CategoriesSection />
        <AdditionalContent />
      </MainNavWrapper>
    </div>
  );
};

const HeaderContainer = ({ children }: { children: React.ReactNode }) => (
  <header className="self-stretch  flex-1 max-w-full py-3 flex justify-center items-start gap-2">
    <div className="flex-1 self-stretch px-4 flex justify-start items-center gap-2">
      {children}
    </div>
  </header>
);

const MainNavWrapper = ({ children }: { children: React.ReactNode }) => (
  <nav className="self-stretch h-12 py-0.5 border-t border-[var(--border-color)] flex justify-center items-center overflow-hidden">
    <div className="flex-1 self-stretch max-w-full flex justify-start items-center">
      {children}
    </div>
  </nav>
);

const LogoSection = () => (
  <section className="self-stretch pl-1 pr-6 flex flex-col justify-center items-center gap-2.5 overflow-hidden">
    <Link rel="prev" href={'/'} className="w-28 h-6 flex flex-col justify-start items-start gap-2.5">
      <Image
        src={logo}
        alt="Logo"
        width={112}
        height={24}
        className="self-stretch h-6 object-cover" 
      />
    </Link>
  </section>
);

interface SearchSectionProps {
  categories: string[];
}

const SearchSection = ({ categories }: SearchSectionProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const params = new URLSearchParams({
      category: selectedCategory,
    }).toString();

    const searchPath = `/search/${encodeURIComponent(searchQuery.trim())}?${params}`;
    router.push(searchPath);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <section className="flex-1 self-stretch px-2 py-1.5 flex flex-col justify-center items-center gap-2.5">
      <div className="self-stretch flex justify-start items-start max-h-full">
        <div className="flex-1 h-full flex flex-col justify-start items-start gap-2">
          <div className="self-stretch flex-1 max-h-full min-w-60 px-4 py-3 bg-[var(--elements-bg)] border-1 border-[var(--border-color)] flex justify-start items-center overflow-hidden">
            <input
              type="text"
              placeholder="Type here..."
              className="w-full bg-transparent outline-none text-[var(--text-color)] placeholder-[var(--icons-color)] text-sm font-['Inter']"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyPress}
              aria-label="Search input"
            />
          </div>
        </div>

        <div className="relative z-100 w-44 overflow-visible self-stretch bg-[var(--elements-bg)] border-1 border-[var(--border-color)]">
          <button
            className="w-full px-4 py-2.5 flex justify-between items-center gap-1"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            aria-haspopup="listbox"
            aria-expanded={isDropdownOpen}
          >
            <span className="text-[var(--text-color)] text-sm font-['Lato']">
              {selectedCategory || 'Select Category'}
            </span>
            <SvgArrowDown color="var(--icons-color)" />
          </button>

          {isDropdownOpen && (
            <ul
              className="absolute z-100  w-full mt-1 bg-[var(--elements-bg)] border-1 border-[var(--border-color)]"
              role="listbox"
            >
              {categories.map((category) => (
                <li
                  key={category}
                  className="px-4 py-2 hover:bg-[var(--site-color)] cursor-pointer"
                  onClick={() => {
                    setSelectedCategory(category);
                    setIsDropdownOpen(false);
                  }}
                  role="option"
                  aria-selected={selectedCategory === category}
                >
                  <span className="text-[var(--text-color)] text-sm font-['Lato']">
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          className="self-stretch p-3 bg-[var(--site-color)] flex justify-center items-center gap-2 overflow-hidden hover:opacity-90 transition-opacity"
          onClick={handleSearch}
          aria-label="Perform search"
        >
          <span className="text-[var(--text-color)] text-base font-medium font-['Montserrat']">
            Search
          </span>
        </button>
      </div>
    </section>
  );
};  

const AccountSection = ({ windowWidth }: { windowWidth: number }) => {
  const [activePopup, setActivePopup] = useState<'parcels' | 'messages' | 'account' | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [theme, setLocalTheme] = useState(Cookies.get('theme')?.split('-')[0] || 'browser-theme'.split('-')[0])
  const themeHandler = async () =>{
      const new_theme = (theme == "ligth" || theme == "browser") ? "dark" : "ligth";
      document.body.classList.add(`${new_theme}-theme`); 
      document.body.classList.remove(`${theme}-theme`);
      await setTheme(new_theme)
      setLocalTheme(new_theme)
    }

  const handleMouseEnter = (popupType: 'parcels' | 'messages' | 'account') => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActivePopup(popupType);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActivePopup(null);
    }, 200);
  };

  return (
    <div className="w-auto self-stretch max-w-96 min-w-fit flex justify-between items-center relative">
      {windowWidth > 800 ? (
        <>
          <div className="self-stretch px-2 flex justify-start items-center gap-6">
            {/* Parcels Icon with Popup */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('parcels')}
              onMouseLeave={handleMouseLeave}
            >
              <TruckIcon
                className={`hover:text-[var(--site-color)] transition-colors ${activePopup === 'parcels' ? 'text-[var(--site-color)]' : ''
                  }`}
                color="currentColor"
              />
              {activePopup === 'parcels' && (
                <div
                  ref={popupRef}
                  className="absolute top-full left-0 mt-2 z-50"
                  onMouseEnter={() => handleMouseEnter('parcels')}
                  onMouseLeave={handleMouseLeave}
                >
                  <ParcelsPopup />
                </div>
              )}
            </div>

            {/* Messages Icon with Popup */}
            <div
              className="relative cursor-pointer"
              onMouseEnter={() => handleMouseEnter('messages')}
              onMouseLeave={handleMouseLeave}
            >
              <MailIcon
                className={`hover:text-[var(--site-color)] transition-colors ${activePopup === 'messages' ? 'text-[var(--site-color)]' : ''
                  }`}
                color="currentColor"
              />
              {activePopup === 'messages' && (
                <div
                  className="absolute top-full left-0 mt-2 z-50"
                  onMouseEnter={() => handleMouseEnter('messages')}
                  onMouseLeave={handleMouseLeave}
                >
                  <MessagesPopup />
                </div>
              )}
            </div>

            {/* Other Icons */}
            <BagIcon className="hover:text-[var(--site-color)] transition-colors" color="var(--icons-color)" />
            <HeartIcon className="hover:text-[var(--site-color)] transition-colors" color="var(--icons-color)" />
            <div className="relative cursor-pointer" onClick={themeHandler}>
              <EyeIcon className="hover:text-[var(--site-color)] transition-colors" color="var(--icons-color)" />
            </div>
          </div>

          {/* Account Dropdown */}
          <div
            className="relative cursor-pointer"
            onMouseEnter={() => handleMouseEnter('account')}
            onMouseLeave={handleMouseLeave}
          >
            <button className="cursor-pointer self-stretch min-w-fit px-4 flex justify-center items-center gap-1 hover:text-[var(--site-color)] transition-colors">
              <div className="text-[var(--icons-color)] text-base font-normal font-['Inter'] leading-snug">
                My account
              </div>
              <SvgArrowDown color="var(--icons-color)" />
            </button>

            {activePopup === 'account' && (
              <div
                className="absolute top-full right-0 mt-2 z-50"
                onMouseEnter={() => handleMouseEnter('account')}
                onMouseLeave={handleMouseLeave}
              >
                <AccountPopup />
              </div>
            )}
          </div>
        </>
      ) : (
        // Mobile version
        <div className="relative">
          <button className="self-stretch flex min-w-fit px-4 justify-center items-center gap-1 hover:text-[var(--site-color)] transition-colors">
            <div className="text-[var(--icons-color)] text-base font-normal font-['Inter'] leading-snug">
              Actions
            </div>
            <SvgArrowDown color="var(--icons-color)" />
          </button>
        </div>
      )}
    </div>
  );
};

// Модифицированные попапы
const ParcelsPopup = () => (
  <div className="w-64 bg-[var(--elements-bg)] shadow-lg rounded border border-[var(--border-color)]">
    <div className="p-4 border-b border-[var(--border-color)]">
      <h3 className="text-[var(--text-color)] font-medium">My Parcels</h3>
    </div>
    <div className="p-4">
      <p className="text-[var(--text-color)] mb-2">You have no parcels!</p>
      <button className="text-[var(--contrast-color)] hover:underline">
        See Purchase History
      </button>
    </div>
  </div>
);

const MessagesPopup = () => (
  <div className="w-64 bg-[var(--elements-bg)] shadow-lg rounded border border-[var(--border-color)]">
    <div className="p-4">
      <p className="text-[var(--text-color)]">You have no messages</p>
    </div>
    <button className="w-full p-4 border-t border-[var(--border-color)] hover:bg-[var(--page-bg)]">
      <span className="text-[var(--contrast-color)]">Show all</span>
    </button>
  </div>
);

const AccountPopup = () => (
  <div className="w-64 bg-[var(--elements-bg)] shadow-lg rounded border border-[var(--border-color)]">
    <div className="grid grid-cols-2 border-b border-[var(--border-color)]">
      <button className="cursor-pointer p-2 border-r border-[var(--border-color)] hover:bg-[var(--page-bg)]">
        Purchases
      </button>
      <button className="p-2 hover:bg-[var(--page-bg)] cursor-pointer">Account</button>
    </div>
    <div className="p-2">
      {['Purchase history', 'Buy again', 'Favorites'].map((item) => (
        <button
          key={item}
          className="cursor-pointer w-full p-2 text-left hover:bg-[var(--page-bg)] rounded"
        >
          {item}
        </button>
      ))}
    </div>
  </div>
);

const CategoriesSection = () => (
  <div className="self-stretch px-2 py-1  flex justify-center items-center gap-2.5 overflow-hidden">
    <div className="w-20 justify-center text-[var(--text-color)] text-sm text-center font-medium font-['Montserrat']">
      Categories
    </div>
    <SvgArrowDown color="var(--icons-color)" />
  </div>
);

const AdditionalContent = () => (
  <div className="flex-1 self-stretch px-1 flex justify-start items-start gap-2">
    {/* Additional content */}
  </div>
);


export default HeaderWrapper;
