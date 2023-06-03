import "../style/form.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'

import { defaultUserValue } from "../util";
import { addUser, editUser, unSelectUser } from "./userSlice";
import { ErrorMessageType, User } from "../types";

import plus from "../assets/plus.svg"
import minus from "../assets/minus.svg"
import { RootState } from "../store/store";


const Form = () => {
    const dispatch = useDispatch()

    const isEdit = useSelector((state: RootState) => state.userState.isEditUser)
    const editUserData = useSelector((state: RootState) => state.userState.editUserData)

    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [today, setToday] = useState<string>("")
    const [errorMsg, setErrorMsg] = useState<ErrorMessageType>({})
    const [userData, setUserData] = useState<User>(defaultUserValue)

    useEffect(() => {
        if (isEdit) {
            setUserData(editUserData)
        }
    }, [isEdit, editUserData.name])

    useEffect(() => {
        const date = new Date();

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        let currentDate = `${year}-${(month < 10 ? '0' + month : month)}-${day < 10 ? '0' + day : day}`;
        setToday(currentDate)
    }, [])

    const onSubmit = (e: React.FormEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (isValid()) {
            if (isEdit) {
                dispatch(editUser(userData))
            } else {
                dispatch(addUser(userData))
            }
            setErrorMsg({})
            setUserData(defaultUserValue)
        }
        else {
            console.log("form invalid")
        }

    }

    const isValid: () => boolean = () => {
        let error: ErrorMessageType = {};
        let valid = true;

        const { name, age, dob, email, confirmPassword, password, phone, address } = userData

        if (name.trim().length === 0) {
            error.name = "This Field Cannot be blank!";
            valid = false;
        } else if (!(/^[A-Za-z]+$/.test(name))) {
            error.name = "Name Field should not contain numbers or special characters!";
            valid = false;
        } else if (name.length > 20) {
            error.name = "Name Field should contain only 20 characters!";
            valid = false;
        }


        if (email.trim().length === 0) {
            error.email = "This Field Cannot be blank!";
            valid = false;
        } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            error.email = "Email is not valid!";
            valid = false;
        }


        if (password.trim().length === 0) {
            error.password = "This Field Cannot be blank!";
            valid = false;
        } else if (password != confirmPassword) {
            error.confirmPassword = "Password and Confirm Password is not matched!";
            valid = false;
        } else if (!(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,}$/.test(password))) {
            error.password = "Password should contain atleast one uppercase, one special character and minimum length of 10!";
            valid = false;
        }

        if (phone.trim().length === 0) {
            error.phone = "This Field Cannot be blank!";
            valid = false;
        } else if ((phone).toString().length < 8 || (phone).toString().length > 10) {
            error.phone = "Phone number length should be greater than 8 and less then 10";
            valid = false;
        } else if (!(/^\d+$/.test(phone))) {
            error.phone = "Phone number should not contain letters or special characters";
            valid = false;
        }

        if (dob.trim().length === 0) {
            error.dob = "This Field Cannot be blank!";
            valid = false;
        }


        setErrorMsg(error)
        return valid
    }

    const handleAddress = (value: string, index: number) => {
        const temp: string[] = [...userData.address];
        temp[index] = value;

        setUserData({ ...userData, address: [...temp] })
    }

    const handleAddAddress = () => {
        setUserData({ ...userData, address: [...userData.address, ""] })
    }

    const handleSubAddress = (index: number) => {
        const temp: string[] = userData.address;
        temp.splice(index, 1)
        setUserData({ ...userData, address: [...temp] })

    }

    useEffect(() => {
        let ageDifMs = Date.now() - new Date(userData.dob).getTime();
        let ageDate = new Date(ageDifMs);
        setUserData({ ...userData, age: (Math.abs(ageDate.getUTCFullYear() - 1970)).toString() })
    }, [userData.dob])

    const handleChange = (e: any) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleReset = () => {
        setUserData(defaultUserValue)
        dispatch(unSelectUser())
    }

    return (
        <section>
            <h1>{isEdit ? "Edit User" : "Add User"}</h1>
            <form>
                <input
                    name="name"
                    value={userData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    type="text"
                />
                <p>{errorMsg.name}</p>

                <input
                    name="dob"
                    value={userData.dob}
                    onChange={handleChange}
                    placeholder="Date of Birth"
                    type="date"
                    max={today}
                />
                <p>{errorMsg.dob}</p>

                <input
                    disabled
                    name="age"
                    value={userData.age}
                    placeholder="Age"
                    type="text"
                />
                <p>{errorMsg.age}</p>

                <input
                    value={userData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    type="text"
                    name="phone"
                />
                <p>{errorMsg.phone}</p>

                <div>
                    {userData.address.map((item, index) => {
                        return (
                            <div className="row">
                                <input
                                    name="address"
                                    key={index}
                                    value={item}
                                    onChange={(e) => handleAddress(e.target.value, index)}
                                    placeholder="Address"
                                    type="text"
                                />
                                {
                                    userData.address.length == 1 && index == 0 || userData.address.length - 1 === index
                                        ? <div className="addBtn" onClick={handleAddAddress}><img src={plus} alt="add" /></div>
                                        : <div className="addBtn" onClick={() => handleSubAddress(index)}><img src={minus} alt="add" /></div>
                                }
                            </div>
                        )
                    })}
                    <p>{errorMsg.address}</p>
                </div>


                <input
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Email"
                />
                <p>{errorMsg.email}</p>

                <div className="row">
                    <input
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type={showPassword ? "text" : "password"}

                    />
                    <div className="showbtn" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "hide" : "show"}
                    </div>
                </div>
                <p>{errorMsg.password}</p>

                <input
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    type={"password"}
                />
                <p>{errorMsg.confirmPassword}</p>

                <input type="submit" onClick={onSubmit} />
                <div style={{ textAlign: 'end', cursor: 'pointer' }} onClick={handleReset}>Reset form</div>
            </form>
        </section>
    );
}
export default Form;
