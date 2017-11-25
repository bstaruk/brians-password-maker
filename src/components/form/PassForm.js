class PassForm {
  constructor(props) {
    if (props.el) {
      this.el = props.el;
      if (this.el) {
        const self = this.el;
        this.displayFields = self.getElementsByClassName('form__input--display') || null;
        this.lengthField = self.querySelector('input[name="passLength"]') || null;
        this.lettersField = self.querySelector('input[name="useLetters"]') || null;
        this.numbersField = self.querySelector('input[name="useNumbers"]') || null;
        this.symbolsField = self.querySelector('input[name="useSymbols"]') || null;
        this.spacesField = self.querySelector('input[name="useSpaces"]') || null;
        this.init();
      }
    }
  }

  init() {
    // generate first password on page load
    this.refreshPassword();

    // generate new password on form submit
    this.el.addEventListener('submit', (e) => {
      e.preventDefault();
      this.refreshPassword();
    });

    // select text on focus for display fields
    for (let i = 0; i < this.displayFields.length; i++) {
      this.displayFields[i].addEventListener('focus', () => {
        this.displayFields[i].select();
      });
    }
  }

  refreshPassword() {
    // put loading class on display fields
    for (let i = 0; i < this.displayFields.length; i++) {
      this.displayFields[i].classList.add('form__input--display-loading');
    }

    // parse options & make new password with them
    const passLength = this.lengthField ? this.lengthField.value : 15;
    const useLetters = this.lettersField ? this.lettersField.checked : false;
    const useNumbers = this.numbersField ? this.numbersField.checked : false;
    const useSymbols = this.symbolsField ? this.symbolsField.checked : false;
    const useSpaces = this.spacesField ? this.spacesField.checked : false;
    const newPass = makePassword(passLength, useLetters, useNumbers, useSymbols, useSpaces);

    // update display fields with new password
    // 300ms delay allows css transitions to finish
    setTimeout(() => {
      for (let i = 0; i < this.displayFields.length; i++) {
        this.displayFields[i].value = newPass;
        this.displayFields[i].classList.remove('form__input--display-loading');
      }
    }, 300);
  }
}

const makePassword = (passLength, useLetters, useNumbers, useSymbols, useSpaces) => {
  // define character sets
  let charset = '';
  const charsets = {
    letters: 'abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    numbers: '0123456789',
    symbols: '!@#$%^&*()-=_+\'',
    spaces: ' '
  };

  // add letters, numbers, symbols?
  if (useLetters) { charset += charsets.letters; }
  if (useNumbers) { charset += charsets.numbers; }
  if (useSymbols) { charset += charsets.symbols; }
  if (useSpaces) { charset += charsets.spaces; }

  // use all dashes if no charset selected
  if (!charset) { charset += '-'; }

  // create password and return it
  let newPassword = '';
  for (let i = 0, n = charset.length; i < passLength; ++i) {
    newPassword += charset.charAt(Math.floor(Math.random() * n));
  }

  return newPassword;
};

export default PassForm;
