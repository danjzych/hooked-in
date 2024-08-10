import { useState } from 'react';
import {useCommaInput} from '@hooked-in/react'

const Comma = () => {
	const [invalidKeyCount, setInvalidKeyCount] = useState(0)
    const {value, onKeyDown, onChange} = useCommaInput('', () => setInvalidKeyCount(invalidKeyCount + 1))

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
			<input value={value} onKeyDown={onKeyDown} onChange={onChange} maxLength={10} type='numeric' />
		</section>
	);
};

export default Comma;
