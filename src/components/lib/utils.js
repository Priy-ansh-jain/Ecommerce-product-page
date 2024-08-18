import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"; // Ensure this path is correct and the file exists

// import animationData from "../assets/loaderAnimation.json";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
