const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__name-edit");
const popupAll = document.querySelectorAll(".popup");
const overlay = document.querySelector(".overlay");
const page = document.querySelector(".page");
const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const popupCardsCloseButton = popupCards.querySelector(".popup_cards__close");
const popupImageCloseButton = document.querySelector(".popupImage__close");
const cardTemplate = document.querySelector(".cardTemplate").content;
const list = document.querySelector(".elements");
const popupImage = document.querySelector(".popupImage");
const popupAllIconTrash = document.querySelectorAll(".card__trash");
const parentCards = document.querySelector(".elements");

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  popup.reset();
  overlay.classList.remove("overlay_visible");
  document.removeEventListener("keyup", toggleEsc);

}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.reset();
  overlay.classList.add("overlay_visible");
  document.addEventListener("keyup", toggleEsc);
}

function toggleEsc(event) {
  if (event.key === "Escape") {
    popupAll.forEach(function (item){
      closePopup(item);
    })
  }
}

function fillProfile() {
  //Найти нужное поле на странице и извлечь оттуда текст и записать в переменную
  const textProfileName = document.querySelector(".profile__name").textContent;
  document
    .querySelector(".popup__item_profile_name")
    .setAttribute("value", textProfileName);

  //Найти поле с описанием на странице и извлечь оттуда текст и записать в переменную
  const profileDescription = document.querySelector(".profile__description")
    .textContent;
  document
    .querySelector(".popup__item_profile_job")
    .setAttribute("value", profileDescription);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // Находим поля формы в DOM
  const nameInput = document.querySelector(".popup__item_profile_name").value; // Воспользуйтесь инструментом .querySelector()
  const jobInput = document.querySelector(".popup__item_profile_job").value; // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  const newNameInput = document.querySelector(".profile__name");
  const newDescriptionInput = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  newNameInput.textContent = nameInput;
  newDescriptionInput.textContent = jobInput;

  //togglePopupVisibility(popup, "popup_opened");
  closePopup(popup);
}

///////Добавление картинки в дефолтный массив
function createNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  //Чтение значения из инпута Название
  const nameNewPlaceInput = document.querySelector(".popup__item_input_name")
    .value;

  //Чтение значения из инпута Ссылка
  const linkNewPlaceInput = document.querySelector(".popup__item_input_url")
    .value;

  //Добавление инпута Названия и Ссылки в дефолтный массив
  const addingValueToArray = {
    name: nameNewPlaceInput,
    link: linkNewPlaceInput,
  };
  const newPlace = createCard(addingValueToArray.name, addingValueToArray.link);

  closePopup(popupCards);
  //добавление нового элемента на страницу
  addCard(list, newPlace);
}

//Удаление карточек
function removeCard(event) {
  const cardChild = event.target.parentNode;
  parentCards.removeChild(cardChild);
}

//Переключатель для увеличения картинки на главной форме
function handleImageIncrease(event) {
  const valueFromName = document.querySelector(".popupImage__caption");
  const valueFromLink = document.querySelector(".popupImage__bigImage");
  openPopup(popupImage);
  const dataFromCard = event.target;
  valueFromLink.src = dataFromCard.src;
  valueFromLink.alt = dataFromCard.alt;
  valueFromName.textContent = dataFromCard.alt;
}


popupAll.forEach(function (item) {
  item.addEventListener("click", function (event) {
    if (event.target.classList.contains("popup__close")) {
      closePopup(item);
    }
  });
  overlay.addEventListener("click", function (event) {
    if (event.target == overlay) {
      closePopup(item);
    }
  });
});

popupOpenButton.addEventListener("click", function () {
  fillProfile();
  openPopup(popup);
});

popupCardsOpenButton.addEventListener("click", function () {
  openPopup(popupCards);
});

//////////////////////////обработчики событий для попапов//////////////////////
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popup.addEventListener("submit", formSubmitHandler);

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupCards.addEventListener("submit", createNewPlace);

// Дефолтные картинки при загрузке страницы

const createCard = (name, link, index) => {
  const cardElement = cardTemplate.cloneNode(true);
  const cardimage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardTrash = cardElement.querySelector(".card__trash");
  const cardLike = cardElement.querySelector(".card__like");
  const card = cardElement.querySelector(".card");

  cardimage.src = link;
  cardimage.alt = name;
  cardTitle.textContent = name;
  card.setAttribute("id", index);
  cardTrash.addEventListener("click", removeCard);
  cardimage.addEventListener("click", handleImageIncrease);
  cardLike.addEventListener("click", function (evt) {
    evt.target.classList.toggle("card__like_active");
  });

  return cardElement;
};

const addCard = (container, cardElement) => {
  container.prepend(cardElement);
};

function renderNew() {
  initialCards.forEach(function (card, index) {
    const cardElement = createCard(card.name, card.link,index);

    addCard(list, cardElement);
  });
}
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
renderNew();
