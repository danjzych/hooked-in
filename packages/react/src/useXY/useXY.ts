import { useEffect, useState } from 'react';

interface MousePosition {
	x: number;
	y: number;
}

/**
 * Convenience utility hook for tracking client cursor position.
 */
const useXY = () => {
	const [pos, setPos] = useState<MousePosition>({ x: 0, y: 0 });
	const updatePos = (e: MouseEvent): void => {
		setPos({ x: e.clientX, y: e.clientY });
	};

	useEffect(() => {
		window.addEventListener('mousemove', updatePos);

		return window.removeEventListener('mousemove', updatePos);
	});

	return {
		x: pos.x,
		y: pos.y,
	};
};

export default useXY;
