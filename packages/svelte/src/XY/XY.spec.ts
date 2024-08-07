import { describe, it, expect } from 'vitest';
import { userEvent } from '@testing-library/user-event';
import { get } from 'svelte/store';
import { tick } from 'svelte';
import { XY } from './XY';

describe('XY', () => {
	it('should return cursor position as store', () => {
		const result = XY(document.body);
		expect(get(result)).toEqual({ x: 0, y: 0 });
	});

	it('should update x and y when cursor is moved', async () => {
		const user = userEvent.setup();
		const result = XY(document.body);
		expect(get(result)).toEqual({ x: 0, y: 0 });
		await user.pointer({ coords: { x: 10, y: 10 } });
		expect(get(result)).toEqual({ x: 10, y: 10 });
	});
});
