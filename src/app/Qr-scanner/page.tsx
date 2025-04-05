"use client";
import React, { useState, useRef, useEffect } from "react";
// import Image from "next/image";
// import QrScannerImage from "@/images/Qr-Scanner.png";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [scanActive, setScanActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [checkStatus, setCheckStatus] = useState<string | null>(null);

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
    if (scanActive) {
      stopCamera();
      setScanActive(false);
    } else {
      setScanActive(true);
      setQrData(null); // Reset previous scan

      setCheckStatus(null);
    }
    return () => {
      stopCamera(); // Cleanup on unmount
    };
  }, []);

  // Fetch student verification when QR code is scanned
  const { data, isLoading, isError } = useOne({
    resource: `student/verify-student-visit-key/${qrData}`,
    queryOptions: {
      enabled: !!qrData, // Only fetch when qrData is available
      onSuccess: (response) => {
        setVerifying(false);

        const apiMessage = response?.data?.message;

        if (apiMessage === "Exit log updated successfully") {
          setCheckStatus("✅ Check-Out Successful");
        } else if (apiMessage === "Visit log entry created successfully") {
          setCheckStatus("✅ Check-In Successful");
        } else {
          setCheckStatus(null);
          toast("Unexpected API response. Please try again.")
          // setErrorMessage("Unexpected API response. Please try again.");
        }
      },
      onError: () => {
        setVerifying(false);
        // setErrorMessage("Verification failed. Please try again.");
        toast("Verification failed. Please try again.")
      },
    },
  });

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        {/* <h1 className="text-2xl font-bold text-gray-800">QR Code Scanner</h1>

        <Image
          src={QrScannerImage}
          alt="QR Scanner"
          height={180}
          width={180}
          className="mx-auto my-4"
        />

        {/* Scan QR Button */}
        {/* <button
          className={`w-full ${scanActive ? "bg-red-600" : "bg-blue-600"
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
        </button> */}

        {/* QR Scanner */}
        {scanActive && (
          <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden absolute inset-0">
            <Scanner
              onScan={(detectedCodes) => {
                if (detectedCodes.length > 0) {
                  setQrData(detectedCodes[0].rawValue);
                  setVerifying(true);
                  setScanActive(false);
                  stopCamera();
                }
              }}
              onError={(error) => {
                const errMsg =
                  error instanceof Error
                    ? error.message
                    : "⚠️ No QR code detected or camera not accessible.";
                router.push("/")
                toast(errMsg)
              }}
              constraints={{
                facingMode: "environment",
              }}
              classNames={{
                container: "w-full ",
              }}
            />
          </div>
        )}

        {/* Verifying Message */}
        {verifying && (
          <p className="mt-4 text-blue-600 font-semibold">Verifying...</p>
        )}

        {/* Error Message */}
        {/* {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )} */}

        {/* Check-In/Check-Out Status */}
        {checkStatus && (
          <div className="mt-6 p-6 bg-green-700 text-white font-semibold rounded-xl shadow-xl w-full max-w-md">
            <p className="text-xl font-bold">{checkStatus}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
