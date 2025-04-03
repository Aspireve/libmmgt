"use client"

import { useState } from "react"
import { Clock, LogOut, BookOpen, BookUp, Search, Plus, Download, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ActivityItem } from "./modified-activity-log"

// Sample data for demonstration
const activities = [
  {
    id: "1",
    type: "inTime",
    student: {
      name: "Alex Johnson",
      id: "STU001",
      avatar: "AJ",
    },
    timestamp: "2025-03-29T09:15:00",
    date: "2025-03-29",
  },
  {
    id: "2",
    type: "borrowed",
    student: {
      name: "Alex Johnson",
      id: "STU001",
      avatar: "AJ",
    },
    book: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      id: "BK001",
    },
    timestamp: "2025-03-29T09:25:00",
    date: "2025-03-29",
    dueDate: "2025-04-12",
  },
  {
    id: "3",
    type: "inTime",
    student: {
      name: "Sam Wilson",
      id: "STU002",
      avatar: "SW",
    },
    timestamp: "2025-03-29T10:05:00",
    date: "2025-03-29",
  },
  {
    id: "4",
    type: "outTime",
    student: {
      name: "Alex Johnson",
      id: "STU001",
      avatar: "AJ",
    },
    timestamp: "2025-03-29T11:30:00",
    date: "2025-03-29",
    duration: "2h 15m",
  },
  {
    id: "5",
    type: "return",
    student: {
      name: "Taylor Brown",
      id: "STU003",
      avatar: "TB",
    },
    book: {
      title: "Pride and Prejudice",
      author: "Jane Austen",
      id: "BK002",
    },
    timestamp: "2025-03-29T13:45:00",
    date: "2025-03-29",
    borrowDate: "2025-03-15",
  },
  {
    id: "6",
    type: "inTime",
    student: {
      name: "Jamie Smith",
      id: "STU004",
      avatar: "JS",
    },
    timestamp: "2025-03-29T14:20:00",
    date: "2025-03-29",
  },
  {
    id: "7",
    type: "borrowed",
    student: {
      name: "Jamie Smith",
      id: "STU004",
      avatar: "JS",
    },
    book: {
      title: "1984",
      author: "George Orwell",
      id: "BK003",
    },
    timestamp: "2025-03-29T14:35:00",
    date: "2025-03-29",
    dueDate: "2025-04-12",
  },
  {
    id: "8",
    type: "outTime",
    student: {
      name: "Sam Wilson",
      id: "STU002",
      avatar: "SW",
    },
    timestamp: "2025-03-29T15:10:00",
    date: "2025-03-29",
    duration: "5h 05m",
  },
  {
    id: "9",
    type: "inTime",
    student: {
      name: "Morgan Lee",
      id: "STU005",
      avatar: "ML",
    },
    timestamp: "2025-03-28T09:30:00",
    date: "2025-03-28",
  },
  {
    id: "10",
    type: "borrowed",
    student: {
      name: "Morgan Lee",
      id: "STU005",
      avatar: "ML",
    },
    book: {
      title: "The Hobbit",
      author: "J.R.R. Tolkien",
      id: "BK004",
    },
    timestamp: "2025-03-28T09:45:00",
    date: "2025-03-28",
    dueDate: "2025-04-11",
  },
  {
    id: "11",
    type: "outTime",
    student: {
      name: "Morgan Lee",
      id: "STU005",
      avatar: "ML",
    },
    timestamp: "2025-03-28T11:15:00",
    date: "2025-03-28",
    duration: "1h 45m",
  },
  {
    id: "12",
    type: "return",
    student: {
      name: "Jordan Black",
      id: "STU006",
      avatar: "JB",
    },
    book: {
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      id: "BK005",
    },
    timestamp: "2025-03-28T14:30:00",
    date: "2025-03-28",
    borrowDate: "2025-03-14",
  },
]

// Group activities by date
const groupActivitiesByDate = (activities: any[]) => {
  const grouped: Record<string, any[]> = {}

  activities.forEach((activity) => {
    if (!grouped[activity.date]) {
      grouped[activity.date] = []
    }
    grouped[activity.date].push(activity)
  })

  // Sort each day's activities by timestamp
  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
  })

  return grouped
}

export function Activities() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filter, setFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Filter activities based on search query and type filter
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.book?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      false ||
      activity.student.id.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filter === "all" || activity.type === filter

    const today = new Date().toISOString().split("T")[0]
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]

    const matchesDateFilter =
      dateFilter === "all" ||
      (dateFilter === "today" && activity.date === today) ||
      (dateFilter === "yesterday" && activity.date === yesterday) ||
      (dateFilter === "thisWeek" && new Date(activity.date) >= new Date(Date.now() - 7 * 86400000))

    return matchesSearch && matchesFilter && matchesDateFilter
  })

  const groupedActivities = groupActivitiesByDate(filteredActivities)
  const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())

  return (
    <div className="container my-6 py-6 rounded-[10px] bg-[#fff] overflow-auto">


      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setFilter}>
          <TabsList className="grid grid-cols-5 w-full">
            <TabsTrigger value="all" className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            <TabsTrigger value="inTime" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">In Time</span>
            </TabsTrigger>
            <TabsTrigger value="outTime" className="flex items-center gap-1">
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Out Time</span>
            </TabsTrigger>
            <TabsTrigger value="borrowed" className="flex items-center gap-1">
              <BookUp className="h-4 w-4" />
              <span className="hidden sm:inline">Borrowed</span>
            </TabsTrigger>
            <TabsTrigger value="return" className="flex items-center gap-1">
              <BookOpen className="h-4 w-4" />
              <span className="hidden sm:inline">Return</span>
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Select defaultValue="all" onValueChange={setDateFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Dates</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="yesterday">Yesterday</SelectItem>
              <SelectItem value="thisWeek">This Week</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {sortedDates.map((date) => (
          <div key={date} className="space-y-4">
            <div className="sticky top-0 z-10 bg-background pt-2 pb-1">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                {new Date(date).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </h3>
              <div className="h-px bg-border mt-2"></div>
            </div>

            <div className="rounded-md border border-[#AEB1B9]">
              <div className="divide-y divide-gray-300">
                {groupedActivities[date].map((activity) => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          </div>
        ))}

        {sortedDates.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="rounded-full bg-muted p-3 mb-4">
              <Search className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-1">No activities found</h3>
            <p className="text-muted-foreground max-w-md">
              No activities match your current search and filter criteria. Try adjusting your filters or search query.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

