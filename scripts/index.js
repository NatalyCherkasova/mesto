const editButton = document.querySelector('.profile__edit-button')
const popup = document.querySelector('.popup')
const closePopupButton = document.querySelector('.popup__close')

const profileNameElement = document.querySelector('.profile__text_type_name')
const nameFieldElement = document.querySelector('.popup__input_type_name')

const profileOcupationElement = document.querySelector('.profile__text_type_ocupation')
const ocupationFieldElement = document.querySelector('.popup__input_type_ocupation')

const formElement = document.querySelector('.popup__form')

function openPopup(popupElement) {
    popupElement.classList.add('popup_opened')
}

function closePopup(popupElement) {
    popupElement.classList.remove('popup_opened')
}

editButton.addEventListener('click', function() {
    openPopup(popup)
    nameFieldElement.value = profileNameElement.textContent;
    ocupationFieldElement.value = profileOcupationElement.textContent;
})

closePopupButton.addEventListener('click', function() {
    closePopup(popup)
})

formElement.addEventListener('submit', function(event) {
    event.preventDefault()
    profileNameElement.textContent = nameFieldElement.value;
    profileOcupationElement.textContent = ocupationFieldElement.value;
    closePopup(popup)
})
