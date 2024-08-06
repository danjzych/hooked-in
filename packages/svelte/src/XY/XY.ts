import { writable } from 'svelte/store';
import type { Action, ActionReturn } from 'svelte/action';

interface CursorPosition {
	x: number;
	y: number;
}

export const cursorPosition = writable<CursorPosition>({ x: 0, y: 0 });

export const XY: Action = (
	node: HTMLElement | Window = window,
): ActionReturn => {
	const updateCursorPosition = (e: Event): void => {
		const { clientX, clientY } = e as MouseEvent;
		cursorPosition.set({ x: clientX, y: clientY });
	};

	node.addEventListener('mousemove', updateCursorPosition);

	return {
		destroy: () => {
			node.removeEventListener('mousemove', updateCursorPosition);
		},
	};
};
