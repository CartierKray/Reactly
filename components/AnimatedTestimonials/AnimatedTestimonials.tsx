import { AnimatedTestimonials } from "../ui/animated-testimonials";

export function AnimatedTestimonialsDemo() {
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Gabriel",
      designation: "Product Manager at TechFlow",
      src: "/images/gabriel.webp",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Mayra",
      designation: "CTO at InnovateSphere",
      src: "/images/Mayra.webp",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Sabrina",
      designation: "Operations Director at CloudScale",
      src: "/images/sabrina.webp",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "Jozef",
      designation: "Engineering Lead at DataPro",
      src: "/images/Jozef.webp",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
