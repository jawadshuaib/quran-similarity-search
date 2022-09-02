## Discover Similar Verses in the Quran

Link to web application: https://quran-ml.netlify.app/

![Alt text](static/screenshot-1.png?raw=true 'Screenshot of the front-end')

This app uses a Word2Vec machine learning model to find similar verses in the Qur'an. The app pulls the most relevant verses from an API hosted on a separate server. The front-end is built in svelte. The API is exposed using PHP.

![Alt text](static/screenshot-2.png?raw=true 'Screenshot of the API')

Data is ranked and stored in a MySQL database with appropriate index to optimize for speed since there are millions of rows of data to sift through. Currently, the database is stored on Amazon RDS.

Feature engineering was used to remove stop words. NLTK library was used to stem and tokenize sentences to reduce overall sample size for more optimized and relevant results. This feature engineering was done using Python.

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

You can preview the production build with `npm run preview`.
