<script lang="ts">
	import { XY, cursorPosition } from '@hooked-in/svelte';
</script>

<section use:XY>
	<h2>
		<code>useXY</code>
	</h2>
	<p>
		Cursor position within this section is {$cursorPosition.x}, {$cursorPosition.y}.
	</p>
</section>
