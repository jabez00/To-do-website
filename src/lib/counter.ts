import { writable } from "svelte/store";

export const counter = writable(0);

export function increment() {
    counter.update((n) => n+1)
}
export function decrement() {
    counter.update((n) => n-1)
}