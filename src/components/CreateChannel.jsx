import React, {useState} from 'react';
import {useChatContext} from "stream-chat-react";
import {UserList, ChannelNameInput} from './';
import {CloseCreateChannel} from "../assets";


const CreateChannel = ({createType, setIsCreating}) => {
    const {client, setActiveChannel, channel} = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || '']);
    const [isCorrectInput, setIsCorrectInput] = useState(true);
    const [isDisabledButton, setIsDisabledButton] = useState(true);

    const [channelName, setChannelName] = useState('');

    const members = Object.values(client.queryUsers({})).filter(({ user }) => user.id !== client.userID);

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = client.channel(createType, channelName, {name: channelName, members: selectedUsers});

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel (newChannel);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='create-channel__container'>
            <div className='create-channel__header'>
                <p>{createType === 'team' ? 'Create New Chat' : 'Send Message'}</p>
                <CloseCreateChannel setIsCreating={setIsCreating}/>
            </div>
            {createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} setIsDisabledButton={setIsDisabledButton}/>}
            {createType === 'team' && <p className='edit-channel__container-title'>Add members</p>}
            <UserList selectedUsers={selectedUsers} setSelectedUsers={setSelectedUsers} members={members} type={createType} setIsDisabledButton={setIsDisabledButton}/>
            <div className='create-channel__button-wrapper' >
                <button disabled={isDisabledButton} onClick={createChannel}>
                    {createType === 'team' ? 'Create Channel' : 'Send Message'}
                </button>
            </div>
        </div>
    );
};

export default CreateChannel;