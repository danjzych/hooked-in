import { describe, expect, it, vi, afterEach } from 'vitest';
import { renderHook, render, act, screen } from '@testing-library/react';
import { KeyboardEvent, FormEvent } from 'react';
import { useCommaInput } from './useCommaInput';
import userEvent from '@testing-library/user-event';
import { clear } from '@testing-library/user-event/dist/cjs/utility/clear.js';

const mockPreventDefault = vi.fn();

describe('useCommaInput', () => {
	afterEach(() => {
		vi.resetAllMocks();
	});

	it('should value state, props, and clear function', () => {
		const initialProps = { value: '' };
		const { result } = renderHook(({ value }) => useCommaInput(value), {
			initialProps,
		});
		expect(result.current.value).toBeTypeOf('string');
		expect(result.current.commaInputProps.onKeyDown).toBeTypeOf('function');
		expect(result.current.commaInputProps.onChange).toBeTypeOf('function');
		expect(result.current.commaInputProps.value).toBeTypeOf('string');
		expect(result.current.clear).toBeTypeOf('function');
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

			result.current.commaInputProps.onKeyDown(mockKeyboardEvent);
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

			result.current.commaInputProps.onKeyDown(mockKeyboardEvent);
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

			result.current.commaInputProps.onKeyDown(mockKeyboardEvent);
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

			act(() => result.current.commaInputProps.onChange(mockChangeEvent));
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

			act(() => result.current.commaInputProps.onChange(mockChangeEvent));
			expect(result.current.value).toEqual('');
		});
	});

	describe('clear', () => {
		it('clears input value', () => {
			const initialProps = { value: '1' };
			const { result } = renderHook(({ value }) => useCommaInput(value), {
				initialProps,
			});

			act(() => result.current.clear());
			expect(result.current.value).toEqual('');
		})
	})

	describe('DOM integration', () => {
    it('integrates correctly with HTML input element', async () => {
      const TestComponent = () => {
        const {commaInputProps, clear} = useCommaInput('')

        return (<><input {...commaInputProps} data-testid="test_input" /><button onClick={() => clear()} data-testid="clear_button" /></>)
      }
	  const user = userEvent.setup()

	  render(<TestComponent />)

	  const input = screen.getByTestId("test_input") as HTMLInputElement
	  await user.type(input, '1000')
	  expect(input.value).toEqual('1,000')

	  const clearButton = screen.getByTestId('clear_button') as HTMLButtonElement
	  await user.click(clearButton)
	  expect(input.value).toEqual('')
    })
  });
});
