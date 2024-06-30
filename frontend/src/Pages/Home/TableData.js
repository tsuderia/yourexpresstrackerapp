import React, { useEffect, useState } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import moment from "moment";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import "./home.css";
import { deleteTransactions, editTransactions, getUser } from "../../utils/ApiRequest";
import axios from "axios";

const TableData = (props) => {
  const [show, setShow] = useState(false);
  const [transactions, setTransactions] = useState([]);
  // const [loading, setLoading] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [currId, setCurrId] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [user, setUser] = useState(null);

  const handleEditClick = (itemKey) => {
    // const buttonId = e.target.id;
    console.log("Clicked button ID:", itemKey);
    if (transactions.length > 0) {
      const editTran = props.data.filter((item) => item._id === itemKey);
      setCurrId(itemKey);
      setEditingTransaction(editTran);
      handleShow();
    }
  };

  const handleEditSubmit = async (e) => {
    // e.preventDefault();

    const {data} = await axios.put(`${editTransactions}/${currId}`, {
      ...values,
    });

    if(data.success === true){

      await handleClose();
      await setRefresh(!refresh);
      window.location.reload();
    }
    else{
      console.log("error");
    }

  }

  const handleDeleteClick = async (itemKey) => {
    console.log(user._id);
    console.log("Clicked button ID delete:", itemKey);
    setCurrId(itemKey);
    const {data} = await axios.post(`${deleteTransactions}/${itemKey}`,{
      userId: props.user._id,
    });

    if(data.success === true){
      await setRefresh(!refresh);
      window.location.reload();
    }
    else{
      console.log("error");
    }

  };

  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    user: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };
  
  useEffect(() => {
    setUser(props.user);
    setTransactions(props.data);
  }, [props.data,props.user, refresh]);

  return (
    <>
      <Container>
        <Table responsive="md" className="data-table">
          <thead>
            <tr>
              <th>Дата</th>
              <th>Заголовок</th>
              <th>Количество</th>
              <th>Тип</th>
              <th>Категории</th>
              <th>Пользователь</th>
              <th>Действие</th>
            </tr>
          </thead>
          <tbody className="text-black">
            {props.data.map((item, index) => (
              <tr key={index}>
                <td>{moment(item.date).format("YYYY-MM-DD")}</td>
                <td>{item.title}</td>
                <td>{item.amount}</td>
                <td>{item.transactionType}</td>
                <td>{item.category}</td>
                <td>{item.username}</td>
                <td>
                  <div className="icons-handle">
                    <EditNoteIcon
                      sx={{ cursor: "pointer" }}
                      key={item._id}
                      id={item._id}
                      onClick={() => handleEditClick(item._id)}
                    />

                    <DeleteForeverIcon
                      sx={{ color: "red", cursor: "pointer" }}
                      key={index}
                      id={item._id}
                      onClick={() => handleDeleteClick(item._id)}
                    />

                    {editingTransaction ? (
                      <>
                        <div>
                          <Modal show={show} onHide={handleClose} centered>
                            <Modal.Header closeButton>
                              <Modal.Title>
                                Обновить информацию о транзакции
                              </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form onSubmit={handleEditSubmit}>
                                <Form.Group
                                  className="mb-3"
                                  controlId="formName"
                                >
                                  <Form.Label>Заголовок</Form.Label>
                                  <Form.Control
                                    name="title"
                                    type="text"
                                    placeholder={editingTransaction[0].title}
                                    value={values.title}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formAmount"
                                >
                                  <Form.Label>Количество</Form.Label>
                                  <Form.Control
                                    name="amount"
                                    type="number"
                                    placeholder={editingTransaction[0].amount}
                                    value={values.amount}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect"
                                >
                                  <Form.Label>Категории</Form.Label>
                                  <Form.Select
                                    name="category"
                                    value={values.category}
                                    onChange={handleChange}
                                  >
                                    <option value="">{editingTransaction[0].category}</option>
                                    <option value="Groceries">Продукты</option>
                                    <option value="Rent">Аренда</option>
                                    <option value="Salary">Зарплата</option>
                                    <option value="Tip">Чаевые</option>
                                    <option value="Food">Еда</option>
                                    <option value="Medical">Медицина</option>
                                    <option value="Utilities">Коммунальные услуги</option>
                                    <option value="Entertainment">
                                      Развлечения
                                    </option>
                                    <option value="Transportation">
                                      Транспорт
                                    </option>
                                    <option value="Other">Остальное</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDescription"
                                >
                                  <Form.Label>Описание</Form.Label>
                                  <Form.Control
                                    type="text"
                                    name="description"
                                    placeholder={editingTransaction[0].description}
                                    value={values.description}
                                    onChange={handleChange}
                                  />
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formSelect1"
                                >
                                  <Form.Label>Тип транзакции</Form.Label>
                                  <Form.Select
                                    name="transactionType"
                                    value={values.transactionType}
                                    onChange={handleChange}
                                  >
                                    <option value={editingTransaction[0].transactionType}>{editingTransaction[0].transactionType}</option>
                                    <option value="Credit">Зарплата</option>
                                    <option value="Expense">Траты</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group
                                  className="mb-3"
                                  controlId="formDate"
                                >
                                  <Form.Label>Дата</Form.Label>
                                  <Form.Control
                                    type="date"
                                    name="date"
                                    value={values.date}
                                    onChange={handleChange}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant="secondary" onClick={handleClose}>
                                Закрыть
                              </Button>
                              <Button variant="primary" type="submit" onClick={handleEditSubmit}>Отправить</Button>
                            </Modal.Footer>
                          </Modal>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
};

export default TableData;
