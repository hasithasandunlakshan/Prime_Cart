import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="container flex flex-col items-center justify-center py-8 bg-gray-100">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="flex flex-col -mx-4 md:flex-row">
          <div className="px-4 md:flex-1">
            <div className="h-[460px] rounded-lg bg-gray-300 mb-4 animate-pulse"></div>

            <div className="flex justify-center h-20 gap-4">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="w-24 h-24 bg-gray-300 rounded-md animate-pulse"></div>
              ))}
            </div>
          </div>

          <div className="px-4 md:flex-1">
            <div className="h-8 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
            <div className='my-5'>
              <div className="h-4 mt-2 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
            <div className="flex mb-4">
              <div className="mr-4">
                <span className="font-bold text-gray-700">Price:</span>
                <span className="inline-block w-16 h-4 bg-gray-300 rounded-md animate-pulse"></span>
              </div>
              <div>
                <span className="font-bold text-gray-700">Availability:</span>
                <span className="inline-block w-16 h-4 bg-gray-300 rounded-md animate-pulse"></span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
              {[...Array(3)].map((_, index) => (
                <div key={index} className="p-4 border rounded-lg animate-pulse">
                  <div className="h-6 mb-2 bg-gray-300 rounded-md"></div>
                  <div className="flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 border border-gray-300 rounded-full">
                      <span className="inline-block w-12 h-4 bg-gray-300 rounded-md animate-pulse"></span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-start gap-4 mt-5 mb-5 align-middle">
              <span className="font-bold text-gray-700">Quantity:</span>
              <div className="flex items-center text-white">
                <button className="px-4 py-2 mr-2 font-bold bg-gray-500 rounded-full animate-pulse"></button>
                <span className="px-4 py-2 mr-2 font-bold bg-gray-500 rounded-xl animate-pulse"></span>
                <button className="px-4 py-2 font-bold text-white bg-gray-500 rounded-full animate-pulse"></button>
              </div>
            </div>

            <div className="flex mt-10 mb-4 w-[80%]">
              <button className="w-[100%] px-4 py-2 font-bold text-white bg-gray-500 rounded-md animate-pulse"></button>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-300">
          <nav className="flex gap-4">
            <div className="py-4 text-sm font-medium text-gray-300 border-b-2 border-gray-300 animate-pulse"></div>
          </nav>
        </div>

        <div className="grid items-start justify-start mt-8 grid-col-2 sm:mt-12">
          {Array.from({ length: 3 }).map((_, key) => (
            <div key={key}>
              <div className="h-8 mb-2 bg-gray-300 rounded-md animate-pulse"></div>
              <div className="h-4 mb-4 bg-gray-300 rounded-md animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
