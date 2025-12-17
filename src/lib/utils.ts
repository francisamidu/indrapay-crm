import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateHeaders({
  userId = "SYSTEM",
  system = "CRM",
  env = "DEV",
  version = "1.0.0",
} = {}) {
  const timestamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\..+/, "");

  return {
    "x-transaction-id": `${system}-${env}-${timestamp}-001`,
    "x-correlation-conversation-id": `CORR-${timestamp}-${system}-${Math.random().toString(16).substring(2, 10).toUpperCase()}`,
    "x-originator-conversation-id": `ORIG-${system}-${timestamp}`,
    "x-conversation-id": `CONV-${userId}-${timestamp}`,
    "x-version": version,
    "x-source-system": system,
    "x-source-identity-token": `SYS-TOKEN-${system}-${timestamp}`,
    "channel-id": `${system}-WEB`,
  };
}
