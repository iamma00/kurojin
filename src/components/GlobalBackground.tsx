"use client";

import Image from "next/image";

export default function GlobalBackground() {
  return (
    <div className="fixed w-full h-full overflow-hidden">
      {/* The path must start with '/' which points directly to the public folder */}
      <Image
        src="/images/globally.png"
        alt="Background Image"
        fill
        className="object-cover w-full h-full"
        priority

      />
    </div>
  );
}