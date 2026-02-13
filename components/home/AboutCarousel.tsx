"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ROTATE_MS = 3000;

const IMAGES = [
  { src: "/shipping1.jpg", alt: "Delivery truck and road freight" },
  { src: "/shipping2.jpg", alt: "Container ships and cranes at port" },
  { src: "/shipping3.jpg", alt: "Air cargo and ground logistics" },
  { src: "/shipping4.jpg", alt: "Delivery and shipping" },
];

export function AboutCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="about" className="border-b border-default">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full min-h-[280px] sm:min-h-[340px] overflow-hidden rounded-none border-2 border-default bg-muted">
            <div
              className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
              style={{
                width: `${IMAGES.length * 100}%`,
                transform: `translateX(-${index * (100 / IMAGES.length)}%)`,
              }}
            >
              {IMAGES.map((img, i) => (
                <div
                  key={img.src}
                  className="relative h-full flex-shrink-0"
                  style={{ width: `${100 / IMAGES.length}%` }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    priority={i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-mono text-2xl font-bold uppercase tracking-tight text-accent sm:text-3xl">
              About Us
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              We are a global logistics partner dedicated to moving your goods reliably and visibly
              across air, ocean, and ground. With decades of experience and a network of hubs
              worldwide, we combine technology and hands-on operations to deliver tracking you can
              trust and service you can depend on. From first-mile pickup to final delivery, we keep
              your supply chain moving.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
