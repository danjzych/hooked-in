import { describe, expect, it } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useHoldKey } from './useHoldKey';

describe('useHoldKey', () => {
	it('should return state representing whether key is held', () => {
		const input = document.createElement('input');
		const initialProps = {
			inputRef: {
				current: input,
			},
			key: 'Shift',
			delay: 300,
		};
		const { result } = renderHook(
			({ inputRef, key, delay }) => useHoldKey(inputRef, key, delay),
			{ initialProps },
		);

		expect(result.current).toBe(false);
	});

	it('should toggle state to true when key is held', async () => {
		const user = userEvent.setup();
		const input = document.createElement('input');
		const initialProps = {
			inputRef: {
				current: input,
			},
			key: 'Shift',
			delay: 300,
		};
		const { result } = renderHook(
			({ inputRef, key, delay }) => useHoldKey(inputRef, key, delay),
			{ initialProps },
		);

		//focus input
		await user.click(input);
		await act(async () => await user.keyboard('{Shift>}'));
		expect(result.current).toBe(true);
	});

	it('should return state to false when key is released', () => {});
});
