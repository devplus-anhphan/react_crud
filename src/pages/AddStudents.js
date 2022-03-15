import React, { useState, useEffect } from "react";
import { Form, Alert, InputGroup, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { db } from "../firebase/firebase-config.js";
import {
    collection,
    addDoc,
    doc,
    updateDoc,
    getDoc
} from "firebase/firestore";

const AddStudent = () => {
    const [studId, setStudId] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });
    const { id } = useParams();
    const studentCollectionRef = collection(db, "students");
    const newStudent = {
        studId,
        name,
    }

    const addStudents = (newStudent) => {
        return addDoc(studentCollectionRef, newStudent);
    };

    const updateStudent = (id, updatedStudent) => {
        const studentDoc = doc(db, "students", id);
        return updateDoc(studentDoc, updatedStudent);
    };

    const getStudentInfo = (id) => {
        const studentDoc = doc(db, "students", id);
        return getDoc(studentDoc);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("");
        if (studId === "" || name === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        }
        ;
        console.log(newStudent);


        try {
            if (id !== undefined && id !== "") {
                await updateStudent(id, newStudent);
                setMessage({ error: false, msg: "Updated successfully!" });
            } else {
                await addStudents(newStudent);
                setMessage({ error: false, msg: "New student added successfully!" });
            }
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }

        setStudId("");
        setName("");
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await getStudentInfo(id);
            console.log("the record is :", docSnap.data());
            setStudId(docSnap.data().studId);
            setName(docSnap.data().name);
        } catch (err) {
            setMessage({ error: true, msg: err.message });
        }
    };

    useEffect(() => {
        console.log("The id here is : ", id);
        if (id !== undefined && id !== "") {
            editHandler();
        }
    }, [id]);
    return (
        <>
            <div className="p-4 box">
                {message?.msg && (
                    <Alert
                        variant={message?.error ? "danger" : "success"}
                        dismissible
                        onClose={() => setMessage("")}
                    >
                        {message?.msg}
                    </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formStudentId">
                        <InputGroup>
                            <InputGroup.Text id="formStudentId">ID </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={studId}
                                onChange={(e) => setStudId(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentName">
                        <InputGroup>
                            <InputGroup.Text id="formStudentName">Name </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button variant="primary" type="Submit">
                            Add/Update
                        </Button>
                    </div>
                </Form>
            </div>
        </>
    );
};
export default AddStudent;