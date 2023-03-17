import axios from "axios";
import React from "react";
import { DragDropContext } from "react-beautiful-dnd";
import TestList from "./TestList";

const Test = () => {
    const [users, setUsers] = React.useState({
        marvel_drop_area: [],
        dc_drop_area: [],
        gachi_team_area: [],
        no_gachi_area: [],
    });

    React.useEffect(() => {
        Object.keys(users).map(async (item) => {
            const { data } = await axios({
                method: "GET",
                url: "http://localhost:1080/api/places/" + item,
            });
            setUsers((prev) => ({ ...prev, [item]: data.data }));
        });
    }, []);

    const deleteItem = (list, index, bool) => {
        const removed = list.splice(index, 1)[0];
        console.log(removed);
        if (bool) {
            axios({
                method: "DELETE",
                url: "http://localhost:1080/api/places/delete/" + removed._id,
            });
        }

        return removed;
    };
    const addingItem = async (list, index, removed, type, bool) => {
        list.splice(index, 0, removed);

        if (bool) {
            axios({
                method: "POST",
                url: "http://localhost:1080/api/places/add",
                data: {
                    name: removed.name,
                    type: type,
                },
            });
        } else {
            axios({
                method: "POST",
                url: "http://localhost:1080/api/places/" + removed._id,
                data: {
                    changed: true,
                    type: type,
                    number: index + 1,
                },
            });
        }
    };
    // console.log(users);

    const onDragEnd = (result) => {
        const { source, destination } = result;

        if (!destination) return;

        if (source.droppableId === destination.droppableId) {
            setUsers((prev) => {
                const list = prev[source.droppableId];
                const removed = deleteItem(list, source.index);
                addingItem(
                    list,
                    destination.index,
                    removed,
                    destination.droppableId,
                    false
                );
                return { ...prev, [source.droppableId]: list };
            });
        } else {
            setUsers((prev) => {
                const removedList = prev[source.droppableId];
                const addingList = prev[destination.droppableId];
                const removed = deleteItem(removedList, source.index, true);
                addingItem(
                    addingList,
                    destination.index,
                    removed,
                    destination.droppableId,
                    true
                );
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
            <header className="App-header" style={{ display: "flex" }}>
                <TestList data={users} />
            </header>
        </DragDropContext>
    );
};

export default Test;
