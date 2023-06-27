import React from 'react';
import useFirebase from './useFirebase';

const useUser = () => {

    const { user } = useFirebase();
    const { email } = user;

    const [dbUser, setDbUser] = React.useState({});

    const fetchGetSingleUser = async () => {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/me/${email}`;
        const res = await fetch(url);
        const data = await res.json();
        setDbUser(data?.data);
    };

    React.useEffect(() => {
        fetchGetSingleUser();
    }, [email])

    return { dbUser };

};

export default useUser;