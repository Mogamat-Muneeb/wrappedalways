import React, { useRef } from "react";

const ScrollableMenu = ({ children }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    const scrollContainer = scrollRef.current;

    if (scrollContainer) {
      const scrollAmount = 330; // Adjust this value based on your needs
      const currentScroll = scrollContainer.scrollLeft;

      if (direction === "left") {
        scrollContainer.scrollLeft = currentScroll - scrollAmount;
      } else if (direction === "right") {
        scrollContainer.scrollLeft = currentScroll + scrollAmount;
      }
    }
  };

  return (
    <div>
      <div className="absolute flex items-center justify-center overflow-hidden md:max-w-full bg-white max-w-[400px] w-fullƒ">
        <div className="relative flex items-center justify-between w-full bg-white ">
          <div
            className="bg-white cursor-pointer w-[60px]  h-14 flex justify-center items-center "
            onClick={() => handleScroll("left")}
          >
            <svg
              className="ml-auto"
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15.5"
                fill="white"
                fillOpacity="0.5"
              />
              <path
                d="M19.0075 7.75L10.8496 15.5L19.0075 23.25"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div
            ref={scrollRef}
            className="flex items-center justify-start mx-auto overflow-auto bg-white shadow-sm h-14"
          >
            {children}
          </div>
          <div
            className="bg-white cursor-pointer w-[60px] h-14  flex justify-center items-center"
            onClick={() => handleScroll("right")}
          >
            <svg
              width="31"
              height="31"
              viewBox="0 0 31 31"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="15.5"
                cy="15.5"
                r="15.5"
                transform="rotate(-180 15.5 15.5)"
                fill="white"
                fillOpacity="0.5"
              />
              <path
                d="M11.992 23.25L20.1499 15.5L11.992 7.75"
                stroke="black"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollableMenu;
