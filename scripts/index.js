const closeProfileButton = document.querySelector('.profile-form-close');
const closeAddingFormButton = document.querySelector('.adding-form-close');

const profileNameElement = document.querySelector('.profile__text_type_name');
const nameFieldElement = document.querySelector('.popup__input_type_name');

const profileOcupationElement = document.querySelector('.profile__text_type_ocupation');
const ocupationFieldElement = document.querySelector('.popup__input_type_ocupation');

const formElement = document.querySelector('.profile-form');

const editProfileButton = document.querySelector('.profile__edit-button');
const editAddButton = document.querySelector('.profile__add-button');
const popups = document.querySelectorAll(".popup");

function togglePopup(index){
  popups[index].classList.toggle("popup_opened");
}

editAddButton.addEventListener('click', function() {
  togglePopup(1);
});

editProfileButton.addEventListener('click', function() {
    togglePopup(0);
    nameFieldElement.value = profileNameElement.textContent;
    ocupationFieldElement.value = profileOcupationElement.textContent;
});

closeProfileButton.addEventListener('click', function() {
  togglePopup(0);
});

closeAddingFormButton.addEventListener('click', function() {
  togglePopup(1);
});

formElement.addEventListener('submit', function(event) {
    event.preventDefault();
    profileNameElement.textContent = nameFieldElement.value;
    profileOcupationElement.textContent = ocupationFieldElement.value;
    togglePopup(0);
});

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const elementTitleElement = document.querySelector('.element__title');
const titleFieldElement = document.querySelector('.popup__input_type_title');

const elementImageElement = document.querySelector('.element__image');
const addressFieldElement = document.querySelector('.popup__input_type_address');

const elementsGridElement = document.querySelector('.elements__grid');
const elementsAddingElement = document.querySelector('.adding-form');
const elementsInputElement = document.querySelector('.popup__input_type_title');
const elementsTemplateElement = document.querySelector('.elements-template');
const getElementByEvent = e => e.currentTarget.closest('.element');

const createElement = (title, address) => {
  const element = elementsTemplateElement.content
  .querySelector('.element')
  .cloneNode(true);

  element.querySelector('.element__title').textContent = title;
  element.querySelector('.element__image').src = address;

  element.querySelector('.element__basket').addEventListener('click', e => {
    const element = getElementByEvent(e);

    element.remove();
  });

  return element;
};

const addElement = (title, address) => {
  const element = createElement(title, address);

  elementsGridElement.prepend(element);
};

initialCards.forEach((item) => {
  addElement(item.name, item.link);
});

const handleAddingSubmit = e => {
  e.preventDefault();
  const text = elementsInputElement.value;
  const link = addressFieldElement.value;
  addElement(text, link);
  elementsAddingElement.reset();
  togglePopup(1);
};

elementsAddingElement.addEventListener('submit', handleAddingSubmit);






// elementsAddingElement.addEventListener('submit', handleAddingSubmit, function(event) {
//   event.preventDefault();
//   // profileNameElement.textContent = nameFieldElement.value;
//   // profileOcupationElement.textContent = ocupationFieldElement.value;
//   togglePopup(1);
// });

// titleFieldElement.value = elementTitleElement.textContent;
// formElement.addEventListener('submit', function(event) {
//   event.preventDefault();
//   profileNameElement.textContent = nameFieldElement.value;
//   profileOcupationElement.textContent = ocupationFieldElement.value;
//   togglePopup(1);
// });
