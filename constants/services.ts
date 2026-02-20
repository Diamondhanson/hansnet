/**
 * Services offered by HANSNET LOGISTICS. Used on home, about, and services pages.
 * description: short summary for cards. longDescription: ~80 words for services page.
 */
export const SERVICES = [
  {
    id: "warehouse",
    title: "Warehouse",
    description:
      "Warehouse storage, pick-and-pack, and distribution from our network of hubs so your inventory is ready when you need it.",
    longDescription:
      "Our warehousing services provide secure, climate-controlled storage across a network of strategically located hubs. We handle pick-and-pack, inventory management, and distribution so your goods are ready when you need them. Whether you need short-term storage during peak seasons or ongoing fulfillment support, we scale with your business. Real-time visibility, barcode scanning, and integrated systems keep you in control of your inventory from arrival to dispatch.",
    image: "/images/services/warehousing.jpg",
  },
  {
    id: "ocean-freight",
    title: "Ocean Freight",
    description:
      "FCL and LCL ocean freight shipping across major trade lanes with customs clearance and port-to-port visibility.",
    longDescription:
      "We offer full-container (FCL) and less-than-container (LCL) ocean shipping across major global trade lanes. From origin pickup to destination delivery, we coordinate port handling, customs clearance, and inland transport. Our partnerships with leading carriers ensure competitive rates and reliable sailings. You get port-to-port visibility, documentation support, and a single point of contact for international ocean freight—whether you are moving machinery, retail goods, or industrial materials.",
    image: "/images/services/ocean-freight.jpg",
  },
  {
    id: "road-freight",
    title: "Road Freight",
    description:
      "Domestic and cross-border road freight with LTL and full truckload options, hub-to-hub tracking, and reliable transit times.",
    longDescription:
      "Our road freight services cover domestic and cross-border trucking for pallets, full truckloads, and partial loads. We operate a hub-and-spoke network with real-time tracking, so you always know where your shipment is. From expedited LTL to dedicated full-load options, we match the right equipment and carrier to your timeline and budget. Customs coordination for border crossings and proof of delivery are included so you have end-to-end visibility and documentation.",
    image: "/images/services/road-freight.jpg",
  },
  {
    id: "air-freight",
    title: "Air Freight",
    description:
      "Express international air cargo with real-time tracking, customs clearance support, and time-critical delivery options.",
    longDescription:
      "When speed matters, our air freight solutions deliver. We offer express international air cargo with real-time tracking, customs clearance support, and time-critical delivery options. From same-day airport-to-airport to door-to-door solutions, we coordinate with major carriers to secure capacity and competitive rates. Ideal for urgent shipments, perishables, high-value goods, and time-sensitive supply chains. Our team handles documentation, compliance, and last-mile delivery so your cargo moves seamlessly from origin to destination.",
    image: "/images/services/air-freight.jpg",
  },
  {
    id: "pet-transport",
    title: "Pet Transport",
    description:
      "Safe, compliant pet relocation—door-to-door or airport-to-airport—with care and documentation handled for you.",
    longDescription:
      "We specialize in safe, compliant relocation for dogs, cats, and other pets—domestically and internationally. Our door-to-door and airport-to-airport options include climate-controlled transport, veterinary documentation support, and airline coordination. We navigate breed restrictions, health certificates, and import permits so you can focus on your move. Whether relocating for work, adoption, or family reasons, we treat your pet with care and ensure they arrive healthy and on schedule. Ask about our white-glove pickup and delivery options.",
    image: "/images/services/pet-transport.jpg",
  },
  {
    id: "auto-transport",
    title: "Auto Transport",
    description:
      "Vehicle transport for cars, motorcycles, and specialty vehicles—enclosed or open carrier, domestic and international.",
    longDescription:
      "We ship cars, motorcycles, and specialty vehicles across the country and overseas. Choose enclosed transport for high-value or classic vehicles, or open carrier for cost-effective domestic moves. Our network of vetted carriers provides door-to-door pickup and delivery with insurance and tracking. We handle import and export documentation for international vehicle shipments and coordinate with ports for ocean and roll-on/roll-off services. Whether you are relocating, buying remotely, or moving a fleet, we deliver your vehicles safely and on time.",
    image: "/images/services/auto-transport.jpg",
  },
] as const;
