import React, {useState} from 'react';
import {Avatar} from "stream-chat-react";
import {InviteIcon} from "../assets";

const UserItem = ({user, setSelectedUsers, select=true, selectIcon}) => {
    const [selected, setSelected] = useState(false);
    const handleSelect = () => {
        if (selected){
            setSelectedUsers((prevUsers) => {
                return prevUsers.filter((prevUser) => prevUser !== user.id)
            });
            // setSelectedUsers(users => console.log(users))
        } else {
            setSelectedUsers((prevUsers) => {
                return [...prevUsers, user.id]
            });
        }


        setSelected((prevState) => !prevState);
    }

    return (
        <div className='user-item__wrapper' onClick={handleSelect}>
            <div className='user-item__name-wrapper'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='user-item__name'>{user.fullName  || user.id}</p>
            </div>
            {select && (selected ? selectIcon : <div className='user-item__invite-empty'/>)}
        </div>
    )
}

export default UserItem;