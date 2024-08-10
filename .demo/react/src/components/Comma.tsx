import { useState } from 'react';
import {useCommaInput} from '@hooked-in/react'

const Comma = () => {
	const [invalidKeyCount, setInvalidKeyCount] = useState(0)
    const {value, commaInputProps, clear} = useCommaInput('', () => setInvalidKeyCount(invalidKeyCount + 1))

	return (
		<section>
			<h2>
				<code>useComma</code>
			</h2>
			<p>
                Value formatted: {value}
			</p>
			<p>
				Number of non-digit characters prevented, as tracked by callback function: {invalidKeyCount}
			</p>
			<input {...commaInputProps} maxLength={10} type='numeric' />
			<button onClick={() => clear()}>Clear input</button>
		</section>
	);
};

export default Comma;
