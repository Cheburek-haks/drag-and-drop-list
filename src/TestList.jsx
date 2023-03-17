import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd";
import "./App.css";
const TestList = ({ data }) => {
    console.log(data);
    const handleChooseClassesList = (isDragging) => {
        return "list" + " " + (isDragging ? "list_is_dragging" : " ");
    };

    const handleChooseClassesItem = (isDragging) => {
        return "item" + " " + (isDragging ? "item_is_dragging" : " ");
    };

    return (
        <>
            {Object.entries(data).map((item) => (
                <div style={{ width: "100%", display: "flex" }}>
                    <Droppable droppableId={item[0]}>
                        {(provided, snapshot) => (
                            <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                className={handleChooseClassesList(
                                    snapshot.isDraggingOver
                                )}
                            >
                                <ul
                                    style={{
                                        listStyleType: "none",
                                        textAlign: "left",
                                        padding: "0%",
                                        width: "100%",
                                    }}
                                >
                                    <h6 style={{ paddingLeft: "2%" }}>
                                        Marvel SuperHeroes
                                    </h6>
                                    {item[1].map((elem, index) => (
                                        <Draggable
                                            key={elem._id}
                                            draggableId={`${elem._id}${index}`}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <li
                                                    key={elem._id + index}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={handleChooseClassesItem(
                                                        snapshot.isDragging
                                                    )}
                                                    style={
                                                        provided.draggableProps
                                                            .style
                                                    }
                                                >
                                                    {elem.name}
                                                </li>
                                            )}
                                        </Draggable>
                                    ))}
                                </ul>
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            ))}
        </>
    );
};

export default TestList;
