import Gallery from "@/components/gallery";

export default function Home() {
  const galleryImages = [
    { id: 1, photo: "/image-1.webp" },
    { id: 2, photo: "/image-2.webp" },
    { id: 3, photo: "/image-4.webp" },
    { id: 4, photo: "/image-3.webp" },
    { id: 5, photo: "/image-1.webp" },
    { id: 6, photo: "/image-5.webp" },
    { id: 7, photo: "/image-6.webp" },
    { id: 8, photo: "/image-7.webp" },
    { id: 9, photo: "/image-8.webp" },
    { id: 10, photo: "/image-9.webp" },
    { id: 11, photo: "/image-10.jpeg" },
    { id: 12, photo: "/image-11.jpeg" },
  ];
  return (
    <div className="container mx-auto font-poppins pb-10">
      <Gallery galleryImages={galleryImages} />
    </div>
  );
}
