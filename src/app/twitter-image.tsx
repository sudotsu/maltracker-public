import { createSocialImage, socialImageSize } from "./social-image";

export const alt = "Anatomy of a hosting breach — public incident case study";
export const size = socialImageSize;
export const contentType = "image/png";

export default function TwitterImage() {
  return createSocialImage();
}
