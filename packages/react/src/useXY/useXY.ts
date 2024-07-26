import { useEffect, useState } from 'react';

interface CursorPosition {
	x: number;
	y: number;
}

/**
 * Convenience utility hook for tracking client cursor position.
 */
export const useXY = (): CursorPosition => {
	const [pos, setPos] = useState<CursorPosition>({ x: 0, y: 0 });
	const updateCursorPosition = (e: MouseEvent): void => {
		setPos({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		window.addEventListener('mousemove', updateCursorPosition);

		return () =>
			window.removeEventListener('mousemove', updateCursorPosition);
	}, []);

	return {
		x: pos.x,
		y: pos.y,
	};
};
