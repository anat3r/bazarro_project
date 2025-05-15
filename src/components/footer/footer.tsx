'use client'
import React from 'react';
import { MoonIcon, LogoIcon } from '@/components/iconsSVG/icons';
import Link from 'next/link';
import { use } from 'react';
import { localCapitalize } from '@/lib/utils';
import { setTheme, deleteTheme } from '@/lib/actions';
import Cookies from 'js-cookie';
import { useState } from 'react';
// Type definitions
interface LinkItem {
  link: string;
  title: string;
}

interface FooterSection {
  SectionName: string;
  links: LinkItem[];
}

// SVG Components


// Footer Component
interface FooterWrapperProps {
  sections: FooterSection[];
}

const FooterWrapper: React.FC<FooterWrapperProps> = ({ sections }) => {
  const [theme, setLocalTheme] = useState(Cookies.get('theme')?.split('-')[0] || 'browser-theme'.split('-')[0])
  // Validate sections array length
  if (sections.length < 1 || sections.length > 3) {
    throw new Error('FooterWrapper requires between 1 and 3 sections');
  }

  const themeHandler = async () =>{
    const new_theme = (theme == "ligth" || theme == "browser") ? "dark" : "ligth";
    document.body.classList.add(`${new_theme}-theme`); 
    document.body.classList.remove(`${theme}-theme`);
    await setTheme(new_theme)
    setLocalTheme(new_theme)
  }
  return (
    <footer className="self-stretch pt-16 flex flex-col justify-start items-center overflow-hidden">
      <div className="self-stretch bg-[var(--elements-bg)] flex justify-center items-start overflow-hidden">
        <div className="flex-1 max-w-[1440px] gap-4 w-full justify-evenly flex-wrap p-6 flex items-start">
          {/* Navigation Sections */}
          {sections.map((section, index) => (
            <section
              key={index}
              className="pl-4 pb-4 flex justify-start items-center gap-2.5"
              aria-labelledby={`section-${index}-heading`}
            >
              <div className="w-80 flex flex-col justify-start items-start overflow-hidden">
                <h2
                  id={`section-${index}-heading`}
                  className="pb-4 text-[var(--text-color)] text-2xl font-medium font-['Montserrat'] leading-loose"
                >
                  {section.SectionName}
                </h2>
                <nav aria-label={`${section.SectionName} links`}>
                  <ul className="self-stretch flex flex-col justify-start items-start gap-2 overflow-hidden">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex} className="w-full">
                        {link.link.startsWith("/") ? (
                          <Link
                            href={link.link}
                            className="block w-full text-[var(--text-color)] text-sm font-normal font-['Lato'] leading-tight hover:text-[var(--site-color)] transition-colors"
                            aria-label={link.title}
                          >
                            {link.title}
                          </Link>
                        ) : (
                          <a
                            href={link.link}
                            className="block w-full text-[var(--text-color)] text-sm font-normal font-['Lato'] leading-tight hover:text-[var(--site-color)] transition-colors"
                            aria-label={link.title}
                            rel="noopener noreferrer"
                          >
                            {link.title}
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </section>
          ))}

          {/* Settings Sections */}
          <div className="w-72 pl-4 pb-4 flex justify-start items-center gap-2.5">
            <div className="flex flex-col justify-start items-start gap-2.5 overflow-hidden">
              {/* Display Settings */}
              <section aria-labelledby="display-settings-heading">
                <h2
                  id="display-settings-heading"
                  className="pb-4 text-[var(--text-color)] text-2xl font-medium font-['Montserrat'] leading-loose"
                >
                  Display Settings
                </h2>
                <div className="self-stretch flex justify-start items-end gap-2 overflow-hidden">
                  <div
                    role="img"
                    aria-label="Theme icon"
                    className="flex justify-start items-center gap-2.5"
                  >
                    <MoonIcon color="var(--text-color)" />
                  </div>
                  <span className="text-[var(--text-color)] text-sm font-normal font-['Lato'] leading-tight">
                    Appearance:
                  </span>
                  <button
                    type="button"
                    onClick={themeHandler}
                    className="text-[var(--text-color)] text-base font-semibold font-['Montserrat'] hover:text-[var(--site-color)] transition-colors cursor-pointer"
                    aria-label={`Change theme, current theme: ${theme}`}
                  >
                    {localCapitalize(theme)}
                  </button>
                </div>
              </section>

              {/* Location Settings */}
              <section
                className="pt-4"
                aria-labelledby="location-settings-heading"
              >
                <h2
                  id="location-settings-heading"
                  className="pb-4 text-[var(--text-color)] text-2xl font-medium font-['Montserrat'] leading-loose"
                >
                  Location Settings
                </h2>
                <dl className="flex flex-col justify-start items-start gap-2 overflow-hidden">
                  <div className="flex justify-start items-end gap-2.5">
                    <dt className="text-[var(--text-color)] text-sm font-normal font-['Lato'] leading-tight">
                      Location:
                    </dt>
                    <dd className="text-[var(--text-color)] text-sm font-semibold font-['Montserrat'] leading-tight">
                      Poland
                    </dd>
                  </div>
                  {/* Repeat similar structure for other items */}
                </dl>
              </section>
            </div>
          </div>
        </div>
      </div>

      {/* Branding Section */}
      <div
        className="self-stretch bg-[var(--site-color)] flex flex-col justify-center items-center overflow-hidden"
        role="contentinfo"
        aria-label="Company branding"
      >
        <div className="px-7 py-3 flex flex-col justify-center items-end">
          <Link href={'/'} className="w-36 h-7 flex flex-col justify-center items-end gap-2.5">
            <LogoIcon
              color="var(--elements-bg)"
              aria-label="Company logo"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default FooterWrapper;