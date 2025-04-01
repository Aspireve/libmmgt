import React, { useState } from 'react';
import { QrReader, QrReaderProps } from 'react-qr-reader';

interface LocationData {
  latitude: number;
  longitude: number;
}

interface ScanResult {
  studentId: string;
  timestamp: string;
  location: LocationData;
  apiResponse?: string;
}

const QrData = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = async (data: string | null) => {
    if (data) {
      try {
        setIsScanning(false);
        
        const studentId = data;
        const timestamp = new Date().toISOString();
        
        const position = await getCurrentLocation() as GeolocationPosition;
        const locationData: LocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        };

        const requestBody = {
          studentId,
          timestamp,
          location: locationData
        };

        const response = await fetch('YOUR_API_ENDPOINT', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody)
        });

        const result = await response.json();
        setScanResult({
          studentId,
          timestamp,
          location: locationData,
          apiResponse: JSON.stringify(result)
        });

      } catch (err) {
        setError('Error processing QR scan: ' + (err instanceof Error ? err.message : String(err)));
      }
    }
  };

  const handleError = (err: Error) => {
    setError('QR Scan Error: ' + err.message);
    setIsScanning(false);
  };

  const getCurrentLocation = (): Promise<GeolocationPosition> => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const startScanning = () => {
    setIsScanning(true);
    setError(null);
    setScanResult(null);
  };

  // Define props type for QrReader
  const qrReaderProps: QrReaderProps = {
    onResult: (result, error) => {
      if (result) {
        handleScan(result?.getText() || null);
      }
      if (error) {
        handleError(error as Error);
      }
    },
    videoStyle: { width: '100%' }, // Changed from 'style' to 'videoStyle'
    constraints: { facingMode: 'environment' }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Student QR Scanner</h2>
      
      {!isScanning && (
        <button 
          onClick={startScanning}
          style={{ padding: '10px 20px', marginBottom: '20px' }}
        >
          Start Scanning
        </button>
      )}

      {isScanning && (
        <div style={{ marginBottom: '20px' }}>
          <QrReader
            {...qrReaderProps}
          />
          <button 
            onClick={() => setIsScanning(false)}
            style={{ padding: '10px 20px', marginTop: '10px' }}
          >
            Stop Scanning
          </button>
        </div>
      )}

      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <h3>Scan Result:</h3>
          <p><strong>Student ID:</strong> {scanResult.studentId}</p>
          <p><strong>Timestamp:</strong> {scanResult.timestamp}</p>
          <p><strong>Location:</strong></p>
          <p>Latitude: {scanResult.location.latitude}</p>
          <p>Longitude: {scanResult.location.longitude}</p>
          {scanResult.apiResponse && (
            <p><strong>Server Response:</strong> {scanResult.apiResponse}</p>
          )}
        </div>
      )}

      {error && (
        <div style={{ color: 'red', marginTop: '20px' }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default QrData;