## Linguistically Similar Verses in the Quran

The Quran is composed of 114 surahs (~chapters) and over 6000 ayas (~verses). Unlike a traditional book, the Quran does not follow a single narrative but is rather a non-linear whole with many intermingling themes that repeat throughout its verses. This is why no single verse can be read on its own without understanding its broader context. Due to the nature of its composition, this context can be spread across multiple chapters rather than within a single place.

This web application was built to help contextualize the various verses of the Quran. It can help others find linguistically similar verses in the Quran to help form a more holistic understanding of its message and meaning.

This is the front-end portion of the app built using Svelte. The back-end API and SQL database must also be executed for it to operate.

![Alt text](static/screenshot-1.png?raw=true 'Screenshot of the front-end')

This app uses a Word2Vec machine learning model to find similar verses in the Qur'an. The app pulls the most relevant verses from an API hosted on a separate server. The front-end is built in Svelte. The API is exposed using PHP.

![Alt text](static/screenshot-2.png?raw=true 'Screenshot of the API')

Data is ranked and stored in a MySQL database with appropriate indexing to optimize for speed since there are millions of rows of data to sift through. Currently, the database is stored on Amazon RDS but it can also be hosted locally.

Feature engineering was used to remove stop words. The NLTK library was used to stem and tokenize sentences to reduce the overall sample size for more optimized and relevant results. This feature engineering was done using Python.

![Alt text](static/screenshot-3.png?raw=true 'Flowchart of the architecture')

## Features

- **Search by Keywords**: Find verses containing specific keywords.
- **Search by Verse**: Select a verse to find linguistically similar verses.
- **Save Verses**: Save your favorite verses for quick access.
- **Translation Methods**: Choose between different translation methods (e.g., English, Arabic, Arabic without stop words).
- **History**: View your search history for quick reference.
- **Settings**: Customize the app's behavior and appearance.

## API Endpoints

The app interacts with several API endpoints to fetch data:

- **Fetch Keywords Search**: [src/api/fetch-keywords-search.js](src/api/fetch-keywords-search.js)
- **Fetch Lemma Relatives**: [src/api/fetch-lemma-relatives.js](src/api/fetch-lemma-relatives.js)
- **Fetch Similar Verses**: [src/api/fetch-similar-verses.js](src/api/fetch-similar-verses.js)
- **Fetch Surah Info**: [src/api/fetch-surah-info.js](src/api/fetch-surah-info.js)
- **Fetch Verse Info**: [src/api/fetch-verse-info.js](src/api/fetch-verse-info.js)
- **Fetch Word Info**: [src/api/fetch-word-info.js](src/api/fetch-word-info.js)
- **Google Translate**: [src/api/google-translate.js](src/api/google-translate.js)

## Developing

Execute the code using the following commands:

```bash
npm run dev
```

## Building

To create a production version, simply execute the following:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

## Contact

For any inquiries, please reach out to Jawad Shuaib.
