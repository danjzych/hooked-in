import { readable, Readable } from 'svelte/store';

interface CursorPosition {
	x: number;
	y: number;
}

export const XY = (
	node: HTMLElement | Window = window,
): Readable<CursorPosition> => {
	const store = readable({ x: 0, y: 0 }, (set) => {
		const updateCursorPosition = (e: Event): void => {
			const { clientX, clientY } = e as MouseEvent;
			set({ x: clientX, y: clientY });
		};

		node.addEventListener('mousemove', updateCursorPosition);

		return () => {
			node.removeEventListener('mousemove', updateCursorPosition);
		};
	});

	return store;
};
