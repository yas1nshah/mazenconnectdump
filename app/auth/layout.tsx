import Image from 'next/image';
import React from 'react';

const AuthLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <main className="min-h-screen h-full flex ">
      {/* Left Section */}
      <div className="h-screen flex-grow flex items-center justify-center">
        {children}
      </div>
      {/* Right Section */}
      <div className="h-screen  p-4 flex justify-end">
        <div className="relative h-full w-auto">
          <Image
            className="rounded-3xl h-full w-auto object-contain"
            src="/cover2.png"
            alt="Authentication Cover"
            width={1000}
            height={1000}
            draggable={false}
          />
        </div>
      </div>
    </main>
  );
};

export default AuthLayout;
