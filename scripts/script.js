const popup = document.querySelector(".popup");
const popupOpenButton = document.querySelector(".profile__name-edit");
const popupCloseButton = popup.querySelector(".popup__close");

const popupCards = document.querySelector(".popup_cards");
const popupCardsOpenButton = document.querySelector(".profile__vector");
const popupCardsCloseButton = popupCards.querySelector(".popup_cards__close");

const popupToggle = function (event) {
  event.preventDefault();
  popup.classList.toggle("popup_opened");
  popup.reset();
};

const popupCardsToggle = function (event) {
  event.preventDefault();
  popupCards.classList.toggle("popup_opened");
  popupCards.reset();
};

popupOpenButton.addEventListener("click", popupToggle);
popupCloseButton.addEventListener("click", popupToggle);

popupCardsOpenButton.addEventListener("click", popupCardsToggle);
popupCardsCloseButton.addEventListener("click", popupCardsToggle);

//установка значений для полей в попапе

//Найти нужное поле на странице
let ProfileName = document.querySelector(".profile__name");
//извлечь оттуда текст и записать в переменную
let textProfileName = ProfileName.textContent;
//найти поле в которое хочешь записать значение на попапе
let nameInput = document.querySelector("#popupname");
//Присвоить текстовое значение в атрибут value в input
nameInput.setAttribute("value", textProfileName);

//Найти нужное поле на странице
let ProfileDescription = document.querySelector(".profile__description");
//извлечь оттуда текст и записать в переменную
let textProfileDescription = ProfileDescription.textContent;
//найти поле в которое хочешь записать значение на попапе
let jobInput = document.querySelector("#popupjob");
//Присвоить текстовое значение в атрибут value в input
jobInput.setAttribute("value", textProfileDescription);

// Находим форму в DOM
let formElement = document.querySelector(".popup"); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Находим поля формы в DOM
  let nameInput = document.getElementById("popupname").value; // Воспользуйтесь инструментом .querySelector()
  let jobInput = document.getElementById("popupjob").value; // Воспользуйтесь инструментом .querySelector()

  // Получите значение полей из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей
  let newNameInput = document.querySelector(".profile__name");
  let newDescriptionInput = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  newNameInput.textContent = nameInput;
  newDescriptionInput.textContent = jobInput;

  popupToggle(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);

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
  for (let i = 0; i < initialCards.length; i++) {
    const htmlElement = itemTemplate.cloneNode(true);
    htmlElement.querySelector(".image").src = initialCards[i].link;
    htmlElement.querySelector(".image").alt = initialCards[i].name;
    htmlElement.querySelector(".rectangle__title").textContent =
      initialCards[i].name;
    htmlElement.querySelector('.rectangle').setAttribute('id', i);
     htmlElement.querySelector('.rectangle__like').addEventListener('click', function(evt){
        evt.target.classList.toggle('song__like_active');});
     
    list.append(htmlElement);
  }
  setListeners();
}
renderItems();


///////Добавление картинки в дефолтный массив

function createNewPlace(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  //Чтение значения из инпута Название
  let nameNewPlaceInput = document.querySelector("#popupCards").value;

  //Чтение значения из инпута Ссылка
  let linkNewPlaceInput = document.querySelector("#popuplink").value;

  //Добавление инпута Названия и Ссылки в дефолтный массив
  let addingValueToArray = {
    name: nameNewPlaceInput,
    link: linkNewPlaceInput,
  };

  initialCards.splice(0, 0, addingValueToArray);
  //Закрытие попапа с добавлением картинки
  popupCardsToggle(evt);

  //Очистка страницы от старого массива с местами
  list.innerHTML = "";
  //Рендер нового массива
  renderItems();
}

// Находим форму в DOM
let formSubmitPlaces = document.querySelector(".popup_cards"); // Воспользуйтесь методом querySelector()

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formSubmitPlaces.addEventListener("submit", createNewPlace);



//Удаление карточек из массива
function removeCard(event){
 const index = event.target.parentNode.getAttribute('id');
 initialCards.splice(index,1);
 list.innerHTML = "";
 //Рендер нового массива
 renderItems();
}


function setListeners(){
  document.querySelectorAll('.cardTrash').forEach((btn)=>{
      btn.addEventListener('click',removeCard);
    })
}