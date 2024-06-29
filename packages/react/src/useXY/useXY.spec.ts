import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import useXY from './useXY';

describe('useXY', () => {
	it('should return cursor position', () => {
		const { result } = renderHook(useXY);
		expect(result.current).toEqual({ x: 0, y: 0 });
	});
});
