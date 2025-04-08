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
import { format, isAfter } from "date-fns";
import { useOne } from "@refinedev/core";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormState {
  paymentMethod: string;
  date: Date | undefined;
  receiptNo: string;
  transactionId: string;
  amount: string;
  remark: string;
}

export default function PaymentModal({ isOpen, onClose }: PaymentModalProps) {
  // const [date, setDate] = useState<Date | undefined>();
  // const [paymentMethod, setPaymentMethod] = useState("cash");
  const [formState, setFormState] = useState<FormState>({
    paymentMethod: "cash",
    date: new Date(),
    receiptNo: "",
    transactionId: "",
    amount: "",
    remark: "",
  });

  const { data } = useOne({
    resource: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value: string) => {
    setFormState((prev) => ({
      ...prev,
      paymentMethod: value,
    }));
  };

  const handleDateChange = (date: Date | undefined) => {
    setFormState((prev) => ({
      ...prev,
      date,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment with formState
    console.log("Payment submitted:", formState);
    // You can add your payment processing logic here
  };

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
              <h4 className="font-semibold">The Great Book</h4>
              <p className="text-gray-600 text-sm">01/04/2025 - 01/05/2025</p>
            </div>

            <div className="space-y-1 mb-6">
              <div className="flex justify-between">
                <span>Per Day Fees:</span>
                <span>₹2</span>
              </div>
              <div className="flex justify-between">
                <span>Total Days:</span>
                <span>5</span>
              </div>
              {/* <div className="flex justify-between">
                <span>Examination Fee:</span>
                <span>₹1,000</span>
              </div> */}
            </div>

            <div className="flex justify-between items-center">
              <div>
                <div className="font-semibold">Total Amount</div>
                <div className="text-sm text-gray-600">RAMMOGH GAYYUR ALI</div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-xl">₹10</span>
                {/* <Button
                  variant="ghost"
                  className="h-8 text-xs font-semibold text-gray-700"
                >
                  REMOVE
                </Button> */}
              </div>
            </div>
          </div>

          {/* Right side - Payment Form */}
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium">Payment Option</label>
                <Select
                  value={formState.paymentMethod}
                  onValueChange={handleSelectChange}
                >
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
                      type="button"
                      variant="outline"
                      className="w-full justify-start text-left font-normal rounded-[5px]"
                    >
                      {formState.date
                        ? format(formState.date, "PPP")
                        : "Select date"}
                      <Calendar className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto p-0 z-[9999] absolute top-full left-0 bg-white shadow-lg rounded-md"
                    align="start"
                  >
                    <CalendarComponent
                      mode="single"
                      selected={formState.date}
                      onSelect={handleDateChange}
                      disabled={(date) => isAfter(date, new Date())}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {formState.paymentMethod === "cash" ? (
                <div>
                  <label className="block mb-2 font-medium">Receipt No</label>
                  <Input
                    name="receiptNo"
                    value={formState.receiptNo}
                    onChange={handleInputChange}
                    placeholder="Enter receipt number"
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block mb-2 font-medium">
                    Transaction ID
                  </label>
                  <Input
                    name="transactionId"
                    value={formState.transactionId}
                    onChange={handleInputChange}
                    placeholder="Enter transaction ID"
                    required
                  />
                </div>
              )}

              <div>
                <label className="block mb-2 font-medium">Amount</label>
                <Input
                  type="number"
                  name="amount"
                  inputMode="numeric"
                  value={formState.amount}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">Remark</label>
                <Input
                  name="remark"
                  value={formState.remark}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <div>
                  <label className="block font-medium">Amount Payable</label>
                  <div className="text-2xl font-bold">₹{formState.amount}</div>
                </div>
                <Button
                  type="submit"
                  className="bg-black text-white hover:bg-black/90 px-6"
                >
                  Pay ₹{formState.amount}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
