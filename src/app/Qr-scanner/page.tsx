"use client";
import React, { useState, useRef, useEffect, CSSProperties } from "react";
// import Image from "next/image";
// import QrScannerImage from "@/images/Qr-Scanner.png";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useOne } from "@refinedev/core";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [scanActive, setScanActive] = useState(true);
  const [qrData, setQrData] = useState<string | null>(null);
  // const [errorMessage, setErrorMessage] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [checkStatus, setCheckStatus] = useState<string | null>(null);
  const containerStyle: CSSProperties = {
    width: "fit",
    height: "fit"
  };
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
    if (checkStatus) {
      toast(checkStatus);
    }
  }, [checkStatus]);

  useEffect(() => {
    setQrData(null); // Reset previous scan
    setCheckStatus(null);
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
console.log("Data",response.data.meta.student_name)
        const apiMessage = response?.data?.message;

        if (apiMessage === "Exit log updated successfully") {
          setCheckStatus(`✅ ${response.data.meta.student_name} Checked-Out Successfully`);
        } else if (apiMessage === "Visit log entry created successfully") {
          setCheckStatus(`✅ ${response.data.meta.student_name} Checked-In Successfully`);
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
    <div className="flex flex-col items-center  bg-gray-100 ">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl  text-center">
        {/* <h1 className="text-2xl font-bold text-gray-800">QR Code Scanner</h1>

        <Image
          src={QrScannerImage}
          alt="QR Scanner"
          height={180}
          width={180}
          className="mx-auto my-4"
        />

        {/* Scan QR Button */}

        {/* QR Scanner */}
        {scanActive && (
          <div className="absolute top-0 left-0 right-0 bottom-0  bg-gray-900 px-20 min-[1000px]:px-[400px] ">


              <button
                className="absolute top-3 right-3 text-white bg-red-600 hover:bg-red-700 rounded-full w-12 h-12 flex items-center justify-center text-sm font-bold shadow-md z-10"
                onClick={() => {
                  stopCamera();
                  setScanActive(false);
                  router.push("/")
                }}
              >
                ✕
              </button>

            <div className="absolute  sm:relative top-0 left-0 right-0 ">
              <Scanner
                onScan={(detectedCodes) => {
                  if (detectedCodes.length > 0) {
                    setQrData(detectedCodes[0].rawValue);
                    setVerifying(true);
                  }
                }}
                onError={(error) => {
                  const errMsg =
                    error instanceof Error
                      ? error.message
                      : "⚠️ No QR code detected or camera not accessible.";
                  // router.push("/");
                  toast(` ❌ ${errMsg}`);
                }}
                constraints={{
                  facingMode: "environment",
                }}
              // classNames={{
              //   video:"w-32 h-32",
              //   container:"w-32 h-32"
              // }}
              />
            </div>
          </div>
        )}


        {/* Verifying Message */}
        {verifying && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/80 px-4 py-2 rounded-md shadow text-blue-600 font-semibold">
            Verifying...
          </div>
        )}

        {/* Error Message */}
        {/* {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )} */}

        {/* Check-In/Check-Out Status */}
        {/* {checkStatus && (
          <div className="mt-6 p-6 bg-green-700 text-white font-semibold rounded-xl shadow-xl w-full max-w-md">
          <p className="text-xl font-bold">{checkStatus}</p>
          </div>
        )} */}
        {/* {checkStatus && toast(checkStatus)} */}

      </div>
    </div>
  );
};

export default Page;
