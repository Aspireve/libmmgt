"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import QrScannerImage from "@/images/Qr-Scanner.png";
import { Scanner, IDetectedBarcode } from "@yudiel/react-qr-scanner";

const Page = () => {
  const [scanActive, setScanActive] = useState(false);
  const [qrData, setQrData] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
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
                  setQrData(detectedCodes[0].rawValue); // Extract first QR code
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
              }} // ✅ Removed `videoRef`
            />
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )}
        {/* Display Scanned QR Data */}
        {qrData && (
          <div className="mt-6 p-6 bg-green-700 text-white font-semibold rounded-xl shadow-xl w-full max-w-md">
            <p className="text-xl font-bold">✅ QR Code Scanned!</p>
            <p className="mt-3 bg-white text-green-900 p-4 rounded-lg text-lg break-words shadow-md">
              {qrData}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
