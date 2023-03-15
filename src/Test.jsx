import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TestList from "./TestList";

const Test = () => {
    const [users, setUsers] = React.useState({
        marvel_drop_area: [
            "Captain America",
            "Iron Man",
            "SpiderMan",
            "Thor",
            "Hulk",
            "Black Widow",
            "Loki",
            "Black Panther",
            "Deadpool",
            "Doctor Strange",
            "Ant Man",
            "Captain Marvel",
        ],
        dc_drop_area: [
            "BatMan",
            "SuperMan",
            "Wonder Woman",
            "Flash",
            "Green Lantern",
            "AquaMan",
            "Robin",
            "Cyborg",
            "StarFire",
            "HawkGirl",
            "Shazam",
        ],
        gachi_team_area: [
            "Islam",
            "Husen",
            "Musa",
            "Abdula",
            "Ahmad",
            "Amal",
            "Sulumbeck",
            "DJabrail",
            "Muslim",
            "Arbi",
            "Shazam",
        ],
        no_gachi_area: [
            "Murad",
            "Soaleh",
            "Amin",
            "Amin-fazik",
            "Ahmad",
            "Amal",
            "Sulumbeck",
            "DJabrail",
            "Muslim",
            "Arbi",
            "Shazam",
        ],
    });

    const deleteItem = (list, index) => {
        return list.splice(index, 1);
    };

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            setUsers((prev) => {
                const list = prev[source.droppableId];
                const removed = deleteItem(list, source.index);
                list.splice(destination.index, 0, removed);
                return { ...prev, [source.droppableId]: list };
            });
        } else {
            setUsers((prev) => {
                const removedList = prev[source.droppableId];
                const addingList = prev[destination.droppableId];

                const removed = deleteItem(removedList, source.index);
                addingList.splice(destination.index, 0, removed);
                return {
                    ...prev,
                    [source.droppableId]: removedList,
                    [destination.droppableId]: addingList,
                };
            });
        }
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <button
                onClick={() =>
                    setUsers((prev) => ({
                        ...prev,
                        marvel_drop_area: [],
                        dc_drop_area: [
                            ...prev.marvel_drop_area,
                            ...prev.dc_drop_area,
                        ],
                    }))
                }
            ></button>
            <header className="App-header" style={{ display: "flex" }}>
                <TestList data={users} />
            </header>
        </DragDropContext>
    );
};

export default Test;
