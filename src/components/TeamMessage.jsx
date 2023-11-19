import React from 'react';
import {MessageSimple} from "stream-chat-react";

const TeamMessage = ({props}) => (
    <div className='channel_message__container'>
        <MessageSimple {...props}/>
    </div>
);

export default TeamMessage;