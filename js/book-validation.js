const validStatus = {
  isValid: false,
};

class BookValidation {
  static validateBook(title, author) {
    const alertTooltip = document.querySelector('.alert-tooltip');
    if (title.length < 1 || title === undefined) {
      alertTooltip.textContent = '* Make sure to fill your book Title';
      alertTooltip.classList.add('on-error');
      setTimeout(() => {
        alertTooltip.style.visibility = 'hidden';
      }, 2000);
    } else if (author.length < 1 || author === undefined) {
      alertTooltip.textContent = '* Make sure you fill the book Author.';
      alertTooltip.classList.add('on-error');
      setTimeout(() => {
        alertTooltip.style.visibility = 'hidden';
      }, 2000);
    } else {
      validStatus.isValid = true;
      alertTooltip.classList.remove('on-error');
      alertTooltip.classList.add('on-success');
      alertTooltip.textContent = 'You added a new Book.';
      setTimeout(() => {
        alertTooltip.style.visibility = 'hidden';
      }, 1500);
    }
    alertTooltip.style.visibility = 'visible';
  }
}

export { validStatus, BookValidation };
