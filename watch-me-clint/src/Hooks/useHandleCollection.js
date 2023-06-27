const useHandleCollection = () => {

    const handleAddToCollectionFetch = async (collectionInfo) => {
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/userPostAddToCollection`;
        // const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/user/userPostAddToCollection`;
        const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(collectionInfo),
        });

        return res.json();
    };

    const handleAddToCollection = (collectionInfo) => {
        handleAddToCollectionFetch(collectionInfo)
            .then((data) => {
                console.log(data);
            });
    };


    return { handleAddToCollection }
};

export default useHandleCollection;