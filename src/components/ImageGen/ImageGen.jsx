import { useEffect, useState } from "react";
import cyborgImage from "../assets/cyborg.jpg"; // Adjust the path as needed
import { GoogleGenAI, Modality } from "@google/genai";
import ShimmerUI from "./ShimmerUI"; 
const ImageGen = () => {
  const [image, setImage] = useState(cyborgImage);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const imageGen = async () => {
    const ai = new GoogleGenAI({
      apiKey: import.meta.env.VITE_GEMINI_API_KEY,
    });

    setIsLoading(true); // Start loading

    const contents = [
      {
        role: "user",
        parts: [
          {
            text: prompt,
          },
        ],
      },
    ];

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash-preview-image-generation",
        contents: contents,
        config: {
          responseModalities: [Modality.TEXT, Modality.IMAGE],
        },
      });
      const imagePart = response.candidates[0].content.parts[1];

      if (imagePart) {
        const imageData = imagePart.inlineData.data;
        const mimeType = imagePart.inlineData.mimeType;
        const dataUrl = `data:${mimeType};base64,${imageData}`;
        setImage(dataUrl);
        setPrompt(""); // Clear the prompt after generating the image
        console.log("Image successfully generated and set!");
      } else {
        console.error("No image part found in the response.");
      }
    } catch (error) {
      console.error("Error generating image:", error);
    }finally{
        setIsLoading(false); // Stop loading
    }
  };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8">
            <div className="flex items-center flex-col gap-8 md:gap-16">
                <h1 className="text-5xl sm:text-6xl md:text-7xl text-white font-semibold">Image Generator</h1>
                {isLoading ? (
                    <ShimmerUI />
                ) : (
                    <img
                        src={image}
                        alt="A generated image"
                        className="w-full max-w-lg aspect-square object-cover rounded-xl shadow-lg"
                    />
                )}
            </div>
            <div className="input flex flex-col md:flex-row items-center justify-center mt-8">
                <input
                    type="text"
                    placeholder="Enter your prompt here..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            imageGen();
                        }
                    }}
                    className="bg-gray-700 w-full md:w-2/3 h-18 rounded-full rounded-r-sm text-lg text-white/75 font-medium px-8 outline-none"
                />
                <button
                    className="gradient-button-hover w-full md:w-1/6 disabled:opacity-50"
                    onClick={imageGen}
                    disabled={isLoading}
                >
                    Generate
                </button>
            </div>
        </div>
    );
};

export default ImageGen;
