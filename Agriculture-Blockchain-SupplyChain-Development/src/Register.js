import { Link } from "react-router-dom";
import "./Auth.css";

function Register() {

  return (
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
          <option value="farmer">Farmer</option>
          <option value="distributor">Distributor</option>
          <option value="retailer">Retailer</option>
        </select>

        <button type="submit">
          Register
        </button>

        {/* Login Link */}
        <p className="switch-auth">
          Already Registered? <Link to="/login">Login</Link>
        </p>

      </form>

    </div>
  );
}

export default Register;