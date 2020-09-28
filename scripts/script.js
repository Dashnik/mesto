const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = popup.querySelector(".popup__close");

const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const popupCardsCloseButton = popupCards.querySelector(".popup_cards__close");

const popupImageCloseButton = document.querySelector(".popupImage__close");


// const handleToggle = function (NameOfClass, value) {
//   NameOfClass.classList.toggle(value);
//   NameOfClass.reset();
// };
 function handleToggle(NameOfClass, value) {
  NameOfClass.classList.toggle(value);
  NameOfClass.reset();
};

popupOpenButton.addEventListener("click", function(){
  fillProfile();
  handleToggle(popup,'popup_opened');
});
popupCloseButton.addEventListener("click", function(){
  handleToggle(popup,'popup_opened');
});

popupCardsOpenButton.addEventListener("click",  function(){
  handleToggle(popupCards,'popup_opened');
});
popupCardsCloseButton.addEventListener("click",  function(){
  handleToggle(popupCards,'popup_opened');
});

popupImageCloseButton.addEventListener("click", function(){
  handleToggle(popupImage,'popupImage_active');
});





function fillProfile(){
  //Найти нужное поле на странице и извлечь оттуда текст и записать в переменную
  const textProfileName = document.querySelector(".profile__name").textContent;
  //у меня не получилось использовать ваш код const nameInput.value = profileName.textContent  поэтому теперь так,
  //зато кода действительно стало меньше
  //найти поле в которое хочешь записать значение на попапе и установить ему значение из нужного тебе поля
  /*const nameInput =*/ document
    .querySelector("#popupname")
    .setAttribute("value", textProfileName);

  //Найти поле с описанием на странице и извлечь оттуда текст и записать в переменную
  const profileDescription = document.querySelector(".profile__description")
    .textContent;
  document.querySelector("#popupjob").setAttribute("value", profileDescription);

}

////////////////////////////////////this part was obsolete if this work will be accepted so this code should be removed/////////////////////////////
// const popupToggle = function () {
//   //Найти нужное поле на странице и извлечь оттуда текст и записать в переменную
//   const textProfileName = document.querySelector(".profile__name").textContent;
//   //у меня не получилось использовать ваш код const nameInput.value = profileName.textContent  поэтому теперь так,
//   //зато кода действительно стало меньше
//   //найти поле в которое хочешь записать значение на попапе и установить ему значение из нужного тебе поля
//   /*const nameInput =*/ document
//     .querySelector("#popupname")
//     .setAttribute("value", textProfileName);

//   //Найти поле с описанием на странице и извлечь оттуда текст и записать в переменную
//   const profileDescription = document.querySelector(".profile__description")
//     .textContent;
//   document.querySelector("#popupjob").setAttribute("value", profileDescription);

//   popup.classList.toggle("popup_opened");
//   popup.reset();
// };

// const popupCardsToggle = function () {
//   //event.preventDefault();
//   popupCards.classList.toggle("popup_opened");
//   popupCards.reset();
// };

//popupOpenButton.addEventListener("click", popupToggle);
//popupCloseButton.addEventListener("click", popupToggle);

//popupCardsOpenButton.addEventListener("click", popupCardsToggle);
//popupCardsCloseButton.addEventListener("click", popupCardsToggle);

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Находим поля формы в DOM
  const nameInput = document.getElementById("popupname").value; // Воспользуйтесь инструментом .querySelector()
  const jobInput = document.getElementById("popupjob").value; // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  const newNameInput = document.querySelector(".profile__name");
  const newDescriptionInput = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  newNameInput.textContent = nameInput;
  newDescriptionInput.textContent = jobInput;

  handleToggle(popup,'popup_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener("submit", formSubmitHandler);


///////Добавление картинки в дефолтный массив

function createNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  //Чтение значения из инпута Название
  const nameNewPlaceInput = document.querySelector("#popupCards").value;

  //Чтение значения из инпута Ссылка
  const linkNewPlaceInput = document.querySelector("#popuplink").value;

  //Добавление инпута Названия и Ссылки в дефолтный массив
  const addingValueToArray = {
    name: nameNewPlaceInput,
    link: linkNewPlaceInput,
  };

  initialCards.splice(0, 0, addingValueToArray);
  //Закрытие попапа с добавлением картинки
  handleToggle(popupCards,'popup_opened');

  //Очистка страницы от старого массива с местами
  list.innerHTML = "";
  //Рендер нового массива
  renderItems();
}

