"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import QrScannerImage from "@/images/Qr-Scanner.png";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";
import { useOne, HttpError } from "@refinedev/core";

const Page = () => {
  const [scanActive, setScanActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [checkStatus, setCheckStatus] = useState<
    "Check-In" | "Check-Out" | null
  >(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Function to Stop Camera
  const stopCamera = () => {
    if (videoRef.current) {
      const stream = videoRef.current.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      videoRef.current.srcObject = null;
    }
  };

  useEffect(() => {
    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, []);

  // Fetch student verification when QR code is scanned
  const { data, isLoading, isError } = useOne({
    resource: `student/verify-student-visit-key/${qrData}`,
   
    queryOptions: {
      enabled: !!qrData, // Only fetch when qrData is available
      onSuccess: () => {
        setVerifying(false);
        const today = new Date().toISOString().split("T")[0]; // Get today's date
        const lastVisitDate = localStorage.getItem("lastVisitDate");

        if (lastVisitDate === today) {
          setCheckStatus("Check-Out"); // If already checked in today, show "Check-Out"
        } else {
          setCheckStatus("Check-In");
          localStorage.setItem("lastVisitDate", today);
        }
      },
      onError: () => {
        setVerifying(false);
        setErrorMessage("Verification failed. Please try again.");
      },
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">QR Code Scanner</h1>

        <Image
          src={QrScannerImage}
          alt="QR Scanner"
          height={180}
          width={180}
          className="mx-auto my-4"
        />

        {/* Scan QR Button */}
        <button
          className={`w-full ${
            scanActive ? "bg-red-600" : "bg-blue-600"
          } text-white font-semibold py-3 rounded-xl shadow-md transition`}
          onClick={() => {
            if (scanActive) {
              stopCamera();
              setScanActive(false);
            } else {
              setScanActive(true);
              setQrData(null); // Reset previous scan
              setErrorMessage("");
              setCheckStatus(null);
            }
          }}
        >
          {scanActive ? "Close Scanner" : "Scan QR Code"}
        </button>

        {/* QR Scanner */}
        {scanActive && (
          <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
            <Scanner
              onScan={(detectedCodes: IDetectedBarcode[]) => {
                if (detectedCodes.length > 0) {
                  setQrData(detectedCodes[0].rawValue);
                  setVerifying(true);
                  setScanActive(false);
                  stopCamera();
                }
              }}
              onError={(error: unknown) => {
                const errMsg =
                  error instanceof Error
                    ? error.message
                    : "⚠️ No QR code detected or camera not accessible.";
                setErrorMessage(errMsg);
              }}
              constraints={{
                facingMode: "environment",
              }}
              classNames={{
                container: "w-full rounded-lg",
              }}
            />
          </div>
        )}

        {/* Verifying Message */}
        {verifying && (
          <p className="mt-4 text-blue-600 font-semibold">Verifying...</p>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )}

        {/* Check-In/Check-Out Status */}
        {checkStatus && (
          <div className="mt-6 p-6 bg-green-700 text-white font-semibold rounded-xl shadow-xl w-full max-w-md">
            <p className="text-xl font-bold">✅ {checkStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
