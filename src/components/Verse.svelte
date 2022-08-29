<script>
	// Internal
	import Link from 'svelte-link';
	// Scripts
	import { decodeHtml } from '../scripts/common-scripts';
	// Stores
	import { searched } from '../stores/search-stores';

	export let verse;
	export let payloadType;
	export let opacity;

	let start = 0,
		end = 0,
		linkTitle = '';

	if (payloadType === 'searched') {
		// Get context for the aya by finding where to provide the start and end
		// for previous and next ayats
		searched.subscribe((surah) => {
			const ayaNumber = parseInt(surah.ayaNumber);
			if (ayaNumber - 2 <= 1) {
				start = 1;
			} else {
				start = ayaNumber - 2;
			}
			end = ayaNumber + 2 < surah.ayatCount ? ayaNumber + 2 : surah.ayatCount;

			linkTitle = `Get context for this aya in ${decodeHtml(surah.arabicName)}`;
		});
	}
</script>

{#if payloadType === 'searched'}
	<div class="main-quote py-4 my-2 border-2 border-slate-50 bg-amber-50 rounded items-center">
		<div class="my-2 text-3xl px-5 text-slate-700 text-center font-cormorant">
			{verse.quranic_text}
		</div>
		<div
			class="my-2 text-3xl px-5 text-slate-600 text-center underline decoration-wavy  decoration-sky-100 font-cormorant"
		>
			{decodeHtml(verse.translation)}
		</div>
		<div class="text-4xl my-1 text-slate-500 text-center font-cormorant">
			{verse.surah_number}:{verse.aya_number}
		</div>
		<div class="text-xl mt-2 text-slate-800 text-center font-cormorant wrap-center">
			<a
				href="https://www.quran.com/{verse.surah_number}/{start}-{end}"
				title={linkTitle}
				target="_blank"
			>
				<svg
					class="h-8 w-8 text-gray-300 hover:text-gray-600"
					viewBox="0 0 32 32"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" /> <line x1="12" y1="16" x2="12" y2="12" />
					<line x1="12" y1="8" x2="12.01" y2="8" /></svg
				>
			</a>
		</div>
	</div>
{:else if payloadType === 'similar'}
	<div
		class="similar-verse grid grid-cols-12 py-4 my-2 border-2 border-slate-50 rounded items-center text-xl text-slate-800 opacity-{opacity} hover:border-slate-200"
	>
		<div class="col-span-1 wrap-right">
			<aside class="col-span-1 text-center">
				<Link
					href={`/surah/${verse.surah_number}:${verse.aya_number}`}
					class="hover:underline hover:decoration-sky-500"
					title="Find verses similar to this aya"
				>
					<svg
						class="h-8 w-8 text-gray-200 hover:text-gray-600"
						width="24"
						height="24"
						viewBox="0 0 24 24"
						stroke-width="2"
						stroke="currentColor"
						fill="none"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<path stroke="none" d="M0 0h24v24H0z" /> <circle cx="10" cy="10" r="7" />
						<line x1="7" y1="10" x2="13" y2="10" /> <line x1="10" y1="7" x2="10" y2="13" />
						<line x1="21" y1="21" x2="15" y2="15" /></svg
					>
				</Link>
			</aside>
		</div>
		<aside class="col-span-1 text-center">
			<!-- <Link
				href={`/surah/${verse.surah_number}:${verse.aya_number}`}
				class="hover:underline hover:decoration-sky-500"
				> -->
			{verse.surah_number}:{verse.aya_number}
			<!-- </Link> -->
		</aside>
		<main class="col-span-10">
			<div class="text-right px-5 text-2xl">{verse.quranic_text}</div>
			<div class="my-2 px-5">{decodeHtml(verse.translation)}</div>
			<!-- <div>{verse.similarity} {opacity}</div> -->
		</main>
	</div>
{/if}

<style>
	.main-quote {
		border-left: 5px solid #ccc;
		border-right: 5px solid #ccc;
		border-bottom-left-radius: 18px;
		border-top-right-radius: 18px;
	}
	.wrap-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.wrap-right {
		display: flex;
		justify-content: right;
		align-items: right;
	}
</style>
