import React, { useState } from "react";
import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, ListItemIcon, ListItemText, MenuItem, Select, TextField } from "@mui/material";

import Stack from '@mui/material/Stack';

const InputAddItem = (props) => {
  const [title, setTitle] = useState("");
  const [des, setDes] = useState("");
  const [identi, setIdenti] = useState("");

  const [open, setOpen] = useState(false);

  const options = [
    "Devloper",
    "designer",
    "front-end devloper",
  ];

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250
      }
    },
    getContentAnchorEl: null,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: "center"
    },
    transformOrigin: {
      vertical: "top",
      horizontal: "center"
    },
    variant: "menu"
  };

  const [selected, setSelected] = useState([]);
  const isAllSelected =
    options.length > 0 && selected.length === options.length;

  const handleChange = (event) => {
    const value = event.target.value;
    if (value[value.length - 1] === "all") {
      setSelected(selected.length === options.length ? [] : options);
      return;
    }
    setSelected(value);
  };


  const handleOnSubmit = (e) => {
    props.addItem(title, des, identi, selected);
    setTitle("");
    setDes('')
    setIdenti('')
    setSelected([])
    setOpen(false)
  };


  return (
    <>
      <div className="header-card">
        <Button variant="contained" onClick={() => { setOpen(true) }}>add News</Button>
      </div>

      <Dialog open={open} onClose={() => { setOpen(false) }}>
        <DialogTitle style={{ textAlign: 'center' }}>Add News</DialogTitle>
        <DialogContent>
          <div className="form">
            <TextField style={{ margin: '10px 0' }} required autoFocus fullWidth label="Title" variant="standard" value={title} onChange={(e) => setTitle(e.target.value)} />
            <TextField style={{ margin: '10px 0' }} required fullWidth label="Description" variant="standard" value={des} onChange={(e) => setDes(e.target.value)} />
            <TextField style={{ margin: '10px 0' }} required fullWidth label="Identifier" variant="standard" value={identi} onChange={(e) => setIdenti(e.target.value)} />
            <Stack style={{ margin: '10px 0' }} spacing={3} sx={{ width: 500 }}> 
              <Select
                labelId="mutiple-select-label"
                multiple
                value={selected}
                onChange={handleChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                <MenuItem
                  value="all"
                // classes={{
                //   root: isAllSelected ? classes.selectedAll : ""
                // }}
                >
                  <ListItemIcon>
                    <Checkbox
                      // classes={{ indeterminate: classes.indeterminateColor }}
                      checked={isAllSelected}
                      indeterminate={
                        selected.length > 0 && selected.length < options.length
                      }
                    />
                  </ListItemIcon>
                  <ListItemText
                    // classes={{ primary: classes.selectAllText }}
                    primary="Select All"
                  />
                </MenuItem>
                {options.map((option) => (
                  <MenuItem key={option} value={option}>
                    <ListItemIcon>
                      <Checkbox checked={selected.indexOf(option) > -1} />
                    </ListItemIcon>
                    <ListItemText primary={option} />
                  </MenuItem>
                ))}
              </Select>
            </Stack>
          </div>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" style={{ borderRadius: '20px', margin: '20px 0' }} fullWidth type="submit" onClick={handleOnSubmit}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default InputAddItem;


