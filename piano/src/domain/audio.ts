import { Optional } from "./types";

// ! which takes no arguments and returns Optional<AudioContextType>.
export function accessContext(): Optional<AudioContextType> {
	return window.AudioContext || window.webkitAudioContext || null
}