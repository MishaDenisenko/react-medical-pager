import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList, UserItem, ChannelNameInput } from './';
import {CloseCreateChannel, RemoveIcon} from '../assets';


const MemberList = ({client, channel, isOwner, members}) => {
    const [selectedMembers, setSelectedMembers] = useState([]);
    const firstUser = members.find(({user}) => user.id === client.userID);

    const deleteMembers = async (event) => {
        event.preventDefault();

        const destroy = await channel.removeMembers([...selectedMembers]);

        if (destroy) window.location.reload();
    }

    return (
        <div className="channel-name-input__wrapper">
            <div className='edit-channel__container_members'>
                <p>Members</p>
                {isOwner && (<button disabled={selectedMembers.length===0} onClick={deleteMembers}>Delete Members</button>)}

            </div>
            <UserItem index={0} key={firstUser.user.id} user={firstUser.user} setSelectedUsers={()=>{}} select={false}/>
            {members
                .filter(({ user }) => user.id !== client.userID)
                .map(({user}, i) => (
                    <UserItem
                        index={i+1}
                        key={user.id}
                        user={user}
                        setSelectedUsers={setSelectedMembers}
                        select={isOwner}
                        selectIcon={<RemoveIcon/>}
                    />
                ))
            }
        </div>
    )
}


const EditChannel = ({ setIsEditing }) => {
    const { channel, client } = useChatContext();
    const [channelName, setChannelName] = useState(channel?.data?.name);
    const [selectedUsers, setSelectedUsers] = useState([])
    const [isDisabledButton, setIsDisabledButton] = useState(true);
    const owner = Object.values(channel.state.members).filter(user => user.role === 'owner')[0];
    const isOwner = owner.user_id === client.userID;
    const members = Object.values(channel.state.members);


    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Channel name changed to ${channelName}`});
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(channelName);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    const deleteChannel = async (event) => {
        event.preventDefault();
        let destroy;

        if (isOwner){
            destroy = await client.deleteChannels([channel.cid], {hard_delete: true});
        } else {
            destroy = await channel.removeMembers([client.userID]);
        }

        if (destroy) {
            setIsEditing(false);
            window.location.reload();
        }
    }

    return (
        <div className="edit-channel__container">
            <div className="edit-channel__header">
                <p>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} setIsDisabledButton={setIsDisabledButton}/>
            <MemberList client={client} channel={channel} isOwner={isOwner} members={members}/>
            <p className='edit-channel__container-title'>Add members</p>
            <UserList setSelectedUsers={setSelectedUsers} members={members.map(member => member.user_id)}/>
            <div className="edit-channel__button-wrapper">
                <button disabled={isDisabledButton} onClick={updateChannel}>Save Changes</button>
                <p className='edit-channel__delete-button' onClick={deleteChannel}>{isOwner ? 'Delete Channel' : 'Leave Channel'}</p>
            </div>
        </div>
    )
}

export default EditChannel