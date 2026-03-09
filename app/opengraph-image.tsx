import { createBrandImage } from "@/lib/seo/brand-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Kravexo luxury modest wear showroom preview";

export default function OpenGraphImage() {
  return createBrandImage({
    width: size.width,
    height: size.height,
  });
}
