import React, {useState} from 'react';
import inputController from "../controllers/inputController";

import Cookies from "universal-cookie/es6";
import axios from "axios";

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
};

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSingUp, setIsSingUp] = useState(true);
    const [isEmptyForm, setIsEmptyForm] = useState(true);
    
    const handleBlur = (e) => {
        const node = e.target.parentElement;

        if (e.target.value) return;

        node.classList.add('error');
        node.setAttribute('data', 'The field cannot be empty')
    }

    const handleChange = (e) => {
        const changeForm = {...form, [e.target.id]: e.target.value};

        e.target.parentElement.classList.remove('error');

        setForm(changeForm);
        setIsEmptyForm(() => {
            return isSingUp
                ? Object.values(changeForm).filter(value => value.trim() === '').length > 0
                : (changeForm.username.trim().length === 0 || changeForm.password.trim().length === 0)
        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        let isCorrect = true;
        for (let key in isSingUp ? form : {username: form.username, password: form.password}) {

            const input = document.querySelector(`#${key}`);
            const message = inputController.checkCorrectInputValue(form[key], key);

            if (message.length) {
                isCorrect = false;
                input.parentElement.classList.add('error')
                input.parentElement.setAttribute('data', message)
            }
            else {
                isCorrect = isCorrect && true;

                input.parentElement.classList.remove('error');
                input.parentElement.removeAttribute('data');
            }
        }

        if (!isCorrect) return;

        const { username, password, phoneNumber, avatarURL} = form;
        const URL = `http://localhost:4000/auth`;

        try {
            const {data: {token, userId, hashedPassword, fullName}} = await axios.post(`${URL}/${isSingUp ? 'singUp' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if (isSingUp){
                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();
        } catch (e) {
            let input;
            if (e.response.status === 400) {
                input = document.querySelector('#username');
            }
            else if (e.response.status === 500) {
                input = document.querySelector('#password');
            }

            input.parentElement.classList.add('error');
            input.parentElement.setAttribute('data', e.response.data.message);
        }
    }

    const switchMode = () => {
        setIsSingUp((prevState) => !prevState);
        setForm(initialState);
        setIsEmptyForm(true)
        const [
            username,
            password
        ] = [
            document.querySelector('#username'),
            document.querySelector('#password')
        ]

        username.parentElement.classList.remove('error');
        password.parentElement.classList.remove('error');

        username.value = '';
        password.value = '';
    }

    return (
        <div className='auth__form-container'>
            <div className='auth__form-container_fields-content'>
                <p>{isSingUp ? 'Sign Up' : 'Sign In'}</p>
                <form onSubmit={handleSubmit}>
                    {isSingUp && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='fullName'>Full Name</label>
                            <input
                                id='fullName'
                                type='text'
                                placeholder='Full Name'
                                onChange={handleChange}
                                onBlur={e => {handleBlur(e)}}
                                required=""
                                data-clue=''
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='username'>Username</label>
                        <input
                            id='username'
                            type='text'
                            placeholder='Username'
                            onChange={handleChange}
                            onBlur={e => {handleBlur(e)}}
                            required=''
                            data-clue=''
                        />
                    </div>
                    {isSingUp && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='phoneNumber'>Phone Number</label>
                            <input
                                id='phoneNumber'
                                type='text'
                                placeholder='Phone Number'
                                onChange={handleChange}
                                onBlur={e => {handleBlur(e)}}
                                required=''
                                data-clue=''
                            />
                        </div>
                    )}
                    {isSingUp && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='avatarURL'>Avatar URL</label>
                            <input
                                id='avatarURL'
                                type='text'
                                placeholder='Avatar URL'
                                onChange={handleChange}
                                onBlur={e => {handleBlur(e)}}
                                required=''
                                data-clue=''
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_input'>
                        <label htmlFor='password'>Password</label>
                        <input
                            id='password'
                            type='password'
                            placeholder='Password'
                            onChange={handleChange}
                            onBlur={e => {handleBlur(e)}}
                            required=''
                            data-clue=''
                        />
                    </div>
                    {isSingUp && (
                        <div className='auth__form-container_fields-content_input'>
                            <label htmlFor='confirmPassword'>Confirm Password</label>
                            <input
                                id='confirmPassword'
                                type='password'
                                placeholder='Confirm Password'
                                onChange={handleChange}
                                onBlur={e => {handleBlur(e)}}
                                required=''
                                data-clue=''
                            />
                        </div>
                    )}
                    <div className='auth__form-container_fields-content_button'>
                        <button disabled={isEmptyForm}>{isSingUp ? 'Sign Up' : 'Sign In'}</button>
                    </div>
                </form>
                <div className='auth__form-container_fields-account'>
                    <p>
                        {isSingUp ? 'Already have an account?\t' : 'Dont\`t have an account?\t'}
                        <span onClick={switchMode}>
                            {isSingUp ? 'Sign In' : 'Sign Up'}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Auth;