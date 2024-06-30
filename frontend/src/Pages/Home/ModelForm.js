import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const ModelForm = ({transaction, onClose, isShow}) => {


  // console.log(transaction);

  const [show, setShow] = useState(false);

  const [values, setValues] = useState({
    title : "",
    amount : "",
    description : "",
    category : "",
    date : "",
    transactionType : "",

  });

  const handleChange = (e) => {
    setValues({...values , [e.target.name]: e.target.value});
  }


  const handleClose = () => {setShow(false)};

  // const handleShow = (index) => {
  //   setShow(true)
  // };

  return (
    <div>
      <Modal show={isShow} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Обновить информацию о транзакции</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder={transaction.title}
                value={values.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAmount">
              <Form.Label>Количество</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                placeholder={transaction.amount}
                value={values.amount}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSelect">
              <Form.Label>Категория</Form.Label>
              <Form.Select
                name="category"
                value={values.category}
                onChange={handleChange}
              >
                <option value="">Выбор...</option>
                <option value="groceries">Продукты</option>
                <option value="rent">Аренда</option>
                <option value="rent">Зарплата</option>
                <option value="rent">Чаевые</option>
                <option value="rent">Еда</option>
                <option value="rent">Медицина</option>
                <option value="utilities">Коммунальные услуги</option>
                <option value="entertainment">Развлечение</option>
                <option value="transportation">Траспорт</option>
                <option value="other">Остальное</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder={transaction.description}
                value={values.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formSelect1">
              <Form.Label>Тип транзакции</Form.Label>
              <Form.Select
                name="transactionType"
                value={values.transactionType}
                onChange={handleChange}
              >
                <option value="">Выбрать...</option>
                <option value="credit">Заработок</option>
                <option value="expense">Траты</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>Дата</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={values.date}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Add more form inputs as needed */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
          <Button variant="primary">Добавить</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModelForm;
