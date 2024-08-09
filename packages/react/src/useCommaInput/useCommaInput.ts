import { useState, KeyboardEvent } from 'react';

const formatter = new Intl.NumberFormat();

const isPermissableNonPrintableKey = (e: KeyboardEvent): boolean => {
	return (
		e.metaKey ||
		e.key === 'Enter' ||
		e.key === 'Tab' ||
		e.key === 'Backspace' ||
		e.key === 'CapsLock'
	);
};

/**
 * Strips commas and reformats number to string with appropriate comma separation.
 * @param s string which is a valid number with comma separation
 */
const formatCommas = (s: string) => {
	return formatter.format(Number(s.replaceAll(',', '')));
};

export const useCommaInput = (initialValue: string, cb?: Function) => {
	const [value, setValue] = useState(initialValue);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (isPermissableNonPrintableKey(e)) return;
		if (!Number(e.key)) {
			e.preventDefault();
			if (cb) cb();
		}
	};

	const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
		const { value } = e.currentTarget;

		setValue(value ? formatCommas(value) : '');
	};

	return { value, onKeyDown: handleKeyDown, onChange: handleChange };
};
