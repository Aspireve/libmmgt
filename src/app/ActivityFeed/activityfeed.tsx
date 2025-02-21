import React from "react";
import { Button } from "@/components/ui/button"; 
import { ChevronDown } from "lucide-react"; 

const data = [
  {
    key: "1",
    name: "John Brown",
    avatar: "https://randomuser.me/api/portraits/men/10.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "12 mins ago",
  },
  {
    key: "2",
    name: "Jane Doe",
    avatar: "https://randomuser.me/api/portraits/women/20.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "15 mins ago",
  },
  {
    key: "3",
    name: "Michael Smith",
    avatar: "https://randomuser.me/api/portraits/men/30.jpg",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    time: "18 mins ago",
  },
];

const ActivityFeed: React.FC = () => {
  return (
    <div className="bg-white shadow-md border border-gray-300 rounded-[8px] w-[700px] h-[400px]  p-5 relative ml-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Today's Activity</h1>
        <Button variant="outline" className="flex items-center text-gray-500">
          Filter By <ChevronDown className="ml-1 h-4 w-4" />
        </Button>
      </div>

      {/* Activity List */}
      <div className="mt-4 space-y-4">
        {data.map((item) => (
          <div key={item.key} className="flex items-center">
            {/* Custom Avatar */}
            <div className="mr-4 inline-block h-10 w-10 rounded-full overflow-hidden">
              <img
                src={item.avatar}
                alt={item.name}
                className="object-cover w-full h-full"
              />
            </div>

            {/* Activity details */}
            <div className="flex-1">
              <div className="font-bold">{item.name}</div>
              <div className="text-gray-500">{item.description}</div>
            </div>
            <div className="text-blue-500">{item.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
