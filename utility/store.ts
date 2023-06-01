import { dispatch } from "@/utility/event";

export function setLocal(key: string, value: { [key: string]: any }) {
  localStorage.setItem(key, JSON.stringify(value));
  dispatch();
}

export function parseLocal<Type = Record<string, any>>(
  key: string
): Type | null {
  return JSON.parse(localStorage.getItem(key) as string) as Type | null;
}

export function removeLocal(key: string) {
  localStorage.removeItem(key);
  dispatch();
}
