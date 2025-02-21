import React from "react";

const data = [
  {
    id: 1,
    orderId: "#23093",
    description: `Teacher 1 placed a new order for "Computer Networking" books.`,
    time: "12 mins ago",
  },
  {
    id: 2,
    orderId: "#23094",
    description: `Teacher 2 placed a new order for "Mathematics" books.`,
    time: "15 mins ago",
  },
  {
    id: 3,
    orderId: "#23095",
    description: `Teacher 3 placed a new order for "Biology" books.`,
    time: "18 mins ago",
  },
];

const OrderedBooks: React.FC = () => {
  return (
    <div className="w-[400px] bg-white border border-gray-300 rounded-[8px] mx-auto p-5 max-h-[291px] mt-[-1px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] overflow-y-scroll scrollbar-thin scrollbar-thumb-[#6427CB]">
      <h2 className="text-3xl font-semibold mb-4 text-[#1F2937]">
        Ordered Books
      </h2>
      <ul className="divide-y divide-gray-200">
        {data.map((item) => (
          <li key={item.id} className="flex items-start justify-between py-3">
            <div className="border-l-4 border-[#7C3AED] h-12 pl-3 mr-3">
              <span className="font-sm bg-[#F3ECFF] text-[#6427CB] rounded-full px-3 py-1">
                {item.orderId}
              </span>
              <p className="text-sm text-[#989CA4] mt-2">{item.description}</p>
            </div>
            <span className="text-[#3B82F6] text-[10px] mt-1 whitespace-nowrap">
              {item.time}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderedBooks;
