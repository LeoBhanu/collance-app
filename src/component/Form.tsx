import "../style/form.css";
import { useState } from "react";
import { ErrorType } from "../util";

const Form = () => {
    const [name, setName] = useState<string>("")
    const [age, setAge] = useState<string>("")
    const [dob, setDOB] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [address, setAddress] = useState<string[]>([""])
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const [errorMsg, setErrorMsg] = useState<any>({})

    const onSubmit = (e: any) => {
        e.preventDefault();

        if (isValid()){
            console.log("submitted");
            // redux set

        }
    };


    const isValid: any = () => {
        let error: any = {};
        let valid = true;

        if (name.trim().length === 0) {
            error.name = "This Field should not be empty!";
            valid = false;
        }
        
        // if (address.trim().length === 0) {
        //     error.address = "This Field should not be empty!";
        //     valid = false;
        // }
        
        if (email.trim().length === 0) {
            error.email = "This Field should not be empty!";
            valid = false;
        } else if(email) {
            //todo:
            error.email = "Email is not valid!";
            valid = false;
        }


        if (password.trim().length === 0) {
            error.password = "This Field should not be empty!";
            valid = false;
        } else if(password != confirmPassword){
            error.confirmPassword = "Password and Confirm Password is not matched!";
            valid = false;
        }


        if(Number(age) <= 0) {
            error.age = "Age is invalid!";
            valid = false;
        }

        if (phone.trim().length === 0) {
            error.phone = "This Field should not be empty!";
            valid = false;
        } else if((phone).toString().length < 8 || (phone).toString().length > 10){
            error.phone = "Phone number length should be greater than 8 and less then 10";
            valid = false;
        }
        
        if (dob.trim().length === 0) {
            error.dob = "This Field should not be empty!";
            valid = false;
        } else {
            //todo:
            valid = false;
        }


        if (email.trim().length === 0) {
            error.email = "This Field should not be empty!";
            valid = false;
        } else {

            valid = false;
        }

        setErrorMsg(error)

        return valid
    }


    const handleAddress = (value:any, index:number) => {
        address[index] = value;
        setAddress([...address])
    }

    const handleAddAddress = () =>{
        setAddress([...address, ""])
    }

    const handleSubAddress = (index:number) => {
        address.splice(index, 1)
        setAddress([...address])
        
    }

    return (
        <section>
            <h1>Add User</h1>
            <form>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    type="text"
                />
                <p>{errorMsg.name}</p>

                <input
                    name="age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="Age"
                    type="number"
                />
                <p>{errorMsg.age}</p>

                <input
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                    placeholder="Date of Birth"
                    type="date"
                    // min
                />
                <p>{errorMsg.dob}</p>

                <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    type="number"
                />
                <p>{errorMsg.phone}</p>

                <div>
                    {address.map((item, index) => {
                       return(
                            <div className="row">
                                <input
                                    key={index}
                                    value={item}
                                    onChange={(e)=> handleAddress(e.target.value, index)}
                                    placeholder="Address"
                                    type="text"
                                /> 
                                {
                                    address.length == 1 && index == 0 || address.length - 1 === index
                                    ? <div className="addBtn" onClick={handleAddAddress}>Add +</div>
                                    : <div className="addBtn" onClick={()=>handleSubAddress(index)}> Sub - </div>
                                }
                            </div>
                            )
                    })}
                    <p>{errorMsg.address}</p>
                </div>


                <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email"
                />
                <p>{errorMsg.email}</p>


                <input
                    className="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                // type={showPass ? "text" : "password"}
                />
                {/* <div onClick={() => setShowPass(!showPass)}>
                    {showPass ? "hide" : "show"}
                </div> */}
                <p>{errorMsg.password}</p>

                <input
                    className="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    type={"password"}
                />
                <p>{errorMsg.confirmPassword}</p>

                <input type="submit" onClick={onSubmit} />
            </form>
        </section>
    );
};

export default Form;
