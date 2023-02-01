import React, { useState, useEffect } from 'react';
import data from '../../data/orders.json';
import EmptySearchData from '../EmptySearchData';
import FilterPanel from '../FilterPanel';
import { BsFilter } from "react-icons/bs";
import { DataGrid } from '@mui/x-data-grid';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Tooltip from '@mui/material/Tooltip';

import styles from './SearchPage.module.scss';

const initFilter = { itemNumber: '', orderNumber: '', type: [] }

const validateNumberArray = (arr) => {
    if (arr && arr.length > 0) {
        for (let i = 0; i < arr.length; i++) {
            if (isNaN(arr[i])) {
                return false;
            }
        }
    }
    return true;
}

const SearchPage = () => {
    const [orders, setOrders] = useState([]);
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [openFilterPanel, setOpenFilterPanel] = useState(false)
    const [filter, setFilter] = useState(initFilter);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [validationError, setValidationError] = useState({})

    const orderDataEmpty = filteredOrders.length === 0;

    useEffect(() => {
        // console.log('useEffect');
        setLoading(true);
        // fetching data from a random api and using mock data to mimic asynchronous call
        fetch("https://jsonplaceholder.typicode.com/todos/1")
            .then((resp) => {
                setOrders(data);
                setLoading(false);
            })
            .catch(() => {
                setError("Error loading API")
                setLoading(false);
            });
    }, []);

    const handleFilterChange = (event, name) => {
        // console.log('handleFilterChange')
        const newFilter = { ...filter };
        newFilter[name] = event.target.value;
        setFilter(newFilter)
    };

    const fetchData = () => {
        // console.log('fetchData')
        const newFilteredData = [...orders];
        setFilteredOrders(newFilteredData);
    }

    const resetData = () => {
        // console.log('resetData')
        setFilteredOrders([]);
        setFilter(initFilter);
        setOpenFilterPanel(false)
    }

    const validateFilters = () => {
        // console.log('validateFilters')
        const itemNumberFilter = filter.itemNumber && filter.itemNumber.trim().length > 0 ? filter.itemNumber.trim().split(',').map(Number) : null;
        const orderNumberFilter = filter.orderNumber && filter.orderNumber.trim().length > 0 ? filter.orderNumber.trim().split(',').map(Number) : null;

        let validationErrorObj = {};
        if (!validateNumberArray(itemNumberFilter)) {
            validationErrorObj.itemNumber = 'Please use numbers only separated by commas'
        }

        if (!validateNumberArray(orderNumberFilter)) {
            validationErrorObj.orderNumber = 'Please use numbers only separated by commas'
        }
        setValidationError(validationErrorObj)
        return Object.keys(validationErrorObj).length === 0
    }

    const applyFilters = () => {
        // console.log('applyFilters')
        const itemNumberFilter = filter.itemNumber && filter.itemNumber.trim().length > 0 ? filter.itemNumber.trim().split(',').map(Number) : null;
        const orderNumberFilter = filter.orderNumber && filter.orderNumber.trim().length > 0 ? filter.orderNumber.trim().split(',').map(Number) : null;
        const typeFilter = filter.type;

        const result = orders.filter((order) => {
            if (Array.isArray(itemNumberFilter) && itemNumberFilter.length > 0) {
                if (!itemNumberFilter.includes(order.itemNum)) {
                    return false;
                }
            }
            if (Array.isArray(orderNumberFilter) && orderNumberFilter.length > 0) {
                if (!orderNumberFilter.includes(order.orderNum)) {
                    return false;
                }
            }
            if (Array.isArray(typeFilter) && typeFilter.length > 0) {
                if (!typeFilter.includes(order.type)) {
                    return false;
                }
            }
            return true;
        })
        setFilteredOrders(result);
    }

    const handleSubmit = (e) => {
        e && e.preventDefault();
        // console.log('handleSubmit')
        
        if (validateFilters()) {
            applyFilters();
        }
    }

    const columns = [
        {
            field: 'orderNum',
            headerName: 'Order #',
            width: 150
        },
        {
            field: 'type',
            headerName: 'Type',
            width: 150
        },
        {
            field: 'itemNum',
            headerName: 'Item',
            width: 150
        },
        {
            field: 'category',
            headerName: 'Category',
            width: 200,
        },
        {
            field: 'description',
            headerName: 'Description',
            width: 250,
        },
    ];

    if (loading) {
        return (
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={loading}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
        )
    }

    if (error) {
        return <div>{error}</div>
    }

    return (
        <div>
            <div className={styles.itemSearchContainer}>
                <div className={styles.itemSearchText}>
                    <h2>Item search</h2>
                    <div>{filteredOrders.length} item{filteredOrders.length > 1 && <span>s</span>}</div>
                </div>
                <div className={styles.itemSearchBody}>
                    <div className={styles.itemSearchBox}>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Tooltip title="Search by Item # separated by comma">
                                <TextField
                                    className={styles.itemSearch}
                                    id="item-search"
                                    placeholder="Search by Item #"
                                    value={filter.itemNumber}
                                    onChange={(e) => handleFilterChange(e, 'itemNumber')}
                                    helperText={validationError.itemNumber}
                                    error={!!validationError.itemNumber}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    type="button"
                                                    sx={{ p: '10px', color: '#3b7eae' }}
                                                    aria-label="search"
                                                    onClick={handleSubmit}
                                                >
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Tooltip>
                        </form>
                    </div>
                    <div className={styles.filterButton}>
                        <BsFilter onClick={() => setOpenFilterPanel(true)} />
                    </div>
                </div>
            </div>

            {orderDataEmpty && <EmptySearchData fetchData={fetchData} setOpenFilterPanel={setOpenFilterPanel} />}

            {!orderDataEmpty &&
                <div style={{ height: "630px", width: "100%" }}>
                    <DataGrid
                        rows={filteredOrders}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                        getRowId={(row) => row.orderNum}
                    />
                </div>
            }

            <FilterPanel
                openFilterPanel={openFilterPanel}
                setOpenFilterPanel={setOpenFilterPanel}
                handleFilterChange={handleFilterChange}
                filter={filter}
                resetData={resetData}
                validationErrorObj={validationError}
                handleSubmit={handleSubmit}
            />

        </div>
    )
};

export default SearchPage

