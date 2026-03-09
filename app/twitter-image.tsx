import { createBrandImage } from "@/lib/seo/brand-image";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export const alt = "Kravexo luxury modest wear social preview";

export default function TwitterImage() {
  return createBrandImage({
    width: size.width,
    height: size.height,
  });
}
