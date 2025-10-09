"use client";
 

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center p-40">
      <div className="loader">
        <div className="row"></div>
        <div className="row"></div>
        <div className="row"></div>
        <div className="row"></div>
      </div>
      <p className="text-white mt-8 text-lg tracking-widest animate-pulse">
        Loading...
      </p>
    </div>
  );
}
