import { Globe } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className="w-fill bg-[#F0916F] text-[oklch(0.9711_0.0276_88.75)] text-lg p-10 px-48 relative before:absolute before:inset-0 before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMTUiLz48L3N2Zz4=')] before:opacity-100 before:mix-blend-overlay before:pointer-events-none">
        <div className="flex flex-row items-center justify-between relative z-10">
          <Globe className="size-20" />
          <div className="flex flex-col">
            <span>Designed by</span>
            <h3 className="text-7xl font-bebas-neue tracking-wider font-black">
              Mohamed Omar
            </h3>
          </div>
          <Globe className="size-20" />
        </div>
      </div>
      <main className=" flex flex-col items-center min-h-screen pt-24 mx-48">
        <span className="text-[#30627b] w-full flex flex-col items-center font-bebas-neue">
          <h1 className=" text-9xl font-black tracking-wide uppercase">
            Software Engineer
          </h1>
        </span>
      </main>
    </div>
  );
}
