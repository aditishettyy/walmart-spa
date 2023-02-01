import React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import styles from './EmptySearchData.module.scss';

const EmptySearchData = ({fetchData, setOpenFilterPanel}) => {

    return (
        <div className={styles.emptySearchDataContainer}>
            <div className={styles.boldText}>What are you looking for?</div>
            <div>Get started by searching & filtering a few</div>
            <Button className={styles.fetchDataButton} variant="contained" onClick={() => fetchData()}>Fetch Data</Button>
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