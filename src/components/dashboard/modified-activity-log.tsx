"use client";

import { useState } from "react";
import { format, parseISO } from "date-fns";
import {
  Clock,
  LogOut,
  BookOpen,
  BookUp,
  MoreHorizontal,
  User,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface Student {
  name: string;
  id: string;
  avatar: string;
}

interface BookCopy {
  book_copy_id: string;
  book_title_uuid: string;
}
interface BookTitle {
  book_title: string;
  book_author: string;
}

interface Activity {
  id: string;
  studentName: string;
  action: "entry" | "exit" | "borrowed" | "returned";
  studentId: string;
  book_copy?: BookCopy;
  book_title?: BookTitle;
  timestamp: string;
  log_date?: string;
  date?: string;
  dueDate?: string;
  borrowDate?: string;
  duration?: string;
}

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

  const getStatusBadge = () => {
    switch (activity.action) {
      case "entry":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200"
          >
            <Clock className="h-3 w-3" />
            Check In
          </Badge>
        );
      case "exit":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200"
          >
            <LogOut className="h-3 w-3" />
            Check Out
          </Badge>
        );
      case "borrowed":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200"
          >
            <BookUp className="h-3 w-3" />
            Borrowed
          </Badge>
        );
      case "returned":
        return (
          <Badge
            variant="outline"
            className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200"
          >
            <BookOpen className="h-3 w-3" />
            Returned
          </Badge>
        );
    }
  };

  const getIcon = () => {
    switch (activity.action) {
      case "entry":
        return <Clock className="h-5 w-5 text-green-500" />;
      case "exit":
        return <LogOut className="h-5 w-5 text-blue-500" />;
      case "borrowed":
        return <BookUp className="h-5 w-5 text-purple-500" />;
      case "returned":
        return <BookOpen className="h-5 w-5 text-amber-500" />;
    }
  };

  const formatTime = (dateString: string) => {
    return format(parseISO(dateString), "h:mm a");
  };

  const formatDate = (dateString: string) => {
    return format(parseISO(dateString), "MMM dd, yyyy");
  };

  const getActivityTitle = () => {
    switch (activity.action) {
      case "entry":
        return `${activity.studentName} checked in to the library`;
      case "exit":
        return `${activity.studentName} checked out of the library`;
      case "borrowed":
        return `${activity.studentName} borrowed "${activity.book_title?.book_title}"`;
      case "returned":
        return `${activity.studentName} returned "${activity.book_title?.book_title}"`;
    }
  };

  const getActivityDetails = () => {
    switch (activity.action) {
      case "entry":
        return `Student ID: ${activity.studentId}`;
      case "exit":
        return `Duration: ${activity.duration} • Student ID: ${activity.studentId}`;
      case "borrowed":
        return `Due: ${
          activity.dueDate ? formatDate(activity.dueDate) : "N/A"
        } • Author: ${activity.book_title?.book_author}`;
      case "returned":
        return `Borrowed on: ${
          activity.borrowDate ? formatDate(activity.borrowDate) : "N/A"
        } • Author: ${activity.book_title?.book_author}`;
    }
  };

  const handleStudent = () => {
    const url = `student-page/student-profile?student_id=${activity.studentId}`;
    window.open(url, "_blank");
  };
  const handleBook = () => {
    const url = `/book-pages/book-details?book_uuid=${activity.book_copy?.book_title_uuid}`;
    window.open(url, "_blank");
  };
  return (
    <div className={`p-4 ${expanded ? "bg-muted/30" : ""}`}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getIcon()}
          <div>
            <h4 className="font-medium text-sm">{getActivityTitle()}</h4>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {formatTime(activity.timestamp)}
              </p>
              <p className="text-xs text-muted-foreground">•</p>
              <p className="text-xs text-muted-foreground">
                {getActivityDetails()}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {getStatusBadge()}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="sr-only">Toggle details</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">Student</p>
            <div className="flex items-center gap-2">
              {/* <Avatar className="h-6 w-6">
                <AvatarFallback>{activity.student.avatar}</AvatarFallback>
              </Avatar> */}
              <div>
                <span className="text-sm block">{activity.studentName}</span>
                <span className="text-xs text-muted-foreground">
                  ID: {activity.studentId}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground">
              Timestamp
            </p>
            <p className="text-sm">
              {format(parseISO(activity.timestamp), "MMM dd, yyyy h:mm a")}
            </p>
          </div>

          {activity.action === "exit" && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Duration
              </p>
              <p className="text-sm">{activity.duration}</p>
            </div>
          )}

          {(activity.action === "borrowed" ||
            activity.action === "returned") && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">Book</p>
              <div>
                <p className="text-sm font-medium">
                  {activity.book_title?.book_title}
                </p>
                <p className="text-xs text-muted-foreground">
                  By {activity.book_title?.book_author}
                </p>
                <p className="text-xs text-muted-foreground">
                  ID: {activity.book_copy?.book_copy_id}
                </p>
              </div>
            </div>
          )}

          {activity.action === "borrowed" && activity.dueDate && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Due Date
              </p>
              <p className="text-sm">{formatDate(activity.dueDate)}</p>
            </div>
          )}

          {activity.action === "returned" && activity.borrowDate && (
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground">
                Borrow Date
              </p>
              <p className="text-sm">{formatDate(activity.borrowDate)}</p>
            </div>
          )}

          <div className="md:col-span-3 flex justify-end gap-2 mt-2">
            <Button
              size="sm"
              variant="outline"
              className="h-8"
              onClick={() => handleStudent()}
            >
              <User className="h-4 w-4 mr-2" />
              View Student
            </Button>
            {(activity.action === "borrowed" ||
              activity.action === "returned") && (
              <Button
                size="sm"
                variant="outline"
                className="h-8"
                onClick={() => handleBook()}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Book
              </Button>
            )}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="h-8">
                  Actions
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Activity Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>View Details</DropdownMenuItem>
                <DropdownMenuItem>Edit Record</DropdownMenuItem>
                {activity.action === "entry" && <DropdownMenuItem>Record Check Out</DropdownMenuItem>}
                {activity.action === "borrowed" && <DropdownMenuItem>Record Return</DropdownMenuItem>}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">Delete Record</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
          </div>
        </div>
      )}
    </div>
  );
}
