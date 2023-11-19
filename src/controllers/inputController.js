class InputController {
    #password='';

    #isCorrectFullName = (value) => {
        return /^[A-ZА-ЯЁ\s]+$/i.test(value);
    }

    #isCorrectUsername = (value) => {
        return /^[0-9A-ZА-ЯЁ]+$/i.test(value);
    }

    #isCorrectPhone = (value) => {
        return /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(value);
    }

    #isCorrectPassword = (value) => {
        return /[0-9a-zA-Z!@#$%^&*]{5,}/g.test(value);
    }

    #isCorrectConfirmPassword = (value) => {
        return this.#password === value;
    }

    #isCorrectURL = (value) => {
        return /^https?:\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@\-/]))?/.test(value);
    }

    #isCorrectNameInput = (value) => {
        return /^[a-z0-9_-]{3,16}$/.test(value);
    }

    #checkAuthFullNameInput = (value) => {
        if (!this.#isCorrectFullName(value)) return 'The field does not contain numbers..';

        return '';
    }
    #checkAuthUsernameInput = (value) => {
        if (!this.#isCorrectUsername(value)) return 'The field does not contain numbers..';
        if (value.trim().length < 5) return 'It\'s too short..';
        if (value.trim().length > 30) return 'It\'s too long..';

        return '';
    }

    #checkAuthPhoneNumber = (value) => {
        if (!this.#isCorrectPhone(value)) return 'Invalid phone number..';
        return '';
    }

    #checkAuthPassword = (value) => {
        this.#password = value;

        if (value.includes(' ')) return 'Password cannot contain a space..';
        if (!this.#isCorrectPassword(value)) return 'Password is too short..'

        return '';
    }

    #checkAuthConfirmPassword = (value) => {
        if (!this.#isCorrectConfirmPassword(value)) return 'Password mismatch..'

        return '';
    }

    #checkAuthAvatarURL = (value) => {
        if (!this.#isCorrectURL(value)) return 'Invalid URL..'

        return '';
    }

    #checkChannelInput = (value) => {
        if (!value.trim().length) return 'The field cannot be empty';
        if (value.trim().length < 3) return 'It\'s too short'
        if (value.trim().length > 15) return 'It\'s too long'

        if (!this.#isCorrectNameInput(value)) return 'Invalid Channel Name'

        return '';
    }

    checkCorrectInputValue = (inputValue, inputName) => {
        if (inputValue.trim().length === 0) return 'The field cannot be empty';

        switch (inputName) {
            case 'fullName': return this.#checkAuthFullNameInput(inputValue);
            case 'username': return this.#checkAuthUsernameInput(inputValue);
            case 'phoneNumber': return this.#checkAuthPhoneNumber(inputValue);
            case 'password': return this.#checkAuthPassword(inputValue);
            case 'confirmPassword': return this.#checkAuthConfirmPassword(inputValue);
            case 'avatarURL': return this.#checkAuthAvatarURL(inputValue);
            case 'channelName': return this.#checkChannelInput(inputValue)
        }
    }
}

export default new InputController();