// BarcodeGenerator.tsx
"use client";

import React from "react";
import JsBarcode from "jsbarcode";

interface BarcodeGeneratorProps {
  value?: string;
  height?: number;
  fontSize?: number;
  margin?: number;
  displayValue?: boolean;
  format?: string;
  fileName?: string;
}

const BarcodeGenerator: React.FC<BarcodeGeneratorProps> = ({
  value,
  height = 50, // Reduced height for a thinner barcode
  fontSize = 12,
  margin = 5, // Reduced margin
  displayValue = true,
  format = "CODE128",
  fileName = "Barcode",
}) => {
  // Function to generate random barcode value if none provided
  const generateBarcodeValue = (): string => {
    if (value) return value;
    // Generate a random 12-digit number
    return Math.floor(100000000000 + Math.random() * 900000000000).toString();
  };

  // Function to download barcode as PNG
  const downloadBarcode = () => {
    const barcodeValue = generateBarcodeValue();
    
    // Create a canvas for the barcode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeValue, {
      format,
      displayValue,
      fontSize,
      height,
      margin,
      textMargin: 2, // Smaller text margin to make it more compact
    });

    // Convert canvas to data URL
    const barcodeDataUrl = canvas.toDataURL("image/png");
    
    // Create a download link
    const downloadLink = document.createElement("a");
    downloadLink.href = barcodeDataUrl;
    downloadLink.download = `${fileName}.png`;
    
    // Append to the document, click it, and remove it
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  // Create barcode preview on a canvas
  const renderBarcode = () => {
    const barcodeValue = generateBarcodeValue();
    
    // Create a canvas for the barcode
    const canvas = document.createElement("canvas");
    JsBarcode(canvas, barcodeValue, {
      format,
      displayValue,
      fontSize,
      height,
      margin,
      textMargin: 2,
    });
    
    return canvas.toDataURL("image/png");
  };

  return (
    <div className="flex flex-col items-center">
      <div className="mb-2">
        <img src={renderBarcode()} alt="Barcode preview" className="max-w-full" />
      </div>
      <button
        type="button"
        onClick={downloadBarcode}
        className="bg-green-500 hover:bg-green-600 transition-all duration-300 text-white rounded-md px-4 py-2 text-sm"
      >
        Download Barcode
      </button>
    </div>
  );
};

export default BarcodeGenerator;