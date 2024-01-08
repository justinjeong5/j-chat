import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export default function () {
    return {};
}

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
