import React, { useState, useEffect } from "react";
import { Button, IconButton, InputAdornment, TextField, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Grid from '@mui/material/Grid';
import { HighlightOff, DeleteOutlineOutlined } from "@mui/icons-material";
import InputAddItem from "../InputAddItem";
import "./index.css";

const Todo = () => {
  const [searchData, setSearchData] = useState("");
  const [items, setItems] = useState([]);

  const getLocalItems = () => {
    let list = localStorage.getItem("lists");

    if (list) {
      return JSON.parse(localStorage.getItem("lists"));
    } else {
      return [];
    }
  };

  const handleOnTextSearch = (targetValue) => {
    searchItem(targetValue);
    setSearchData(targetValue);
  };

  useEffect(() => {
    setItems(getLocalItems());
  }, []);

  const renderTodoList = () => {
    console.log("rendering");
    return getLocalItems().length > 0 ? (
      <div>
        {/* <TextField fullWidth label="Search Items..." variant="standard" value={searchData} onChange={(e) => handleOnTextSearch(e.target.value)} /> */}
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {items.map((elem, id) => {
            return (
              <Grid item xs={4} style={{ margin: '0 0 20px 0' }}>
                <div key={id} className="todo-item">
                  <Tooltip title={elem.title}>
                    <span style={elem.checked ? { textDecoration: "line-through" } : null} className="todo-item-text">
                      <b>{elem.title}</b>
                      <p>{elem.des}</p>
                      {/* {SelectList(elem.select)} */}
                      <div className="tag-list">
                        <span>Tags : </span>
                        <ul>
                          {/* {select.map(item => {
                            return ( */}
                          {elem.select && elem.select.map((item) => {
                            return (
                              <li>{item}</li>
                            )
                          })}
                          {/* )
                          })} */}
                        </ul>
                      </div>
                      <div className="identifier">{elem.identifier}</div>
                    </span>
                  </Tooltip>
                  <div className="delete-btn">
                    <IconButton size="small" variant="outlined" color="error" onClick={() => deleteItem(id)}>
                      <DeleteOutlineOutlined fontSize="small" />
                    </IconButton>
                  </div>
                </div>
              </Grid>
            );
          })}
        </Grid>
      </div>
    ) : (
      <></>
    );
  };

  const renderTodoListFooter = () => {
    return items.length > 0 ? (
      <div className="card-full-width" style={{ textAlign: "center" }}>
        <Button size="small" variant="outlined" color="error" onClick={() => removeAll()}>
          <HighlightOff fontSize="small" /> &nbsp; RESET LIST
        </Button>
      </div>
    ) : (
      <></>
    );
  };

  const addItem = (title, des, identi, selected) => {
    if (title && des === "") {
      alert('EMPTY list');
    } else {
      const newInputValue = title.charAt(3).toUpperCase() + title.slice(1);
      const newIdentifier = identi.split(/[\s]+/).join("-");
      const newInputValueArray = { id: Math.random(), title: newInputValue, des: des, select: selected, identifier: newIdentifier };
      setItems([newInputValueArray, ...items]);
      localStorage.setItem("lists", JSON.stringify([newInputValueArray, ...items]));
    }
  };

  // delete the items
  const deleteItem = (index) => {
    if (window.confirm(' are you sure DELETE')) {
      const updatedItems = items.filter((elem, ind) => {
        return index !== ind;
      });

      localStorage.setItem("lists", JSON.stringify(updatedItems));
      setItems(updatedItems);
    }
  };



  // remove all items
  const removeAll = () => {
    if (window.confirm(' are you sure, your all data has deleting...')) {
      setItems([]);
      localStorage.setItem("lists", JSON.stringify([]));
    }
  };

  // search items
  const searchItem = (value) => {
    // debugger
    if (value === "") {
      setItems(getLocalItems());
      return;
    }
    const searchItems = items.filter((elem, ind) => {
      return elem.title.toLowerCase().includes(value.trim())
    });

    console.log(searchItems)

    setItems(searchItems);
  };

  console.log(items)


  return (
    <>
      <header item={true} id="main-container" style={{ margin: "0 auto" }}>
        <div className="inner-div">
          <TextField fullWidth
            sx={{ bgcolor: '#fff', borderRadius: 0, border: 0, }}
            label="Search Items..." style={{ margin: 0, }}
            InputProps={{
              startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment>,
            }}
            variant="outlined" value={searchData} onChange={(e) => handleOnTextSearch(e.target.value)} />
          <InputAddItem addItem={addItem} />
        </div>
      </header>
      <section className="list-setion">
        <div className="inner-list-div">
          {renderTodoList()}
          <div className="all-clear-btn">
            {renderTodoListFooter()}
          </div>
        </div>
      </section>
    </>
  );
};

export default Todo;
