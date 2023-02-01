import React, { useContext, useState, useEffect } from 'react';
import styles from './SearchPanel.module.scss';
import Drawer from '@mui/material/Drawer';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';

const types = ['EDF', 'CAO', 'SFO'];

const SearchPanel = ({ 
    openFilterPanel, 
    setOpenFilterPanel, 
    handleFilterChange, 
    filter,
    resetData,
    applyFilters,
    validationErrorObj
}) => {

    return (
        <div>
            <Drawer
                anchor={'right'}
                open={openFilterPanel}
                onClose={() => setOpenFilterPanel(false)}
            >
                <div>Set Filter</div>
                <Link href="#" underline="hover" onClick={resetData}>
                    Reset All
                </Link>
                <div>
                    <InputLabel id="item-label">Item</InputLabel>
                    <TextField
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        labelid="item-label"
                        id="item-text"
                        value={filter.itemNumber}
                        helperText={validationErrorObj.itemNumber}
                        onChange={(e) => handleFilterChange(e, 'itemNumber')}
                    />
                </div>
                <div>
                    <InputLabel id="order-number-label">Order #</InputLabel>
                    <TextField
                        labelid="order-number-label"
                        id="order-number-text"
                        value={filter.orderNumber}
                        helperText={validationErrorObj.orderNumber}
                        onChange={(e) => handleFilterChange(e, 'orderNumber')}
                    />
                </div>
                <div>
                    <InputLabel id="type-label">Type</InputLabel>
                    <Select
                        labelid="type-label"
                        id="type-multiple-checkbox"
                        multiple
                        value={filter.type}
                        onChange={(e) => handleFilterChange(e, 'type')}
                        input={<OutlinedInput label="Type" />}
                        renderValue={(selected) => selected.join(', ')}
                    >
                        {types.map((t) => (
                            <MenuItem key={t} value={t}>
                                <Checkbox checked={filter.type.indexOf(t) > -1} />
                                <ListItemText primary={t} />
                            </MenuItem>
                        ))}
                    </Select>
                </div>
                <div>
                    <ButtonGroup variant="outlined" aria-label="outlined button group">
                        <Button onClick={() => setOpenFilterPanel(false)}>Cancel</Button>
                        <Button variant="contained" onClick={applyFilters}>Apply</Button>
                    </ButtonGroup>
                </div>
            </Drawer>
        </div>
    )
};

export default SearchPanel

