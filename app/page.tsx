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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-4 sm:p-8 flex flex-col justify-center items-center">
      <header className="relative text-center">
        {/* Static skin harmony title */}
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-tight text-gray-100">skin harmony</h1>
       


        <div className="absolute top-0 right-0 transform -translate-y-4 translate-x-6">
          <img src="/sparkle.png" alt="Sparkle" className="w-10 h-10 opacity-80 animate-spin-slow" />
        </div>


        {/* Typing effect for FIND YOUR FIT */}
        <p className="text-xl sm:text-2xl lg:text-3xl tracking-widest centered-typing text-gray-300">FIND YOUR FIT</p>
      </header>


      <main className="flex flex-col lg:flex-row justify-center items-center mt-10 lg:mt-14 space-y-8 lg:space-y-0 lg:space-x-12">
        {/* Face Diagram with Staggered Images */}
        <div className="relative w-[300px] sm:w-[350px] lg:w-[400px] h-[300px] sm:h-[350px] lg:h-[400px] bg-gray-800 rounded-xl p-4 shadow-lg hover:scale-105 transition-transform duration-500">
          <img
            src="/face-diagram.png"
            alt="Face Diagram"
            className="w-full h-full object-cover rounded-lg"
          />


          {/* Product 1 - Biore UV */}
          <div className="absolute top-10 left-4 sm:left-8 transition-transform transform hover:scale-105">
            <img src="/biore.png" alt="Product 1" className="w-[60px] sm:w-[70px] lg:w-[80px]" />
          </div>


          {/* Product 2 - Hada Labo */}
          <div className="absolute top-4 right-5 sm:right-10 transition-transform transform hover:scale-105">
            <img src="/hadalabo.png" alt="Product 2" className="w-[40px] sm:w-[50px] lg:w-[60px]" />
          </div>


          {/* Product 3 - Senka Perfect Whip */}
          <div className="absolute top-[35%] right-6 transition-transform transform hover:scale-105">
            <img src="/senka.png" alt="Product 3" className="w-[50px] sm:w-[60px] lg:w-[70px]" />
          </div>


          {/* Product 4 - Naturie Lotion */}
          <div className="absolute bottom-20 left-8 transition-transform transform hover:scale-105">
            <img src="/naturie.png" alt="Product 4" className="w-[40px] sm:w-[50px] lg:w-[70px]" />
          </div>


          {/* Product 5 - DHC Lip Cream */}
          <div className="absolute bottom-16 right-2 transition-transform transform hover:scale-105">
            <img src="/dhc.webp" alt="Product 5" className="w-[70px] sm:w-[80px] lg:w-[100px]" />
          </div>
        </div>


        {/* Image Upload Section with Larger Container */}
        <div className="backdrop-blur-md bg-white/10 border border-white/20 p-6 rounded-xl shadow-xl w-[300px] sm:w-[350px] lg:w-[400px] h-[250px] sm:h-[300px] lg:h-[350px] flex flex-col justify-center items-center">
          <label className="block text-center">
            <input type="file" className="hidden" onChange={handleFileChange} />
            <div className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors duration-300 shadow-md">
              Upload Image
            </div>
            <p className="mt-2 text-sm text-gray-400">or drag a file here</p>
          </label>
          {file && <img src={file} alt="Uploaded Preview" className="mt-4 rounded-lg shadow-md" />}
        </div>
      </main>


      {/* Show classification results */}
      {results && (
        <div className="text-center mt-10">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-100">Skin Concern: {results.skin_condition}</h2>
          <h3 className="text-lg sm:text-xl mt-4 text-gray-300">Recommended Products:</h3>
          <ul className="text-sm sm:text-base text-gray-400">
            {/* {results.recommendations.map((product: string, index: number) => (
              <li key={index}>{product}</li>
            ))} */}
            Pair Acne Cream W
            Cosrx All In One Snail Cream
            {/* result.recommendations.map((<li key = "Pair Acne Cream W" />
            <li key = "Cosrx All In One Snail Cream" />)) */}
          </ul>
        </div>
      )}


      <style jsx>{`
        .centered-typing {
          font-family: 'Inter', sans-serif;
          white-space: nowrap;
          overflow: hidden;
          display: inline-block;
          margin: 0 auto;
          animation: typing 4s steps(20) infinite, blink 0.75s step-end infinite;
        }
       
        @keyframes typing {
          from { width: 0; opacity: 0; }
          to { width: 100%; opacity: 1; }
        }


        @keyframes blink {
          50% { border-color: transparent; }
        }


        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}



