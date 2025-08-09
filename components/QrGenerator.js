'use client'; // ضروري إذا كنت تستخدم Next.js 13+ مع دليل `app/`
import { useState } from 'react';
import QRCode from 'qrcode.react';

export default function QrGenerator() {
  const [url, setUrl] = useState('https://example.com'); // الرابط الافتراضي
  const [size, setSize] = useState(200); // حجم الـ QR

  return (
    <div className="p-4 text-center">
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="أدخل الرابط هنا"
        className="p-2 border rounded mb-4 w-full max-w-md"
      />
      
      <div className="mb-4">
        <label className="block mb-2">حجم الـ QR: </label>
        <input
          type="range"
          min="100"
          max="300"
          value={size}
          onChange={(e) => setSize(parseInt(e.target.value))}
          className="w-full max-w-md"
        />
      </div>

      <div className="flex justify-center">
        <QRCode
          value={url}
          size={size}
          fgColor="#3B82F6" // لون المربعات (أزرق)
          bgColor="#ffffff" // لون الخلفية
        />
      </div>
    </div>
  );
}
