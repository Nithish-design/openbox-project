import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import { useTheme } from "../utils/useContect";

const Dashboard = () => {
  const { theme } = useTheme();
  const [data, setData] = React.useState([]);
  const [ind, setInd] = React.useState(-1);
  const [msg, setMsg] = React.useState("");
  const [singleData, setSingleData] = React.useState([]);
  const [show, setShow] = React.useState(false);
  const [dshow, setDShow] = React.useState(false);

  const handleClose = () => {
    setShow(false);
    setDShow(false);
  };

  React.useEffect(() => {
    if (singleData.length > 0) {
      const handleKeyPress = (event) => {
        if (event.key === "r" || event.key === "R") {
          setMsg("");
          setShow(true);
        }
        if (event.key === "d" || event.key === "D") {
          setDShow(true);
        }
      };

      window.addEventListener("keydown", handleKeyPress);
      return () => {
        window.removeEventListener("keydown", handleKeyPress);
      };
    }
  }, [singleData]);

  React.useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const token = queryParams.get("token");

    if (token) {
      localStorage.setItem("authToken", token);
      fetchData(token);
      // setData(oneboxList)
    } else {
      console.error("Token not found in URL");
    }
  }, []);

  const fetchData = (token) => {
    fetch("https://hiring.reachinbox.xyz/api/v1/onebox/list", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setData(d.data);
        setSingleData([]);
        setInd(-1)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getThread = (threadId) => {
    const token = localStorage.getItem("authToken");
    fetch(`https://hiring.reachinbox.xyz/api/v1/onebox/messages/${threadId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setSingleData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteThread = () => {
    const token = localStorage.getItem("authToken");
    let d = singleData[singleData.length - 1];
    fetch(
      `https://hiring.reachinbox.xyz/api/v1/onebox/messages/${d.threadId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((res) => res.json())
      .then((d) => {
        console.log(d);
        setDShow(false);
        fetchData(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const send = () => {
    const token = localStorage.getItem("authToken");
    let d = singleData[singleData.length - 1];
    const formData = {
      toName: d.fromName,
      to: d.fromEmail,
      from: d.toEmail,
      fromName: d.toName,
      subject: d.subject,
      //   body: `<pre>${msg}</pre>`,
      //   references: [],
      //   inReplyTo: "",
      body: "<p>Hello how are you</p>",
      references: [
        "<dea5a0c2-336f-1dc3-4994-191a0ad3891a@gmail.com>",
        "<CAN5Dvwu24av80BmEg9ZVDWaP2+hTOrBQn9KhjfFkZZX_Do88FA@mail.gmail.com>",
        "<CAN5DvwuzPAhoBEpQGRUOFqZF5erXc=B98Ew_5zbHF5dmeKWZMQ@mail.gmail.com>",
        "<a1383d57-fdee-60c0-d46f-6bc440409e84@gmail.com>",
      ],
      inReplyTo: "<a1383d57-fdee-60c0-d46f-6bc440409e84@gmail.com>",
    };
    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(formData),
    };

    fetch(
      `https://hiring.reachinbox.xyz/api/v1/onebox/reply/${d.threadId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then(() => {
        setShow(false);
        getThread(d.threadId);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const reset = () => {
    const token = localStorage.getItem("authToken");

    fetch("https://hiring.reachinbox.xyz/api/v1/onebox/reset", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((res) => res.json())
      .then((d) => {
        fetchData(token);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div
        className={`app-container ${
          theme === "light" ? "light-theme" : "dark-theme"
        }`}
      >
        {singleData.length > 0 && (
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Reply</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>To Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    defaultValue={singleData[0].fromEmail}
                    value={singleData[0].fromEmail}
                    onChange={(e) => setMsg(e.target.value)}
                  />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlTextarea1"
                >
                  <Form.Label>Textarea</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={() => send()}>
                Send
              </Button>
            </Modal.Footer>
          </Modal>
        )}
        <Modal show={dshow} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure want to delete this thread?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={() => deleteThread()}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <div>
          <Row>
            <Col>
              <div className="mail-inbox">
                <div
                  className="d-flex flex-row justify-content-between"
                  style={{ padding: "10px" }}
                >
                  <h6>
                    <b>All Inboxes</b>
                  </h6>
                  <Button variant="outline-secondary" onClick={() => reset()}>
                    Reset
                  </Button>
                </div>
                <div style={{ padding: "0px 10px" }}>
                  <InputGroup className="mb-3">
                    <Form.Control
                      placeholder="Search"
                      aria-label="Search"
                      aria-describedby="basic-addon2"
                    />
                    <Button variant="outline-secondary" id="button-addon2">
                      Search
                    </Button>
                  </InputGroup>
                </div>
                {data &&
                  data.map((item,index) => {
                    return (
                      <div
                        className={ind === index ? "mail-card selected" : "mail-card"}
                        onClick={() => {
                          setInd(index)
                          getThread(item.threadId);
                        }}
                      >
                        <h6>
                          <b>{item.fromEmail}</b>
                        </h6>
                        <p className="single-line-text">{item.subject}</p>
                      </div>
                    );
                  })}
              </div>
            </Col>
            <Col xs={9}>
              {singleData &&
                singleData.map((item, index) => {
                  return (
                    <div style={{ padding: "5px" }}>
                      <Card>
                        <div className="mail-content">
                          <div className="d-flex flex-row justify-content-between">
                            <h6>
                              {index % 2 != 0 ? "Re:" : ""} {item.subject}
                            </h6>
                            <span className="font-sm">{item.createdAt}</span>
                          </div>
                          <div className="font-sm">From : {item.fromEmail}</div>
                          <div className="font-sm">To : {item.toEmail}</div>
                          <br />
                          <div
                            className="font-md"
                            dangerouslySetInnerHTML={{ __html: item.body }}
                          ></div>
                        </div>
                      </Card>
                    </div>
                  );
                })}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
