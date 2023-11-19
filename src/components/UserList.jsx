import React, {useEffect, useState} from 'react';
import {useChatContext} from "stream-chat-react";

import {InviteIcon} from "../assets";
import {UserItem} from "./";


const ListContainer = ({children}) => {
    return (
        <div className='user-list__container'>
            <div className='user-list__header'>
                <p>User</p>
                <p>Invite</p>
            </div>
            {children}
        </div>
    )
}

const UserList = ({setSelectedUsers, members, type, setIsDisabledButton}) => {
    const {client} = useChatContext();
    const [users, setUsers] = useState([]);
    const [listEmpty, setListEmpty] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if (loading) return;

            setLoading(true);
            try {
                const res = await client.queryUsers({});

                if (res.users.length) setUsers(res.users.filter(user => members.indexOf(user.id) === -1));
                else setListEmpty(true)
            } catch (e) {
                setError(e);
            }
            setLoading(false);
        }

        if (client) getUsers();

    }, [])

    const handleChange = (e) => {
        e.preventDefault();

        setSelectedUsers(users => {
            if (type === 'messaging') setIsDisabledButton(users.length !== 2)
            return users
        })
    }

    if (error) {
        return (
            <ListContainer>
                <div className='user-list__message'>
                    Error loading, please refresh and try again.
                </div>
            </ListContainer>
        )
    }

    if (listEmpty){
        return (
            <ListContainer>
                <div className='user-list__message'>
                    No users found.
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            {loading ?
                <div className='user-list__message'>
                    Loading users...
                </div> :
                (
                    <div onClick={handleChange}>
                        {users
                            ?.filter(user => user.id !== client.userID)
                            .map((user, i) => (
                                <UserItem
                                    index={i}
                                    key={user.id}
                                    user={user}
                                    setSelectedUsers={setSelectedUsers}
                                    selectIcon={<InviteIcon/>}
                                />
                            ))}
                    </div>
                )}
        </ListContainer>
    );
};

export default UserList;