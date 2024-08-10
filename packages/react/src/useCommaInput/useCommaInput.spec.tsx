import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, render, act, screen } from '@testing-library/react';
import { KeyboardEvent, FormEvent } from 'react';
import { useCommaInput } from './useCommaInput';
import userEvent from '@testing-library/user-event';

const mockPreventDefault = vi.fn();

describe('useCommaInput', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should props of value, onKeyDown, and onChange', () => {
		const initialProps = { value: '' };
		const { result } = renderHook(({ value }) => useCommaInput(value), {
			initialProps,
		});
		expect(result.current.value).toBeTypeOf('string');
		expect(result.current.onKeyDown).toBeTypeOf('function');
		expect(result.current.onChange).toBeTypeOf('function');
	});

	describe('handleKeyDown', () => {
		it('should prevent default for non-digit keystrokes', () => {
			const initialProps = { value: '' };
			const { result } = renderHook(({ value }) => useCommaInput(value), {
				initialProps,
			});
			const mockKeyboardEvent = {
				key: 'e',
				preventDefault: mockPreventDefault,
			} as unknown as KeyboardEvent<HTMLInputElement>;

			result.current.onKeyDown(mockKeyboardEvent);
			expect(mockPreventDefault).toHaveBeenCalled();
		});

		it('should invoke callback function on non-digit keystroke if passed in', () => {
			const mockCbFn = vi.fn();
			const initialProps = { value: '', cb: mockCbFn };
			const { result } = renderHook(
				({ value, cb }) => useCommaInput(value, cb),
				{
					initialProps,
				},
			);

			const mockKeyboardEvent = {
				key: 'e',
				preventDefault: mockPreventDefault,
			} as unknown as KeyboardEvent<HTMLInputElement>;

			result.current.onKeyDown(mockKeyboardEvent);
			expect(mockCbFn).toHaveBeenCalled();
		});

		it('should not prevent default for digit keystrokes', () => {
			const initialProps = { value: '' };
			const { result } = renderHook(({ value }) => useCommaInput(value), {
				initialProps,
			});

			const mockKeyboardEvent = {
				key: '1',
				preventDefault: mockPreventDefault,
			} as unknown as KeyboardEvent<HTMLInputElement>;

			result.current.onKeyDown(mockKeyboardEvent);
			expect(mockPreventDefault).not.toHaveBeenCalled();
		});
	});

	describe('handleChange', () => {
		it('should update state to formatted number with digit inputs', () => {
			const initialProps = { value: '' };
			const { result } = renderHook(({ value }) => useCommaInput(value), {
				initialProps,
			});

			const mockChangeEvent = {
				currentTarget: {
					value: '1000',
				},
			} as unknown as FormEvent<HTMLInputElement>;

			act(() => result.current.onChange(mockChangeEvent));
			expect(result.current.value).toEqual('1,000');
		});

		it('should set state to empty string (not 0) when value is empty string', () => {
			const initialProps = { value: '' };
			const { result } = renderHook(({ value }) => useCommaInput(value), {
				initialProps,
			});

			const mockChangeEvent = {
				currentTarget: {
					value: '',
				},
			} as unknown as FormEvent<HTMLInputElement>;

			act(() => result.current.onChange(mockChangeEvent));
			expect(result.current.value).toEqual('');
		});
	});

	describe('DOM integration', () => {
    it('integrates correctly with HTML input element', async () => {
      const TestComponent = () => {
        const props = useCommaInput('')

        return <input {...props} data-testid="test_input" />
      }
	  const user = userEvent.setup()

	  render(<TestComponent />)

	  const input = screen.getByTestId("test_input") as HTMLInputElement
	  await user.type(input, '1000')
	  expect(input.value).toEqual('1,000')
    })
  });
});
