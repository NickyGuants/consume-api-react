import React, { useState, useEffect } from 'react'

const Users = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3004/users/")
            .then(res => res.json())
            .then((data) => {
                setIsLoaded(true);
                setUsers(data);
            },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
        )
    }, [])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div>
                <h1>List of Users</h1>
                <table>
                    <tr id="heading">
                        <th>Username</th>
                        <th>Email</th>
                        <th>Name</th>
                        <th>Project</th>
                    </tr>
                    
                    {users.map((user) => (
                        <div key={user.user_id}>
                            <tr id="user">
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.first_name + " " + user.last_name}</td>
                                <td>{ user.project }</td>
                            </tr>
                        </div>
                    ))}
                </table>
                <form action="">
                    <input type="text" placeholder="Enter name of user" />
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default Users;
