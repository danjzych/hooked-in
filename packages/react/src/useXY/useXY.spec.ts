import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useXY } from './useXY';

describe('useXY', () => {
	it('should return cursor position', () => {
		const { result } = renderHook(useXY);
		expect(result.current).toEqual({ x: 0, y: 0 });
	});
	it('should update x and y when cursor is moved', async () => {
		const user = userEvent.setup();
		const { result, rerender } = renderHook(useXY);
		await user.pointer({ coords: { x: 10, y: 10 } });
		rerender();
		expect(result.current).toEqual({ x: 10, y: 10 });
	});
});
