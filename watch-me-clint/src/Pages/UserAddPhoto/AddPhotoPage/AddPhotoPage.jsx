import React from 'react';
import Search from '../../../Shared/Search/Search';
import AddImage from '../AddImage/AddImage';

const AddPhotoPage = () => {
    return (
        <section style={{marginTop: '80px', marginBottom: '0px', paddingBottom: '0px'}}>
            <Search/>
            <AddImage/>
        </section>
    );
};

export default AddPhotoPage;