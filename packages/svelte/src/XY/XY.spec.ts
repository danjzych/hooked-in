import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { get } from 'svelte/store';
import { XY, cursorPosition } from './XY';

describe('XY', () => {
	it('should return cursor position as store', () => {
		XY(document.body);
		expect(get(cursorPosition)).toEqual({ x: 0, y: 0 });
	});
	it('should update x and y when cursor is moved', async () => {
		const user = userEvent.setup();
		XY(document.body);
		expect(get(cursorPosition)).toEqual({ x: 0, y: 0 });
		await user.pointer({ coords: { x: 10, y: 10 } });
		expect(get(cursorPosition)).toEqual({ x: 10, y: 10 });
	});
});
