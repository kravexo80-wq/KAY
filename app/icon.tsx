import { createBrandImage } from "@/lib/seo/brand-image";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

export default function Icon() {
  return createBrandImage({
    width: size.width,
    height: size.height,
    compact: true,
  });
}
