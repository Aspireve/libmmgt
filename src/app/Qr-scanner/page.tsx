"use client";
import Image from "next/image";
import React, { useState } from "react";
import QrScanner from "@/images/Qr-Scanner.png";
import { QrReader } from "react-qr-reader";

const Page = () => {
  const [scanActive, setScanActive] = useState(false);
  const [qrData, setQrData] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      {/* Card Container */}
      <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800">QR Code Scanner</h1>

        <Image
          src={QrScanner}
          alt="QR Scanner"
          height={180}
          width={180}
          className="mx-auto my-4"
        />

        {/* Scan QR Button */}
        <button
          className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
          onClick={() => {
            setScanActive(!scanActive);
            setQrData(""); // Reset scanned data when reopening scanner
            setErrorMessage("");
          }}
        >
          {scanActive ? "Close Scanner" : "Scan QR Code"}
        </button>

        {/* QR Scanner */}
        {scanActive && !qrData && (
          <div className="mt-4 bg-gray-900 rounded-lg overflow-hidden">
            <QrReader
              constraints={{ facingMode: "environment" }}
              onResult={(result, error) => {
                if (result) {
                  setQrData(result.getText?.() || "Unknown QR Data"); // Ensure getText() exists
                  setScanActive(false);
                }
                if (error) {
                  setErrorMessage("⚠️ No QR code detected or camera not accessible.");
                }
              }}
              containerStyle={{ width: "100%" }}
              videoStyle={{ width: "100%" }} // Ensure video fills container
            />
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <p className="mt-4 text-red-600 font-semibold">{errorMessage}</p>
        )}

        {/* Display Scanned QR Data */}
        {qrData && (
          <div className="mt-4 p-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg">
            <p className="text-lg">✅ QR Code Scanned!</p>
            <p className="mt-2 bg-white text-green-800 p-2 rounded">{qrData}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
