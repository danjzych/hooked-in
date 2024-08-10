import { useState } from 'react';
import {useCommaInput} from '@hooked-in/react'

const Comma = () => {
	const [invalidKeyCount, setInvalidKeyCount] = useState(0)
    const props = useCommaInput('', () => setInvalidKeyCount(invalidKeyCount + 1))

	return (
		<section>
			<h2>
				<code>useComma</code>
			</h2>
			<p>
                Value formatted: {props.value}
			</p>
			<p>
				Number of non-digit characters prevented: {invalidKeyCount}
			</p>
			<input {...props} maxLength={10} />
		</section>
	);
};

export default Comma;
