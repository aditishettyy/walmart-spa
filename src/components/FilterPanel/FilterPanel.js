import React from 'react';
import Drawer from '@mui/material/Drawer';
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import styles from './FilterPanel.module.scss';

const types = ['EDF', 'CAO', 'SFO'];

const FilterPanel = ({
    openFilterPanel,
    setOpenFilterPanel,
    handleFilterChange,
    filter,
    resetData,
    validationErrorObj,
    handleSubmit
}) => {

    return (
        <div className={styles.searchPanelContainer}>
            <Drawer
                PaperProps={{
                    sx: {
                        width: '30vw',
                    }
                }}
                anchor={'right'}
                open={openFilterPanel}
                onClose={() => setOpenFilterPanel(false)}
            >
                <div className={styles.filterPanelHeader}>
                    <h2>Set Filter</h2>
                    <Link className={styles.resetAllText} href="#" underline="hover" onClick={resetData}>
                        Reset All
                    </Link>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className={styles.filterPanelBody}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="item-content"
                                id="item-header"
                            >
                                <Typography>Item</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <TextField
                                        id="item-text"
                                        value={filter.itemNumber}
                                        error={!!validationErrorObj.itemNumber}
                                        helperText={validationErrorObj.itemNumber}
                                        onChange={(e) => handleFilterChange(e, 'itemNumber')}
                                        fullWidth
                                    />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="order-number-content"
                                id="order-number-header"
                            >
                                <Typography>Order #</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <TextField
                                        id="order-number-text"
                                        value={filter.orderNumber}
                                        error={!!validationErrorObj.orderNumber}
                                        helperText={validationErrorObj.orderNumber}
                                        onChange={(e) => handleFilterChange(e, 'orderNumber')}
                                        fullWidth
                                    />
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="type-content"
                                id="type-header"
                            >
                                <Typography>Type</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography>
                                    <Select
                                        labelid="type-label"
                                        id="type-multiple-checkbox"
                                        multiple
                                        value={filter.type}
                                        onChange={(e) => handleFilterChange(e, 'type')}
                                        input={<OutlinedInput label="Type" />}
                                        renderValue={(selected) => selected.join(', ')}
                                        fullWidth
                                    >
                                        {types.map((t) => (
                                            <MenuItem key={t} value={t}>
                                                <Checkbox checked={filter.type.indexOf(t) > -1} />
                                                <ListItemText primary={t} />
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    </div>

                    <div className={styles.filterPanelFooter}>
                        <ButtonGroup variant="outlined" size="large" aria-label="outlined button group" fullWidth>
                            <Button onClick={() => setOpenFilterPanel(false)}>Cancel</Button>
                            <Button type="submit" variant="contained" onClick={handleSubmit}>Apply</Button>
                        </ButtonGroup>
                    </div>
                </form>
            </Drawer>
        </div>
    )
};

export default FilterPanel

