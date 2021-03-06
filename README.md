# Mesto

Вы можете ознакомиться с проектом по следующей ссылке:https://dashnik.github.io/mesto/index.html

# В рамках девятой проектной работы были выполнены следующие пункты!

  - Был создан новый класс:  PopupWithDelete для того чтобы получить подтверждение от пользователя об удаление карточки.
  - Реализована работа с серверной частью через API. Для этого был создан отдельный класс. В рамках связи с API была установлена связь с сервером которая позволяет нам обмениваться нужной информацией в том числе загружать/отправлять :карточки, ставить/убирать лайки и изменять информацию в профиле.
  - Был улучшен UX всех форм и теперь при запросе на сервер текст кнопки изменяется на "Сохранение" при загрузке данных.

# В рамках восьмой проектной работы были выполнены следующие пункты!

  - Были созданы новые классы: Section, Popup, PopupWithImage, PopupWithForm, UserInfo и вся реализация теперь выполняется в них.
  - Реализована работа с WebPack' ом в рамках которого были созданы следущие файлы: babel.config.json,package-lock.json, package.json, postcss.config.js, webpack.config.js.
  - В рамках Webpack'а были созданы две сборки build and dev. Для работы у пользователя и на локали, соответственно.


# В рамках седьмой проектной работы были выполнены следующие пункты!

  - создан класс FormValidator, который настраивает валидацию полей.
  - создан класс Card, который создает карточку с текстом и ссылкой на изображение.
  - js скрипты были подключены с использованием type='module'


# В рамках шестой работы были выполнены следующие пункты!

  - реализована валидация форм
  - выход из формы с помощью клавиши Escape
  - закрытие попапа кликом на оверлей

### Figma

Ссылки на макеты в фигме:

* [4] - макет по четвертой проектной работе.
* [5] - макет по пятой проектной работе.
* [6] - макет по шестой проектной работе.

### О странице

Mesto это страница с профилем и с возможностью добавление новых карточек.Также у пользователя есть возможность увеличивать картинку. Пользователь имеет возможность ставить лайки карточкам и удалять их. Первые шесть карточек генеряться с помощью с помощью js из массива который присутствует в коде. 
Страница является адаптивной и готова к работе на разрешениях от 320до 1280px по ширине.

###  Улучшения

В будущем можно будет улучшить следующие моменты.

| Пункт | Улучшение |
| ------ | ------ |
| 1 | В html для элементтов использовать списки. |
| 2 | ... |


### Технологии

HTML, CSS(Flex,Grid,BEM), Javascript

### Собран веб-паком при использовании следующих пакетов
* npm i webpack --save-dev
* npm i webpack-cli --save-dev
* npm i webpack-dev-server --save-dev
* npm i @babel/core --save-dev
* npm i @babel/preset-env --save-dev
* npm i core-js --save
* npm i babel-loader --save-dev
* npm i html-webpack-plugin --save-dev
* npm i file-loader --save-dev
* npm i html-loader --save-dev
* npm i css-loader --save-dev
* npm i style-loader --save-dev
* npm i mini-css-extract-plugin --save-dev
* npm i postcss-loader --save-dev
* npm i autoprefixer --save-dev
* npm i cssnano --save-dev
* npm i rimraf --save-dev
* npm i gh-pages --save-dev
Установить разом: npm i webpack --save-dev && npm i webpack-cli --save-dev && npm i webpack-dev-server --save-dev && npm i @babel/core --save-dev && npm i @babel/preset-env --save-dev && npm i core-js --save && npm i babel-loader --save-dev && npm i html-webpack-plugin --save-dev && npm i file-loader --save-dev && npm i html-loader --save-dev && npm i css-loader --save-dev && npm i mini-css-extract-plugin --save-dev && npm i postcss-loader --save-dev && npm i autoprefixer --save-dev && npm i cssnano --save-dev && npm i rimraf --save-dev && npm i gh-pages --save-dev && npm i style-loader --save-dev


### Vendors

* Фотографии были взяты с ресурса [Unsplash].
*  Тексты написаны бесплатным шрифтом [Inter] от дизайнеров Фигмы.



   [4]: <https://www.figma.com/file/StZjf8HnoeLdiXS7dYrLAh/JavaScript.-Sprint-4> 
   [5]: <https://www.figma.com/file/nlYpT4VhFiwimn2YlncrcF/JavaScript.-Sprint-5>
   [6]: <https://www.figma.com/file/XNaGNEZD5NEjeyJzAT4gMb/JavaScript.-Sprint-6>
   [Unsplash]: <https://unsplash.com/>
   [Inter]: <https://rsms.me/inter/>



 
