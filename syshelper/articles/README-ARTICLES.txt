SysHelper — статьи и новости в markdown

Структура теперь разделена:
- articles/md/      -> markdown-файлы статей
- articles/images/  -> обложки статей
- news/md/          -> markdown-файлы новостей
- news/images/      -> обложки новостей

Что поддерживается:
- красивые карточки с обложками
- сортировка по дате и просмотрам
- фильтры по категориям и тегам
- отдельные витрины: /articles и /news
- импорт локального .md файла

Чтобы добавить новый материал:
1. Положи .md в нужную папку md/
2. Добавь обложку в images/
3. Обнови manifest соответствующего раздела:
   - articles/article-manifest.js
   - news/news-manifest.js

Поля в manifest:
- id
- title
- category
- tags
- description
- updated
- author
- source
- cover
- views
- inlineContent
- featured
