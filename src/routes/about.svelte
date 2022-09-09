<h1 class="sm:text-3xl text-2xl text-center my-8 uppercase">About</h1>
<div class="gap-2 py-2 text-justify">
	<div class="md:text-xl">
		<p class="mb-5">
			The Qur'an is composed of 114 surahs (~chapters) and over 6000 ayas (~verses). Unlike a
			traditional book, the Qur'an does not follow a single narrative but is rather a non-linear
			whole with many intermingling themes that repeat throughout its verses. This is why no single
			verse can be read on its own without understanding its broader context. Due to the nature of
			its composition, this context can be spread across multiple chapters rather than within a
			single place. <!-- Another challenge with reading the Qur'an is mistranslation - not only from
			Arabic to English but also from Quranic Arabic to modern Arabic. Many words common in Arabic
			today have a meaning different from the meaning in the Qur'an. Therefore, words in the Qur'an
			are best understood in light of its own style and grammar. -->
		</p>

		<p class="">
			I built this web application to help contextualize the various verses of the Qur'an. It can
			hopefully help others find linguistically similar verses in the Qur'an to help form a more
			holistic understanding of its message and meaning.
		</p>
		<div class="max-w-screen-lg">
			<img src="screenshot-3.png" alt="Website architecture" class="mx-auto" />
		</div>
		<p class="mb-5">
			I used a machine learning model known as Word2Vec to find similar verses. A cosine similarity
			algorithm determed the distance between each verse. This permutation resulted in many million
			rows of data, which was then stemmed for reducing dimensionality. The final dataset is
			readable through an API. A cache system was added to enhance load times and reduce expensive
			calls to the database. The web application accesses this API using a front-end built in Svelte
			JS and Tailwind CSS.
		</p>
		<p>
			Front-end code is available on <a
				href="https://github.com/jawadshuaib/quran-similarity-search"
				class="underline hover:decoration-orange-400">GitHub</a
			>. Feel free to reach out:
			<a class="underline decoration-orange-400 decoration-wavy " href="https://j4wad.com"
				>Jawad Shuaib</a
			>.
		</p>
	</div>
</div>
