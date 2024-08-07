<script lang="ts">
	import { XY } from '@hooked-in/svelte';
	import { onMount } from 'svelte';
	import type { Readable } from 'svelte/store';
	let cursorPosition: Readable<{ x: number; y: number }>;

	onMount(() => {
		cursorPosition = XY();
	});
</script>

<section>
	<h2>
		<code>useXY</code>
	</h2>
	<p>
		Cursor position within this section is {$cursorPosition?.x}, {$cursorPosition?.y}.
	</p>
</section>
