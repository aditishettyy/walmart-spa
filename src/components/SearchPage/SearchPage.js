import React, { useContext, useState, useEffect } from 'react';
import styles from './SearchPage.module.scss';
import data from '../../data/orders.json';
import EmptySearchData from '../EmptySearchData';
import SearchPanel from '../SearchPanel';
import { DataGrid } from '@mui/x-data-grid';
import { BsFilter } from "react-icons/bs";
import TextField from '@mui/material/TextField';
import InputLabel from "@mui/material/InputLabel";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const initFilter = { itemNumber: '', orderNumber: '', type: [] }

const validateNumberArray = (arr) => {
    console.log('arr', arr);
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
            console.log('useEffect');
            setLoading(true);
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
            console.log('handleFilterChange')
            const newFilter = { ...filter };
            newFilter[name] = event.target.value;
            setFilter(newFilter)
        };

        const fetchData = () => {
            console.log('fetchData')
            const newFilteredData = [...orders];
            setFilteredOrders(newFilteredData);
        }

        const resetData = () => {
            console.log('resetData')
            setFilteredOrders([]);
            setFilter(initFilter);
            setOpenFilterPanel(false)
        }

        const applyFilters = () => {
            console.log('applyFilters')
            const itemNumberFilter = filter.itemNumber && filter.itemNumber.trim().length > 0 ? filter.itemNumber.trim().split(',').map(Number) :null;
            const orderNumberFilter = filter.orderNumber && filter.orderNumber.trim().length > 0 ? filter.orderNumber.trim().split(',').map(Number): null;
            const typeFilter = filter.type;

            let validationErrorObj = {};
            if (!validateNumberArray(itemNumberFilter)) {
                validationErrorObj.itemNumber = 'Use number only;'
            }

            if (!validateNumberArray(orderNumberFilter)) {
                validationErrorObj.orderNumber = 'Use number only;'
            }
            setValidationError(validationErrorObj)
            if (Object.keys(validationErrorObj) > 0) {
                return;
            }

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
                <InputLabel id="item-search-label">Item search</InputLabel>
                <TextField
                    labelid="item-search-label"
                    id="item-search"
                    value={filter.itemNumber}
                    onChange={(e) => handleFilterChange(e, 'itemNumber')}
                    onBlur={applyFilters}
                />
                {/* <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search by Item #"
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton> */}

                <BsFilter onClick={() => setOpenFilterPanel(true)} />

                <SearchPanel
                    openFilterPanel={openFilterPanel}
                    setOpenFilterPanel={setOpenFilterPanel}
                    handleFilterChange={handleFilterChange}
                    filter={filter}
                    resetData={resetData}
                    applyFilters={applyFilters}
                    validationErrorObj={validationError}
                />

                {orderDataEmpty && <EmptySearchData fetchData={fetchData} setOpenFilterPanel={setOpenFilterPanel} />}

                {!orderDataEmpty &&
                    <div style={{ height: "800px", width: "100%" }}>
                        <DataGrid
                            rows={filteredOrders}
                            columns={columns}
                            pageSize={10}
                            rowsPerPageOptions={[5, 10]}
                            getRowId={(row) => row.orderNum}
                        />
                    </div>
                }

            </div>
        )
    };

    export default SearchPage

