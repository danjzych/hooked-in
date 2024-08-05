import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import useDebounceValue from './useDebounceValue';

describe('useDebounceValue', () => {
	beforeAll(() => {
		vi.useFakeTimers();
	});
	afterAll(() => {
		vi.useRealTimers();
	});

	it('returns updated value (state) after delay', () => {
		const initialProps = { value: 'banana', delay: 300 };
		const { result, rerender } = renderHook(
			({ value, delay }) => useDebounceValue(value, delay),
			{ initialProps },
		);
		expect(result.current).toBe('banana');

		rerender({ value: 'apple', delay: 300 });

		//advance timer for duration less than delay
		act(() => {
			vi.advanceTimersByTime(100);
		});
		expect(result.current).toBe('banana');

		//advance timer beyond delat
		act(() => {
			vi.advanceTimersByTime(201);
		});
		expect(result.current).toBe('apple');
	});
});
