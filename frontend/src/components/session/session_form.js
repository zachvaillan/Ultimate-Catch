import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../../../assets/stylesheets/session_form.css'

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      handle: "",
      password: "",
      password2: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.update = this.update.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
    this.handleDemo = this.handleDemo.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      this.props.history.push("/main");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  renderErrors() {
    return (
      <ul>
        {Object.keys(this.props.errors).map((error, i) => (
          <li key={`error-${i}`}>{this.props.errors[error]}</li>
        ))}
      </ul>
    );
  }

  handleDemo(e) {
    e.preventDefault();

    let i = 0;
    let j = 0;
    let demoEmail = "goneFishin@motorboatin.com";
    let demoPassword = "password";

    const typeUser = () => {
      let timeout;
      if (i < demoEmail.length) {
        document.getElementById("email").value += demoEmail.charAt(i);
        i++;
        timeout = setTimeout(typeUser, 100);
      } else {
        clearTimeout(timeout)
      }
    }

    const typePw = () => {
      let timeout;
      if (j < demoPassword.length) {
        document.getElementById("password").value += demoPassword.charAt(j);
        j++;
        timeout = setTimeout(typePw, 100);
      } else {
        clearTimeout(timeout)
      }
    }

    if (this.props.formType === 'demo') {
      typeUser();

      window.setTimeout(() => {
        typePw();
      }, 1500)

      window.setTimeout(() => {
        this.setState({ email: "goneFishin@motorboatin.com", password: "password"}, () => {
          const user = Object.assign({}, this.state);
          this.props.login(user)
            .then(() => this.props.history.push("/main"));
        });
      }, 3000)
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = Object.assign({}, this.state);
    if (this.props.formType === "login") {
      this.props.login(user)
        .then(() => this.props.history.push("/main"));
    } else {
      this.props.signup(user)
        .then(res => {
          if(!res.errors) this.props.login(user)
          .then(() => this.props.history.push("/main"));     
        })
    }
  }

  render() {
    return (
      <div className="form-container flex">

        <span className="logo">Ultimate Catch</span>

        <div className="links">
          <Link to="/login" className="session-link"><span className={this.props.formType === "login" ? "active" : "inactive"}>LOG IN</span>
          </Link>

          <Link to="/signup" className="session-link"><span className={this.props.formType === "signup" ? "active" : "inactive"}>SIGN UP</span>
          </Link>

          <Link to="/demo" className="session-link"><span className={this.props.formType === "demo" ? "active-demo" : "inactive"}>DEMO</span>
          </Link>
        </div><br />

        <div id="user-auth-errors">
          {this.renderErrors()}
        </div>

        <form className="form flex">

          <input
            id="email"
            className="input"
            onChange={this.update("email")}
            placeholder="Email"
            type="text"
            name="email"
          />

          <input
            className={this.props.formType === "signup" ? "input email" : "hidden"}
            onChange={this.update("handle")}
            placeholder="Username"
            type="text"
            name="handle"
            value={this.state.handle}
          />

          <input
            id="password"
            className="input"
            onChange={this.update("password")}
            placeholder="Password"
            type="password"
            name="password"
          />

          <input
            className={this.props.formType === "signup" ? "input email" : "hidden"}
            onChange={this.update("password2")}
            placeholder="Confirm Password"
            type="password"
            name="password2"
            value={this.state.password2}
          />

          <input
            className="input submit"
            onClick={this.props.formType === "demo" ? this.handleDemo : this.handleSubmit}
            type="submit"
            value={this.props.formHeader}
          />
        </form>
      </div>
    );
  }

}

export default withRouter(SessionForm);