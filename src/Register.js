import { Link } from "react-router-dom";
import "./Auth.css";

function Register(){

  return(

    <div className="auth-container">

      <h2>Register</h2>

      <form className="auth-form">

        <input
          type="text"
          placeholder="Full Name"
          required
        />

        <input
          type="tel"
          placeholder="Mobile Number"
          required
        />

        <input
          type="password"
          placeholder="Password"
          required
        />

        <select required>

          <option value="">Select Role</option>
          <option>Farmer</option>
          <option>Distributor</option>
          <option>Retailer</option>

        </select>

        <button type="submit">
          Register
        </button>

      </form>

      {/* LOGIN MESSAGE */}

      <p className="auth-link">
        Already registered? <Link to="/login">Login</Link>
      </p>

    </div>

  );
}

export default Register;