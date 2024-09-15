"use client"; 
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
  // Update the state type to allow both null and string
  const [file, setFile] = useState<string | null>(null);

  // Specify the type for the event as React.ChangeEvent<HTMLInputElement>
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];  // Use optional chaining to prevent errors if no file is selected
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));  // The file URL is a string, so the state needs to accept a string type
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col justify-center items-center">
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-6xl font-bold mb-4">skinmatch</h1>
        <p className="text-xl tracking-widest">FIND YOUR FIT</p>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-12 space-y-8">
        {/* Face Diagram with Product Images */}
        <div className="relative">
          <Image
            src="/face-diagram.svg"
            alt="Face Diagram"
            width={200}
            height={200}
          />
          <div className="absolute top-0 left-0">
            <Image src="/product1.png" alt="Product 1" width={50} height={50} />
          </div>
          <div className="absolute top-0 right-0">
            <Image src="/product2.png" alt="Product 2" width={50} height={50} />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="border-2 border-gray-500 p-6 rounded-lg">
          <label className="block text-center">
            <input
              type="file"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
              Upload Image
            </div>
            <p className="mt-2">or drop a file</p>
          </label>
          {file && <img src={file} alt="Uploaded Preview" className="mt-4" />}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 text-center text-gray-400">
        <p>Skin Concerns</p>
      </footer>
    </div>
  );
}
