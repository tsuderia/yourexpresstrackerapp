// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('user')){
      navigate('/');
    }
  }, [navigate]);

  const [values, setValues] = useState({
    name : "",
    email : "",
    password : "",

  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

      const {name, email, password} = values;

      setLoading(false);
     
      const {data} = await axios.post(registerAPI, {
        name,
        email,
        password
      });

      if(data.success === true){
        delete data.user.password;
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(data.message, toastOptions);
        setLoading(true);
        navigate("/");
      }
      else{
        toast.error(data.message, toastOptions);
        setLoading(false);
      }
    };

  return (
    <>
    <div style={{ position: 'relative', overflow: 'hidden' }}>

      <Container className="mt-5" style={{position: 'relative', zIndex: "2 !important", color:"black !important"}}>
      <Row>
        <h1 className="text-center">
          <AccountBalanceWalletIcon sx={{ fontSize: 40, color: "black"}}  className="text-center" />
        </h1>
        <h1 className="text-center text-black">Добро пожаловать в семейную систему управления доходами</h1>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-black text-center mt-5" >Регистрация</h2>
          <Form>
            <Form.Group controlId="formBasicName" className="mt-3" >
              <Form.Label className="text-black">Имя</Form.Label>
              <Form.Control type="text"  name="name" placeholder="Имя" value={values.name} onChange={handleChange} />
            </Form.Group>
            <Form.Group controlId="formBasicEmail" className="mt-3">
              <Form.Label className="text-black">Электронная почта</Form.Label>
              <Form.Control type="email"  name="email" placeholder="lord@gmail.com" value={values.email} onChange={handleChange}/>
            </Form.Group>

            <Form.Group controlId="formBasicPassword" className="mt-3">
              <Form.Label className="text-black">Пароль</Form.Label>
              <Form.Control type="password"  name="password" placeholder="Пароль" value={values.password} onChange={handleChange} />
            </Form.Group>
            <div style={{width: "100%", display: "flex" , alignItems:"center", justifyContent:"center", flexDirection: "column"}} className="mt-4">
              <Link to="/forgotPassword" className="text-black lnk" >Забыли пароль?</Link>

              <Button
                  type="submit"
                  className=" text-center mt-3 btnStyle"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                >
                  {loading ? "Регистрация..." : "Зарегестрироваться"}
                </Button>

              <p className="mt-3" style={{color: "#9d9494"}}>Уже есть аккаунт? <Link to="/login" className="text-black lnk" >Войти</Link></p>
            </div>
          </Form>
        </Col>
      </Row>
    <ToastContainer />
    </Container>
    </div>
    </>
  )
}

export default Register