import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

function Login() {

  const navigate = useNavigate();

  const [mobile,setMobile] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("");

  const handleSubmit = (e)=>{

    e.preventDefault();

    if(role==="farmer"){
      navigate("/farmer-dashboard");
    }
    else if(role==="distributor"){
      navigate("/distributor-dashboard");
    }
    else if(role==="retailer"){
      navigate("/retailer-dashboard");
    }
    else{
      alert("Please select role");
    }

  };

  return(

    <div className="auth-container">

      <h2>Login</h2>

      <form className="auth-form" onSubmit={handleSubmit}>

        <input
          type="tel"
          placeholder="Enter Mobile Number"
          value={mobile}
          onChange={(e)=>setMobile(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          required
        />

        <select
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          required
        >
          <option value="">Select Role</option>
          <option value="farmer">Farmer</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
        </select>

        <button type="submit">Login</button>

      </form>

      {/* REGISTER MESSAGE */}

      <p className="auth-link">
        New user? <Link to="/register">Register</Link>
      </p>

    </div>

  );
}

export default Login;