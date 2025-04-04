"use client"

import React, { useEffect, useState } from 'react'
import { Clock, LogOut, BookOpen, BookUp, Search, Plus, Download, Calendar, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { useList } from "@refinedev/core"
import { ActivityItem } from '@/components/dashboard/modified-activity-log'


const groupActivitiesByDate = (activities: any[]) => {
  const grouped: Record<string, any[]> = {};

  activities.forEach((activity) => {
    const date = new Date(activity.timestamp);
    date.setHours(0, 0, 0, 0); // Set time to midnight
    const dateKey = date.toISOString(); // Use ISO format to ensure uniqueness

    if (!grouped[dateKey]) {
      grouped[dateKey] = [];
    }
    grouped[dateKey].push(activity);
  });

  // Sort each day's activities by original timestamp
  Object.keys(grouped).forEach((date) => {
    grouped[date].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  });

  return grouped;
};

const BookDetailsActivites = () => {
        const [searchQuery, setSearchQuery] = useState("")
          const [filter, setFilter] = useState("all")
          const [dateFilter, setDateFilter] = useState("all")
        
          const {data, isLoading, refetch} = useList({
            resource:"/student/alllog"
          })
        
          const activities = data?.data || []
        
          // Filter activities based on search query and type filter
        
        
          const filteredActivities = activities.filter((activity) => {
            const matchesSearch =
              activity.student_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
              activity.book_title?.book_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              false ||
              activity.student_id.toLowerCase().includes(searchQuery.toLowerCase())
        
            const matchesFilter = filter === "all" || activity.action === filter
        
            const today = new Date().toISOString().split("T")[0]
            const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0]
        
            const matchesDateFilter =
              dateFilter === "all" ||
              (dateFilter === "today" && activity.timestamp === today) ||
              (dateFilter === "yesterday" && activity.timestamp === yesterday) ||
              (dateFilter === "thisWeek" && new Date(activity.timestamp) >= new Date(Date.now() - 7 * 86400000))
        
            return matchesSearch && matchesFilter && matchesDateFilter
          })
        
          const groupedActivities = groupActivitiesByDate(filteredActivities)
          const sortedDates = Object.keys(groupedActivities).sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        

  return  (
  <div className="container my-6 py-6 rounded-[10px] bg-[#fff] overflow-auto">
  
  
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <Tabs defaultValue="all" className="w-full max-w-md" onValueChange={setFilter}>
            <TabsList className="grid grid-cols-5 w-full">
              <TabsTrigger value="all" className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="entry" className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span className="hidden sm:inline">In Time</span>
              </TabsTrigger>
              <TabsTrigger value="exit" className="flex items-center gap-1">
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Out Time</span>
              </TabsTrigger>
              <TabsTrigger value="borrowed" className="flex items-center gap-1">
                <BookUp className="h-4 w-4" />
                <span className="hidden sm:inline">Borrowed</span>
              </TabsTrigger>
              <TabsTrigger value="returned" className="flex items-center gap-1">
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
  
              <div className="rounded-md border border-[#E9EAEB]" 
              style={{ boxShadow: "0 0 8px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="divide-y divide-[#E9EAEB]">
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

export default BookDetailsActivites 