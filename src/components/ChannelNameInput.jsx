import React from 'react';
import inputController from "../controllers/inputController";

const ChannelNameInput = ({channelName = '', setChannelName, setIsCorrectInput, setIsDisabledButton}) => {
    let isCorrect
    const handleBlur = (e) => {
        const node = e.target.parentElement;

        if (e.target.value) return;

        node.classList.add('error');
        node.setAttribute('data', 'The field cannot be empty')
    }

    const handleChange = (e) => {
        e.preventDefault();
        const input = e.target;
        const message = inputController.checkCorrectInputValue(input.value, input.name)

        input.parentElement.classList.remove('error');


        if (message.length) {
            setIsDisabledButton(true);
            input.parentElement.classList.add('error')
            input.parentElement.setAttribute('data', message)
        }
        else {
            setIsDisabledButton(false);
            input.parentElement.classList.remove('error');
        }

        setChannelName(e.target.value);
    }

    return (
        <div className='channel-name-input__wrapper'>
            <p>Name</p>
            <input name='channelName' value={channelName} onChange={handleChange} onBlur={handleBlur} placeholder='input channel name (withot spaces)'/>
        </div>
    )
}

export default ChannelNameInput;