import { useState, useEffect } from 'react';

/**
 * Utility hook for debouncing value changes as state.
 */
const useDebounceValue = <T>(value: T, delay: number): T => {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timeoutId);
	}, [value]);

	return debouncedValue;
};

export default useDebounceValue;
