'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="grow flex flex-col items-center mt-14">
      <h2 className="text-3xl">Something went wrong!</h2>
      <button
        onClick={() => reset()}
        className="text-lg mt-6 p-1 px-2 flex justify-center items-center shadow-md rounded-md hover:scale-105 hover:bg-neutral-300 transition-all"
      >
        Try again
      </button>
    </div>
  );
}
