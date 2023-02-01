import React, { useContext, useState, useEffect } from 'react';
import styles from './EmptySearchData.module.scss';
import Link from '@mui/material/Link';

const EmptySearchData = ({fetchData, setOpenFilterPanel}) => {

    return (
        <div>
            <div>What are you looking for?</div>
            <div>Get started by searching & filtering a few</div>
            <button onClick={() => fetchData()}>Fetch Data</button>
            <div>
                <span>or </span>
                <Link href="#" underline="hover" onClick={() => setOpenFilterPanel(true)}>
                    search for an item
                </Link>
            </div>
        </div>
    )
};

export default EmptySearchData