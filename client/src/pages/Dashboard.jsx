/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  CategoryScale,
  Chart,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
} from "chart.js";
import "./Dashboard.style.css";
import { Line } from "react-chartjs-2";
import {
  Card,
  Table,
  Button,
  Modal,
  Form,
  Col,
  Row,
  Spinner,
} from "react-bootstrap";
import {
  createItem,
  getAllItems,
  removeItem,
  updateItem,
} from "../service/api";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBin5Line } from "react-icons/ri";
import moment from "moment";
import _ from "lodash";
import { useSelector, useDispatch } from "react-redux";
import Profile from "./Profile";
import { logout } from "../redux/action";

function Dashboard() {
  Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const [currentTab, setCurrentTab] = useState("home");
  const [show, setShow] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showRemove, setShowRemove] = useState(false);
  const [validated, setValidated] = useState(false);
  const [lists, setLists] = useState([]);
  const [label, setLabel] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [isActive, setisActive] = useState(false);

  const [formData, setFormData] = useState();

  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    setisActive(true);
    const form = event.currentTarget;
    event.preventDefault();
    console.log("999999999999999977777");
    if (form.checkValidity() === false) {
      console.log("9999999999999999");
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setisActive(false);
    } else {
      console.log("done");
      onFinish(event);
      setValidated(false);
    }
  };

  const finishUpdate = (event) => {
    setisActive(true);
    const form = event.currentTarget;
    event.preventDefault();
    if (
      formData.name === "" ||
      formData.quantity === "" ||
      formData.image === ""
    ) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      setisActive(false);
    } else {
      handleFinishUpdate(event);
      setValidated(false);
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseUpdate = () => {
    setFormData();
    setShowUpdate(false);
    setValidated(false);
  };
  const handleShowUpdate = () => setShowUpdate(true);
  const handleCloseRemove = () => {
    setShowRemove(false);
    setFormData();
    setValidated(false);
  };
  const handleShowRemove = () => setShowRemove(true);

  useEffect(() => {
    const hamburger = document.querySelector(".hamburger");
    const body = document.querySelector("body");

    function toggleBodyClass() {
      body.classList.toggle("active");
    }

    hamburger.addEventListener("click", toggleBodyClass);

    return () => {
      hamburger.removeEventListener("click", toggleBodyClass);
    };
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "USD Exchange Rates",
      },
    },
  };

  const onFinish = async (event) => {
    console.log(event.target[2].files[0]);
    const formdata = new FormData();
    formdata.append("name", event.target[0].value);
    formdata.append("quantity", event.target[1].value);
    formdata.append("image", event.target[2].files[0]);
    try {
      await createItem(formdata);
      console.log("api");
      handleClose();
      setisActive(false);
      listAllItems();
    } catch (error) {
      setisActive(false);
    }
  };

  const handleFinishUpdate = async (event) => {
    const formdata = new FormData();
    formdata.append("name", event.target[0].value);
    formdata.append("quantity", event.target[1].value);
    formdata.append("image", event.target[2].files[0]);
    try {
      await updateItem(formData._id, formdata);
      handleCloseUpdate();
      setisActive(false);
      listAllItems();
    } catch (error) {
      setisActive(false);
    }
  };

  const handleDelete = async () => {
    setisActive(true);
    try {
      await removeItem(formData?._id);
      handleCloseRemove();
      setisActive(false);
      listAllItems();
    } catch (error) {
      console.log({ error });
      setisActive(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files,
    });
  };

  const listAllCurrencyRate = async () => {
    var today = new Date();
    var tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 30);

    const formatedToday = moment(today.toLocaleDateString()).format(
      "YYYY-MM-DD"
    );
    const formatedFiveMonthsAgo = moment(
      tenDaysAgo.toLocaleDateString()
    ).format("YYYY-MM-DD");

    var myHeaders = new Headers();
    myHeaders.append("apikey", "0fwUViy3Osl5Dhnjt88fmD8Hh4sbwcmZ");

    var requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      `https://api.apilayer.com/fixer/timeseries?symbols=LKR%2CGBP%2CEUR%2CINR%2CAUD%2CCAD%2CJPY%2CCNY%2CRUB&base=USD&start_date=${formatedFiveMonthsAgo}&end_date=${formatedToday}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log({ result });

        const x = Object.keys(result.rates);
        let graphResult = [];

        x.map((post, index) => {
          Object.keys(result.rates[post]).map((res) => {
            graphResult.push({
              year: post,
              category: res,
              value: result.rates[post][res],
            });
          });
        });
        console.log({ graphResult });
        const graphLabels = _.flattenDeep(graphResult.map((k) => k.year));
        console.log({ graphLabels });
        setLabel(graphLabels);

        const LKR = graphResult
          .filter((item) => item.category === "LKR")
          .map((item) => item.value);
        const INR = graphResult
          .filter((item) => item.category === "INR")
          .map((item) => item.value);
        const JPY = graphResult
          .filter((item) => item.category === "JPY")
          .map((item) => item.value);
        const RUB = graphResult
          .filter((item) => item.category === "RUB")
          .map((item) => item.value);

        const data = {
          labels: _.uniq(graphLabels),
          datasets: [
            {
              label: "INR",
              data: INR,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
            {
              label: "LKR",
              data: LKR,
              borderColor: "rgba(10, 140, 66)",
              backgroundColor: "rgba(28, 186, 19)",
            },
            {
              label: "GBP",
              data: RUB,
              borderColor: "rgba(136, 7, 143)",
              backgroundColor: "rgba(221, 60, 230)",
            },
            {
              label: "JPY",
              data: JPY,
              borderColor: "rgb(53, 162, 235)",
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        };
        setGraphData(data);
        console.log({ data });
      })
      .catch((error) => {});
  };

  const listAllItems = async () => {
    try {
      const data = await getAllItems();
      console.log({ data });
      setLists(data.data);
    } catch (error) {}
  };

  useEffect(() => {
    listAllItems();
    listAllCurrencyRate();
  }, []);

  const token = useSelector((state) => state.authReducer.data);

  console.log({ token });

  const signout = () => {
    localStorage.clear();
    dispatch(logout());
  };

  return (
    <div class="wrapper">
      <ToastContainer />
      <div class="section">
        <div class="top_navbar">
          <div class="hamburger">
            <a href="#">
              <i class="fas fa-bars"></i>
            </a>
          </div>
        </div>
        <Card style={{ margin: "2rem" }}>
          <Card.Body>
            {currentTab === "home" ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  alignItems: "flex-end",
                }}
              >
                <Button style={{ marginBottom: "1rem" }} onClick={handleShow}>
                  Create New
                </Button>
                <Table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th>Quantity</th>
                      <th>Image</th>
                      <th>Created At</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lists.map((item, index) => (
                      <tr>
                        <td>{index + 1}</td>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>
                          <img
                            alt=""
                            style={{
                              height: "2rem",
                              width: "2rem",
                              borderRadius: "50%",
                            }}
                            src={item.imageUrl}
                          />
                        </td>
                        <td>
                          {moment(item.createdAt).format("DD-MM-YYYY hh:mm a")}
                        </td>
                        <td>
                          <CiEdit
                            size={18}
                            style={{
                              cursor: "pointer",
                              marginRight: "8px",
                              color: "blue",
                            }}
                            onClick={() => {
                              setFormData(item);
                              handleShowUpdate();
                            }}
                          />{" "}
                          <RiDeleteBin5Line
                            size={15}
                            onClick={() => {
                              setFormData(item);
                              handleShowRemove();
                            }}
                            style={{ cursor: "pointer", color: "red" }}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Create Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={handleSubmit}
                    >
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Item name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter item name"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            placeholder="Enter quantity"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="formFile"
                          className="mb-3"
                        >
                          <Form.Label>Image</Form.Label>
                          <Form.Control required type="file" />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          margin: "0.1rem",
                          gap: "1rem",
                        }}
                      >
                        <Button onClick={handleClose} variant="secondary">
                          Cancel
                        </Button>
                        <Button disabled={isActive} type="submit">
                          {isActive && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                          Create Item
                        </Button>
                      </Row>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={showUpdate}
                  onHide={handleCloseUpdate}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Update Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form
                      noValidate
                      validated={validated}
                      onSubmit={finishUpdate}
                    >
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom01"
                        >
                          <Form.Label>Item name</Form.Label>
                          <Form.Control
                            required
                            type="text"
                            placeholder="Enter item name"
                            value={formData?.name}
                            onChange={handleChange}
                            name="name"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row className="mb-3">
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="validationCustom02"
                        >
                          <Form.Label>Quantity</Form.Label>
                          <Form.Control
                            required
                            type="number"
                            placeholder="Enter quantity"
                            value={formData?.quantity}
                            onChange={handleChange}
                            name="quantity"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>

                      <Row>
                        <Form.Group
                          as={Col}
                          md="12"
                          controlId="formFile"
                          className="mb-3"
                        >
                          <Form.Label>Image</Form.Label>
                          <Form.Control
                            onChange={handleImageChange}
                            name="image"
                            required
                            type="file"
                          />
                          <Form.Control.Feedback>
                            Looks good!
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Row>
                      <Row
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          flexDirection: "row",
                          margin: "0.1rem",
                          gap: "1rem",
                        }}
                      >
                        <Button onClick={handleCloseUpdate} variant="secondary">
                          Cancel
                        </Button>
                        <Button disabled={isActive} type="submit">
                          {isActive && (
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                          )}
                          Update Item
                        </Button>
                      </Row>
                    </Form>
                  </Modal.Body>
                </Modal>

                <Modal
                  show={showRemove}
                  onHide={handleCloseRemove}
                  backdrop="static"
                  keyboard={false}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Remove Item</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <span>Are want to remove this item?</span>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseRemove}>
                      Cancel
                    </Button>
                    <Button
                      onClick={handleDelete}
                      variant="primary"
                      type="submit"
                    >
                      Remove
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ) : currentTab === "profile" ? (
              <Profile
                username={token?.user?.username}
                profilePicture={
                  "https://icon-library.com/images/avatar-icon-images/avatar-icon-images-4.jpg"
                }
                onSignout={signout}
              />
            ) : _.isEmpty(graphData) ? (
              <div>
                <span>Loading...</span>
              </div>
            ) : (
              <Line
                title="USD Exchange Rates"
                options={options}
                data={graphData}
              />
            )}
          </Card.Body>
        </Card>
      </div>
      <div class="sidebar">
        <div class="profile">
          <img
            src="https://icon-library.com/images/system-icon-png/system-icon-png-17.jpg"
            alt="logo_picture"
          />
          <h3>Inventory Management</h3>
          <p>System</p>
        </div>
        <ul>
          <li onClick={() => setCurrentTab("home")}>
            <a href="#" class={currentTab === "home" ? "active" : ""}>
              <span class="icon">
                <i class="fas fa-home"></i>
              </span>
              <span class="item">Home</span>
            </a>
          </li>
          <li
            onClick={() => {
              setCurrentTab("rates");
              listAllCurrencyRate();
            }}
          >
            <a href="#" class={currentTab === "rates" ? "active" : ""}>
              <span class="icon">
                <i class="fas fa-desktop"></i>
              </span>
              <span class="item">Exchange Rates</span>
            </a>
          </li>
          <li
            onClick={() => {
              setCurrentTab("profile");
            }}
          >
            <a href="#" class={currentTab === "profile" ? "active" : ""}>
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span class="item">Profile</span>
            </a>
          </li>
          <li>
            <a
              href="http://ec2-18-215-159-70.compute-1.amazonaws.com:9000"
              class={currentTab === "assign" ? "active" : ""}
              target="_blank"
              rel="noreferrer"
            >
              <span class="icon">
                <i class="fas fa-user"></i>
              </span>
              <span class="item">Assingment - 1</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
