import React from "react";
import totalBooksIcon from "../../images/Total_Books.png";
import borrowedBooksIcon from "../../images/Borrowed_Books.png";
import lostBooksIcon from "../../images/Lost_Books.png";
import availableBooksIcon from "../../images/Available_Books.png";
import Image from "next/image";

const data = [
  {
    title: "Total Books",
    value: 500,
    description: "new books in the library.",
    color: "#2288FF",
    icon: (
      <Image
        src={totalBooksIcon.src}
        alt="Total Books"
        className="w-[60px] h-[60px]"
      />
    ),
  },
  {
    title: "Borrowed Books",
    value: 78,
    description: "books borrowed.",
    color: "#FFC107",
    icon: (
      <Image
        src={borrowedBooksIcon.src}
        alt="Borrowed Books"
        className="w-[60px] h-[60px]"
      />
    ),
  },
  {
    title: "Lost Books",
    value: 50,
    description: "books lost.",
    color: "#F44336",
    icon: (
      <Image
        src={lostBooksIcon.src}
        alt="Lost Books"
        className="w-[60px] h-[60px]"
      />
    ),
  },
  {
    title: "Available Books",
    value: "10,000",
    description: "books are available in the library.",
    color: "#4CAF50",
    icon: (
      <Image
        src={availableBooksIcon.src}
        alt="Available Books"
        className="w-[60px] h-[60px]"
      />
    ),
  },
];

const BookCards: React.FC = () => {
  return (
    <div className="-mt-[18px] mb-5">
      <div className="max-w-[400px] ml-[30px] mt-5 h-[500px]">
        <div className="grid grid-cols-1 gap-4">
          {data.map((item) => (
            <div
              key={item.title}
              className="border-2 rounded-xl h-[95px] flex items-center gap-4 p-4"
              style={{ borderColor: item.color }}
            >
              {item.icon}
              <div>
                <div
                  className="text-[24px] font-bold"
                  style={{ color: item.color }}
                >
                  {item.title}
                </div>
                <div className="text-[rgba(0,0,0,0.45)]">
                  <span className="font-bold">{item.value}</span> {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookCards;
