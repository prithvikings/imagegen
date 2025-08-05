import React from 'react'
const ShimmerUI = () => {
    return (
        <div className="animate-shimmer w-full max-w-lg aspect-square rounded-xl overflow-hidden bg-gray-800 relative shadow-lg">
            <style>
                {`
                .animate-shimmer {
                    background-image: linear-gradient(to right, #2d3748 0%, #4a5568 20%, #2d3748 40%, #2d3748 100%);
                    background-size: 800px 100%;
                    animation: shimmer 1.5s infinite linear;
                }
                @keyframes shimmer {
                    0% {
                        background-position: -468px 0;
                    }
                    100% {
                        background-position: 468px 0;
                    }
                }
                `}
            </style>
        </div>
    );
};

export default ShimmerUI;