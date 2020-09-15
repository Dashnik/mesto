
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__name-edit');
const popupCloseButton = popup.querySelector('.popup__close');

const popupCards = document.querySelector('.popup_cards');
const popupCardsOpenButton = document.querySelector('.profile__vector');
const popupCardsCloseButton = popupCards.querySelector('.popup_cards__close');



const popupToggle = function (event){
  event.preventDefault();
  popup.classList.toggle('popup_opened');
  popup.reset();
}

const popupCardsToggle = function (event){
  event.preventDefault();
  popupCards.classList.toggle('popup_opened');
  popupCards.reset();
}


popupOpenButton.addEventListener('click',popupToggle );
popupCloseButton.addEventListener('click',popupToggle );

popupCardsOpenButton.addEventListener('click', popupCardsToggle);
popupCardsCloseButton.addEventListener('click',popupCardsToggle);

//установка значений для полей в попапе

//Найти нужное поле на странице
let ProfileName = document.querySelector('.profile__name');
//извлечь оттуда текст и записать в переменную
let textProfileName = ProfileName.textContent;
//найти поле в которое хочешь записать значение на попапе
let nameInput = document.querySelector('#popupname'); 
//Присвоить текстовое значение в атрибут value в input
nameInput.setAttribute('value', textProfileName);


//Найти нужное поле на странице
let ProfileDescription = document.querySelector('.profile__description');
//извлечь оттуда текст и записать в переменную
let textProfileDescription = ProfileDescription.textContent;
//найти поле в которое хочешь записать значение на попапе
let jobInput = document.querySelector('#popupjob'); 
//Присвоить текстовое значение в атрибут value в input
jobInput.setAttribute('value', textProfileDescription);



// Находим форму в DOM
let formElement = document.querySelector('.popup'); // Воспользуйтесь методом querySelector()

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameInput = document.getElementById('popupname').value; // Воспользуйтесь инструментом .querySelector()
    let jobInput = document.getElementById('popupjob').value;// Воспользуйтесь инструментом .querySelector()

    // Получите значение полей из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей
    let newNameInput = document.querySelector('.profile__name');
    let newDescriptionInput = document.querySelector('.profile__description');
    // Вставьте новые значения с помощью textContent
    newNameInput.textContent = nameInput;
    newDescriptionInput.textContent = jobInput;

    popupToggle(evt);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);