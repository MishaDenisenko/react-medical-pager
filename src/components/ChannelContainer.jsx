import React from 'react';
import {Channel} from "stream-chat-react";

import {ChannelInner, CreateChannel, EditChannel, TeamMessage} from "./";


const ChannelContainer = ({isCreating, isEditing, setIsCreating, setIsEditing, createType}) => {
    if (isCreating){
        return (
            <div className='channel__container'>
                <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
            </div>
        );
    }
    if (isEditing){
        return (
            <div className='channel__container'>
                <EditChannel setIsEditing={setIsEditing}/>
            </div>
        );
    }

    const EmptyState = () => (
        <div className='channel-empty__container'>
            <p className='channel-empty__first'>This is the beginning of your history.</p>
            <p className='channel-empty__second'>Send messages, attachments, emojis, links and more!</p>
        </div>
    )

    return (
        <div className='channel__container'>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps) => <TeamMessage {...messageProps} />}
            >
                <ChannelInner setIsEditing={setIsEditing}/>
            </Channel>
        </div>
    );
};

export default ChannelContainer;