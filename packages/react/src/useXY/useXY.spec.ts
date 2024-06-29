import { describe, expect, it } from 'vitest';
import { renderHook } from '@testing-library/react';
import useXY from './useXY';

describe('useXY', () => {
	it('should return cursor position', () => {
		const { result } = renderHook(useXY);
		console.log(result);
	});
});
