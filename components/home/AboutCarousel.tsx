"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const ROTATE_MS = 3000;

const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800",
    alt: "Warehouse workers and logistics operations",
  },
  {
    src: "https://images.unsplash.com/photo-1578574577315-3fbeb0cecdc2?auto=format&fit=crop&q=80&w=800",
    alt: "Shipping and warehouse distribution",
  },
  {
    src: "https://images.unsplash.com/photo-1605745341112-85968b19335b?auto=format&fit=crop&q=80&w=800",
    alt: "Delivery and freight handling",
  },
];

export function AboutCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % IMAGES.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  const current = IMAGES[index];

  return (
    <section id="about" className="border-b border-default">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-none border-2 border-default bg-muted">
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority={index === 0}
            />
          </div>
          <div>
            <h2 className="font-mono text-xl font-bold uppercase tracking-tight text-primary sm:text-2xl">
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
