import { useState } from 'react';
import { useDebounceValue } from '@hooked-in/react';

const DebounceValue = () => {
	const [inputValue, setInputValue] = useState('');
	const value = useDebounceValue(inputValue, 500);

	return (
		<section>
			<h2>
				<code>useDebounceValue</code>
			</h2>
			<p>
				Debounced value with <code>500ms</code> delay:{' '}
				{value || 'input empty'}
			</p>
			<input
				value={inputValue}
				onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
					setInputValue(e.currentTarget.value)
				}
			/>
		</section>
	);
};

export default DebounceValue;
