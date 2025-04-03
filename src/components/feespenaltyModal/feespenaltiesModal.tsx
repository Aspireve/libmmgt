"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import UpdateModal from "@/images/UpdateModal.png";
import PaymentModal from "../PaymentModal/PaymentModal";

interface FeesPenaltiesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeesPenaltiesModal: React.FC<FeesPenaltiesModalProps> = ({ isOpen, onClose }) => {
  const [isPaymentModalOpen, setPaymentModalOpen] = useState(false);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="p-6 w-80 bg-white rounded-[25px]">
          <div className="flex justify-between items-center">
            <DialogHeader>
              <DialogTitle className="text-[#FEA40D] flex items-center gap-2 ml-20">
                <span>
                  <Image height={40} width={30} src={UpdateModal} alt="UpdateModal" />
                </span>
                Update
              </DialogTitle>
            </DialogHeader>
          </div>
          <DialogDescription className="text-[#6B7280] text-sm text-center mt-2">
            Update status of Fees & penalties <br /> by checking the student Receipt
          </DialogDescription>
          <div className="mt-4 space-y-3">
            <Button variant="outline" className="w-full border border-blue-500 text-blue-500 rounded-[8px]">
              Waive off
            </Button>
            <Button
              onClick={() => setPaymentModalOpen(true)}
              className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-[8px]"
            >
              Fees Paid
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Render PaymentModal */}
      <PaymentModal isOpen={isPaymentModalOpen} onClose={() => setPaymentModalOpen(false)} />
    </>
  );
};

export default FeesPenaltiesModal;