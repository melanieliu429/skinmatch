"use client"; 
import { useState } from 'react';

export default function Home() {
  const [file, setFile] = useState<string | null>(null);
  const [results, setResults] = useState<any>(null);  // Store classification results

  // Handle file upload and send to FastAPI backend for classification
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(URL.createObjectURL(selectedFile));  // For previewing the uploaded image

      // Create form data and send to FastAPI API
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://localhost:8000/classify', {  // FastAPI endpoint
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      setResults(data);
    }
  };
  return (
    <div className="min-h-screen bg-black text-white p-10 flex flex-col justify-center items-center">
      <header className="text-center">
        <h1 className="text-6xl font-bold mb-4">skinmatch</h1>
        <p className="text-xl tracking-widest">FIND YOUR FIT</p>
      </header>

      <main className="flex flex-col items-center mt-12 space-y-8">
        {/* Face Diagram with Static Images */}
        <div className="relative">
          <img
            src="/face-diagram.png"  // Access the image from the public folder
            alt="Face Diagram"
            width={200}
            height={200}
          />
          <div className="absolute top-0 left-0">
            <img src="/product1.png" alt="Product 1" width={50} height={50} />
          </div>
          <div className="absolute top-0 right-0">
            <img src="/product2.png" alt="Product 2" width={50} height={50} />
          </div>
        </div>

        {/* Image Upload Section */}
        <div className="border-2 border-gray-500 p-6 rounded-lg">
          <label className="block text-center">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="bg-green-500 text-white px-4 py-2 rounded-lg cursor-pointer">
              Upload Image
            </div>
            <p className="mt-2">or drop a file</p>
          </label>
          {file && <img src={file} alt="Uploaded Preview" className="mt-4" />}
        </div>

        {/* Show classification results */}
        {results && (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-semibold">Skin Concern: {results.skin_condition}</h2>
            <h3 className="text-lg mt-4">Recommended Products:</h3>
            <ul>
              {results.recommendations.map((product: string, index: number) => (
                <li key={index} className="text-sm">{product}</li>
              ))}
            </ul>
          </div>
        )}
      </main>

      <footer className="mt-20 text-center text-gray-400">
        <p>Skin Concerns</p>
      </footer>
    </div>
  );
}
