import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { db } from "../firebase/firebase-config.js";
import { Link } from "react-router-dom";

import {
    collection,
    getDocs,
    deleteDoc,
    doc,
} from "firebase/firestore";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const studentCollectionRef = collection(db, "students");
    useEffect(() => {
        getStudents();
    }, []);

    const getStudents = async () => {
        const data = await getDocs(studentCollectionRef);
        //console.log(data.docs);
        setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    const deleteHandler = async (id) => {
        await deleteDoc(doc(db, "students", id))
    };
    return (
        <div>
            <div className="mb-2">
                <Button variant="dark edit" onClick={getStudents}>
                    Refresh List
                </Button>
            </div>
            {students.map((doc, index) => {
                return (
                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>ID</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={doc.id}>
                                <td>{index + 1}</td>
                                <td>{doc.studId}</td>
                                <td>{doc.name}</td>
                                <td>
                                    <Link to={`/update/${doc.id}`}>
                                        <Button
                                            variant="secondary"
                                            className="edit"

                                        >
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="danger"
                                        className="delete"
                                        onClick={(e) => deleteHandler(doc.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>

                        </tbody>
                    </Table>
                );
            })}
            <div>
                <Link to={`/add`}>
                    <Button
                        variant="danger"
                        className="create"
                    >
                        Create new student
                    </Button>
                </Link>
            </div>
        </div >
    );
};

export default StudentList;