"use client";

import { useState } from "react";
import { X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useOne } from "@refinedev/core";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [paymentMethod, setPaymentMethod] = useState("cash");

  const { data } = useOne({
    resource: ""
  })

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 gap-0 bg-white">
        <div className="flex justify-between items-center p-6 pb-4">
          <div>
            <DialogTitle className="text-xl font-semibold">
              Select Payment Options
            </DialogTitle>
            {/* <p className="text-sm text-gray-500 mt-1">
              Step 2: Select Payment Options
            </p> */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-6 p-6 pt-0">
          {/* Left side - Fees Summary */}
          <div className="w-full md:w-[450px] border rounded-md p-6">
            <h3 className="font-bold text-lg mb-4">FEES SUMMARY</h3>

            <div className="mb-4">
              <h4 className="font-semibold">
                B.Y Computer Engineering - (2024-2025)
              </h4>
              <p className="text-gray-600 text-sm">Thakur Polytechnic</p>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex justify-between">
                <span>Tuition Fees:</span>
                <span>₹34,116</span>
              </div>
              <div className="flex justify-between">
                <span>Development Fees:</span>
                <span>₹3,000</span>
              </div>
              <div className="flex justify-between">
                <span>Examination Fee:</span>
                <span>₹1,000</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Total Amount</div>
                <div className="text-sm text-gray-600">RAMMOGH GAYYUR ALI</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-xl">₹38,116.00</span>
                <Button
                  variant="ghost"
                  className="h-8 text-xs font-semibold text-gray-700"
                >
                  REMOVE
                </Button>
              </div>
            </div>
          </div>

          {/* Right side - Payment Form */}
          <div className="flex-1 space-y-5">
            <div>
              <label className="block mb-2 font-medium">Payment Option</label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-full rounded-[5px] relative">
                  <SelectValue placeholder="Select payment option" />
                </SelectTrigger>
                <SelectContent className="z-[9999] absolute top-full left-0 bg-white shadow-lg rounded-md">
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="online">Online</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block mb-2 font-medium">Payment Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal rounded-[5px]"
                  >
                    {date ? format(date, "PPP") : "Select date"}
                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto p-0 z-[9999] absolute top-full left-0 bg-white shadow-lg rounded-md"
                  align="start"
                >
                  <CalendarComponent
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {paymentMethod === "cash" ? (
              <>
                <div>
                  <label className="block mb-2 font-medium">Amount</label>
                  <Input defaultValue="38,116.00" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">Receipt No</label>
                  <Input placeholder="Enter receipt number" />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block mb-2 font-medium">Amount</label>
                  <Input defaultValue="38,116.00" />
                </div>
                <div>
                  <label className="block mb-2 font-medium">
                    Transaction ID
                  </label>
                  <Input placeholder="Enter transaction ID" />
                </div>
              </>
            )}

            {/* <div>
              <label className="block mb-2 font-medium">Student Id</label>
              <Input placeholder="Enter student ID" />
            </div> */}

            <div className="flex justify-between items-center pt-4">
              <div>
                <label className="block font-medium">Amount Payable</label>
                <div className="text-2xl font-bold">₹38,116.00</div>
              </div>
              <Button className="bg-black text-white hover:bg-black/90 px-6">
                Pay ₹38,116.00
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
