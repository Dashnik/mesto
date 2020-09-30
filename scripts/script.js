const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = popup.querySelector(".popup__close");

const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const popupCardsCloseButton = popupCards.querySelector(".popup_cards__close");

const popupImageCloseButton = document.querySelector(".popupImage__close");

const cardTemplate = document.querySelector(".cardTemplate").content;
const list = document.querySelector(".elements");
const popupImage = document.querySelector(".popupImage");

function handleToggle(NameOfClass, value) {
  NameOfClass.classList.toggle(value);
  NameOfClass.reset();
}

function fillProfile() {
  //Найти нужное поле на странице и извлечь оттуда текст и записать в переменную
  const textProfileName = document.querySelector(".profile__name").textContent;
  document.querySelector("#popupname").setAttribute("value", textProfileName);

  //Найти поле с описанием на странице и извлечь оттуда текст и записать в переменную
  const profileDescription = document.querySelector(".profile__description")
    .textContent;
  document.querySelector("#popupjob").setAttribute("value", profileDescription);
}

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

  handleToggle(popup, "popup_opened");
}

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
  handleToggle(popupCards, "popup_opened");

  //Очистка страницы от старого массива с местами
  list.innerHTML = "";
  //Рендер нового массива с новым элементом
  renderItems();
}

//Удаление карточек из массива
function removeCard(event) {
  const index = event.target.parentNode.getAttribute("id");
  initialCards.splice(index, 1);
  list.innerHTML = "";
  //Рендер нового массива
  renderItems();
}

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

popupOpenButton.addEventListener("click", function () {
  fillProfile();
  handleToggle(popup, "popup_opened");
});
popupCloseButton.addEventListener("click", function () {
  handleToggle(popup, "popup_opened");
});

popupCardsOpenButton.addEventListener("click", function () {
  handleToggle(popupCards, "popup_opened");
});
popupCardsCloseButton.addEventListener("click", function () {
  handleToggle(popupCards, "popup_opened");
});

popupImageCloseButton.addEventListener("click", function () {
  handleToggle(popupImage, "popupImage_active");
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener("submit", formSubmitHandler);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupCards.addEventListener("submit", createNewPlace);

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

function renderItems() {

  extractItems();
  // PutInArray(list)
}
renderItems();

function extractItems() {
  const elements = [];
  
  for (let i = 0; i < initialCards.length; i++) {
    const htmlElement = cardTemplate.cloneNode(true);
    const cardimage = htmlElement.querySelector(".card__image");
    const cardTitle = htmlElement.querySelector(".card__title");
    const card = htmlElement.querySelector(".card");
    const cardTrash = htmlElement.querySelector(".card__trash");
    const cardLike = htmlElement.querySelector(".card__like");

    cardimage.src = initialCards[i].link;
    cardimage.alt = initialCards[i].name;
    cardTitle.textContent = initialCards[i].name;
    card.setAttribute("id", i);
    cardTrash.addEventListener("click", removeCard);
    cardimage.addEventListener("click", handleImageIncrease);
    cardLike.addEventListener("click", function (evt) {
      evt.target.classList.toggle("song__like_active");
    });
    list.append(htmlElement);
  }
}

function createCard(name, link){
  const htmlElement = cardTemplate.cloneNode(true);
  const cardimage = htmlElement.querySelector(".card__image");
  const cardTitle = htmlElement.querySelector(".card__title");
  const card = htmlElement.querySelector(".card");
  const cardTrash = htmlElement.querySelector(".card__trash");
  const cardLike = htmlElement.querySelector(".card__like");

  
  cardimage.src = initialCards[i].link;
  cardimage.alt = initialCards[i].name;
  cardTitle.textContent = initialCards[i].name;
  card.setAttribute("id", i);
  cardTrash.addEventListener("click", removeCard);
  cardimage.addEventListener("click", handleImageIncrease);
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("song__like_active");
  });

}

function Test(){
  createCard();
  list.append(element);
}
