import { useEffect, useState, useImperativeHandle } from 'react';
import { useDebounceValue } from '../index';

export const useHoldKey = (
	inputRef: React.RefObject<HTMLInputElement>,
	key: string,
	delay: number,
) => {
	const [_isHeld, setIsHeld] = useState(false);
	const isHeld = useDebounceValue(_isHeld, delay);

	const handleKeydown = (e: KeyboardEvent) => {
		if (e.key === key) setIsHeld(true);
	};

	const handleKeyup = (e: KeyboardEvent) => {
		if (e.key === key) setIsHeld(false);
	};

	useEffect(() => {
		inputRef.current?.addEventListener('keydown', handleKeydown);
		inputRef.current?.addEventListener('keyup', handleKeyup);

		return () => {
			inputRef.current?.removeEventListener('keydown', handleKeydown);
			inputRef.current?.removeEventListener('keyup', handleKeyup);
		};
	}, [inputRef.current]);

	return isHeld;
};
