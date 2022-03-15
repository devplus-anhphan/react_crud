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
    const [sex, setSex] = useState("");
    const [dob, setDOB] = useState("");
    const [nationality, setNationality] = useState("");
    const [major, setMajor] = useState("");
    const [course, setCourse] = useState("");
    const [message, setMessage] = useState({ error: false, msg: "" });

    const { id } = useParams();

    const studentCollectionRef = collection(db, "students");
    const newStudent = {
        studId, name, sex, dob, nationality, major, course
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
        if (studId === "" || name === "" || sex === "" || dob === "" || nationality === "" || major === "" || course === "") {
            setMessage({ error: true, msg: "All fields are mandatory!" });
            return;
        };
        //console.log(newStudent);
        // if (!studId.match('/^[0-9]{0,9}$/')) {
        //     setMessage({ error: true, msg: "Student ID only contains string of number with the length of 9" });
        //     return;
        // }
        // if (!name.match('/^[a-z A-Z]{1,50}$/')) {
        //     setMessage({ error: true, msg: "Name only contains letter and has length of 50 maximum" });
        //     return;
        // }
        // if (!dob.match('/^\d{1,2}\/\d{1,2}\/\d{4}$/')) {
        //     setMessage({ error: true, msg: "Date of birth should follow the form: dd/mm/yyyy" });
        //     return;
        // }
        // if (!sex.match('/^[a-zA-Z]{1,50}$/')) {
        //     setMessage({ error: true, msg: "Retype the sex" });
        //     return;
        // }
        // if (!nationality.match('/^[a-zA-Z]{1,20}$/')) {
        //     setMessage({ error: true, msg: "Retype the nationality" });
        //     return;
        // }
        // if (!major.match('/^[a-z A-Z]{1,30}$/')) {
        //     setMessage({ error: true, msg: "Major only contains letter and has length of 30 maximum" });
        //     return;
        // }
        // if (!course.match('/^[a-z A-Z]{1,50}$/')) {
        //     setMessage({ error: true, msg: "Course name only contains letter and has length of 50 maximum" });
        //     return;
        // }

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
        setSex("");
        setDOB("");
        setNationality("");
        setMajor("");
        setCourse("")
    };

    const editHandler = async () => {
        setMessage("");
        try {
            const docSnap = await getStudentInfo(id);
            console.log("the record is :", docSnap.data());
            setStudId(docSnap.data().studId);
            setName(docSnap.data().name);
            setSex(docSnap.data().sex);
            setDOB(docSnap.data().dob);
            setNationality(docSnap.data().nationality);
            setMajor(docSnap.data().major);
            setCourse(docSnap.data().course);
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
            <h1>Create form</h1>
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

                    <Form.Group className="mb-3" controlId="formStudentSex">
                        <InputGroup>
                            <InputGroup.Text id="formStudentSex">Sex</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentDOB">
                        <InputGroup>
                            <InputGroup.Text id="formStudentDOB">DOB </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={dob}
                                onChange={(e) => setDOB(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentNationality">
                        <InputGroup>
                            <InputGroup.Text id="formStudentNationality">Nationality </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={nationality}
                                onChange={(e) => setNationality(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentMajor">
                        <InputGroup>
                            <InputGroup.Text id="formStudentMajor">Major </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={major}
                                onChange={(e) => setMajor(e.target.value)}
                            />
                        </InputGroup>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formStudentCourse">
                        <InputGroup>
                            <InputGroup.Text id="formStudentCourse">Course </InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
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