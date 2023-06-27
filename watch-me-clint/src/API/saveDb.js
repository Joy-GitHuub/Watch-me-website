const saveDb = (displayName, email, photoURL) => {

    const user = { displayName: displayName, email: email, photoURL: photoURL, }

    const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/sign-up`;

    fetch(url, {
        method: "PATCH",
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(user),
    })
        .then((res) => res.json())
        .then((data) => {

        })

};

export default saveDb;