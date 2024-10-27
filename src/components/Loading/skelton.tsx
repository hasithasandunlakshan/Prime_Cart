// SkeletonLoader.tsx
import React from 'react';

const SkeletonLoader = () => {
    return (
        <div className="relative flex flex-col w-full max-w-xs m-10 overflow-hidden bg-white border border-gray-100 rounded-lg shadow-md">
            {/* Skeleton for image */}
            <div className="relative flex mx-3 mt-3 overflow-hidden bg-gray-300 h-60 rounded-xl animate-pulse"></div>
            <div className="px-5 pb-5 mt-4">
                {/* Skeleton for title */}
                <div className="h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
                {/* Skeleton for price */}
                <div className="h-6 mb-2 bg-gray-300 rounded animate-pulse"></div>
                {/* Skeleton for rating */}
                <div className="flex items-center mb-5">
                    <div className="h-6 mr-2 bg-gray-300 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                {/* Skeleton for button */}
                <div className="flex items-center justify-center h-10 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
        </div>
    );
};

export default SkeletonLoader;
