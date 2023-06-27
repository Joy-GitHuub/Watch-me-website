const usePhotoLike = () => {
    const handleLikePhotoFetch = async (likeInfo) => {
        // const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/photoLike`;
        const url = `https://watch-me-server-gamma.vercel.app/api/watch-me/v1/posts/photoLike`;
        const res = await fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(likeInfo),
        });

        return res.json();
    };

    const handleLikePhoto = (likeInfo) => {
        return handleLikePhotoFetch(likeInfo)
    };

    return { handleLikePhoto }

};

export default usePhotoLike;