import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
    const {setToken} = useContext(AppContext)
    const navigate = useNavigate()


const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
})

const [errors, setErrors] = useState({})

async function handleRegister(event) {
    event.preventDefault();
    const res = await fetch("/api/register", {
        method: "post",
        body: JSON.stringify(formData),
    });

    const data = await res.json()

    if(data.errors) {
        setErrors(data.errors)
    } else {
        localStorage.setItem('token', data.token)
        setToken(data.token)
        navigate("/");
        console.log(data);
    }


}

    return (
      <>
      <h1 className="title">Register a new account</h1>

      <form onSubmit={handleRegister} className="w-1/2 mx-auto space-y-6">
        <div>
            <input 
                type="text" 
                placeholder="Name" 
                value={formData.name}
                onChange={(event) => setFormData({...formData, name: event.target.value})}
            />
            {errors.name && <p className="error">{errors.name[0]}</p>}
        </div>
        <div>
            <input 
                type="text" 
                placeholder="Email"
                value={formData.email}
                onChange={(event) => setFormData({...formData, email: event.target.value})}
            />
             {errors.email && <p className="error">{errors.email[0]}</p>}
        </div>
        <div>
            <input 
                type="password" 
                placeholder="Password"
                value={formData.password}
                onChange={(event) => setFormData({...formData, password: event.target.value})}
            />
             {errors.password && <p className="error">{errors.password[0]}</p>}
        </div>
        <div>
            <input 
                type="password"
                placeholder="Confirm Password" 
                value={formData.password_confirmation}
                onChange={(event) => setFormData({...formData, password_confirmation: event.target.value})}
            />
        </div>
        <button className="primary-btn">Register</button>
      </form>
      </>
    );
  }