// Находим форму в DOM
//const formSubmitPlaces = document.querySelector(".popup_cards"); // Воспользуйтесь методом querySelector()
//formSubmitPlaces.addEventListener("submit", createNewPlace);


// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupCards.addEventListener("submit", createNewPlace);
//Удаление карточек из массива
function removeCard(event) {
  const index = event.target.parentNode.getAttribute("id");
  initialCards.splice(index, 1);
  list.innerHTML = "";
  //Рендер нового массива
  renderItems();
}

function setListeners() {
  document.querySelectorAll(".cardTrash").forEach((btn) => {
    btn.addEventListener("click", removeCard);
  });

  document.querySelectorAll(".image").forEach((btn) => {
    btn.addEventListener("click", handleImageIncrease);
  });  

  document.querySelectorAll(".rectangle__like").forEach((btn) => {
    btn.addEventListener("click", function (evt) {
           evt.target.classList.toggle("song__like_active");
        });
  });  
};


const popupImage = document.querySelector(".popupImage");

//Переключатель для увеличения картинки на главной форме
function handleImageIncrease(event) {
  popupImage.classList.toggle("popupImage_active");
  const index = event.target.parentNode.getAttribute("id");
  const text = initialCards[index];
  const valueFromLink = document.querySelector(".popupImage__bigImage");
  valueFromLink.src = text.link;
  valueFromLink.alt = text.name;

  const valueFromName = document.querySelector(".popupImage__caption");
  valueFromName.textContent = text.name;
}

////////////////////////////////////this part was obsolete if this work will be accepted so this code should be removed/////////////////////////////
//const popupImageCloseButton = document.querySelector(".popupImage__close");

////////////////////////////////////this part was obsolete if this work will be accepted so this code should be removed/////////////////////////////
// const popupImageToggle = function (event) {
//   popupImage.classList.toggle("popupImage_active");
//   popupImage.reset();
// };
//popupImageCloseButton.addEventListener("click", popupImageToggle);


////////////////////////////////////this part was obsolete if this work will be accepted so this code should be removed/////////////////////////////
// popupImageCloseButton.addEventListener("click", function(){
//   handleToggle(popupImage,'popupImage_active');
// });


// Дефолтные картинки при загрузке страницы
const initialCards = [
  {
    name: "Одесса",
    link:
      "https://images.unsplash.com/photo-1600352761482-96c43e9088ab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Лондон",
    link:
      "https://images.unsplash.com/photo-1600362189809-aad4924fbd6a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Израиль",
    link:
      "https://images.unsplash.com/photo-1600356381284-f331cdd4a9c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Горы в Италии",
    link:
      "https://images.unsplash.com/photo-1600352751860-f4ba11b3f170?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Норвегия",
    link:
      "https://images.unsplash.com/photo-1600256698643-1d9345bfd9ee?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
  {
    name: "Калифорния",
    link:
      "https://images.unsplash.com/photo-1600230825276-1d770a31f29c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=282&h=282&q=80",
  },
];

const itemTemplate = document.querySelector(".placesTemplate").content;
const list = document.querySelector(".elements");

function renderItems() {
  extractItems();
  setListeners();
}
renderItems();


function extractItems(){
  for (let i = 0; i < initialCards.length; i++) {
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector(".image").src = initialCards[i].link;
    htmlElement.querySelector(".image").alt = initialCards[i].name;
    htmlElement.querySelector(".rectangle__title").textContent =
      initialCards[i].name;
    htmlElement.querySelector(".rectangle").setAttribute("id", i);
    list.append(htmlElement);
  }
}


