import React from "react";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { FaPlusCircle } from "react-icons/fa";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import List from "./List";
import ProgressBar from "./ProgressBar.js";
import { StaticImageData } from "./Data";

class ChooseCampaign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newComapign: false,
      campaignsList: [],
      productsList: [],
      page: 1,
      radioValue: "1",
      sliderValue: 1,
      rangeKm: 0,
    };
  }

  radios = [
    { name: "Location", value: "1" },
    { name: "Radius ", value: "2" },
  ];

  createNewCompaign = () => {
    this.setState({ newComapign: true });
  };

  Continue = () => {
    let nextPage = this.state.page + 1;
    if (nextPage === 2) {
      this.getProductsList();
    } else if (nextPage >= 5) {
      this.addCampaignToList();
    }
    this.setState({ page: nextPage });
  };

  addCampaignToList = () => {
    let data = {
      campaignId: this.state.selectedCampaignId,
      productId: this.state.selectedProductId,
      start_date: this.state.Start_date,
      end_date: this.state.End_date,
      loc: this.state.Loc,
    };
    console.log(data);
    axios
      .post(`https://still-woodland-42739.herokuapp.com/addCampaign`, data)
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          this.setState({ selectedCampaignId: "" });
          this.setState({ selectedProductId: "" });
          this.setState({ newComapign: false });
          this.setState({ page: 1 });
          this.getCampaignsList();
        } else {
          alert("data storing failed");
        }
      })
      .catch((e) => {
        console.log("e");
      });
  };

  getCampaignsList = () => {
    console.log("getData");
    axios
      .get(`https://still-woodland-42739.herokuapp.com/campaignsList`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ campaignsList: data });
      })
      .catch((e) => {
        console.log("e");
      });
  };

  changeStartDate = (value) => {
    this.setState({ Start_date: value });
  };

  changeEndDate = (value) => {
    this.setState({ End_date: value });
  };

  changeAddrField = (value) => {
    this.setState({ Loc: value });
    console.log(this.state.Start_date);
    console.log(this.state.End_date);
    console.log(this.state.Loc);
  };

  getProductsList = () => {
    console.log("getData");
    axios
      .get(`https://still-woodland-42739.herokuapp.com/productsList`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ productsList: data });
      })
      .catch((e) => {
        console.log("e");
      });
  };

  clickedCard = (id) => {
    this.setState({ selectedCampaignId: id });
    let allCards = document.getElementsByClassName("clickableCard");
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].style.borderColor = "#F3F3F3";
      console.log(allCards[i]);
    }
    let selectedCard = document.getElementById(id);
    selectedCard.style.borderColor = "blue";
    console.log(this.state.selectedCampaignId);
  };

  clickedProductCard = (id) => {
    console.log(id);
    this.setState({ selectedProductId: id });
    let allCards = document.getElementsByClassName("clickedProductCard");
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].style.borderColor = "#F3F3F3";
      console.log(allCards[i]);
    }
    let selectedCard = document.getElementById(id);
    selectedCard.style.borderColor = "blue";
    console.log(this.state.selectedCampaignId);
    console.log(this.state.selectedProductId);
  };
  clickedDemoCard = (id) => {
    console.log(id);
    let allCards = document.getElementsByClassName("clickedDemoCard");
    for (var i = 0; i < allCards.length; i++) {
      allCards[i].style.borderColor = "#F3F3F3";
      console.log(allCards[i]);
    }
    let selectedCard = document.getElementById(id);
    selectedCard.style.borderColor = "blue";
    console.log(this.state.selectedCampaignId);
    console.log(this.state.selectedProductId);
  };
  locParamChange = (id) => {
    console.log(id);
  };
  changeRange = (value) => {
    this.setState({ rangeKm: value });
  };

  componentDidMount() {
    console.log("didMount");
    this.getCampaignsList();
  }

  render() {
    return (
      <div className="container root">
        {this.state.newComapign ? (
          <div className="root2">
            <Row className="m-4">
              <Col xs={10}>
                <h2>Your Ad Campaign</h2>
                <p>Launch your ad in just 4 easy steps</p>
              </Col>
            </Row>
            <ProgressBar pageNo={this.state.page}></ProgressBar>

            <div className="card my-4 pt-4">
              <h5 className="mx-4 ">
                {this.state.page === 1
                  ? "What you want to do? (Step " + this.state.page + "  of 4)"
                  : this.state.page === 2
                  ? "Choose the Product (Step " + this.state.page + "  of 4)"
                  : this.state.page === 3
                  ? "Campaign Settings (Step " + this.state.page + "  of 4)"
                  : this.state.page === 4
                  ? "Ready to Go (Step " + this.state.page + "  of 4)"
                  : null}
              </h5>
              <hr class="hr3 mx-4"></hr>
              {this.state.page === 1 ? (
                <Row xs={1} md={3} className="g-4 m-4">
                  {this.state.campaignsList.map((cardData, idx) => (
                    <Col>
                      <Card
                        className="clickableCard"
                        id={cardData._id}
                        onClick={(e) => this.clickedCard(cardData._id)}
                        style={{ border: "2px solid #F3F3F3" }}
                      >
                        <Card.Body>
                          <Row>
                            <Col xs="3">
                              <i
                                class={cardData.Campaign_icon}
                                style={{ fontSize: "3em" }}
                              ></i>
                            </Col>
                            <Col xs>
                              <Row>
                                <h6>{cardData.Campaign_name}</h6>
                              </Row>
                              <Row>
                                <p>{cardData.Platform}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : this.state.page === 2 ? (
                <Row xs={1} md={3} className="g-4 m-4">
                  {this.state.productsList.map((cardData, idx) => (
                    <Col>
                      <Card
                        className="clickedProductCard"
                        id={cardData._id}
                        onClick={(e) => this.clickedProductCard(cardData._id)}
                        style={{ border: "2px solid #F3F3F3" }}
                      >
                        <Card.Body>
                          <Row>
                            <Col xs="3">
                              <Image
                                src={cardData.Product_img}
                                width={70}
                                height={70}
                              />
                            </Col>
                            <Col xs>
                              <Row>
                                <h6>{cardData.Product_name}</h6>
                              </Row>
                              <Row>
                                <p>{cardData.Product_price}</p>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : this.state.page === 3 ? (
                <Row xs={1} className="g-4 m-4">
                  <Row>
                    <Col>
                      <label>Start Date</label>
                      <Form.Control
                        type="date"
                        id="start_date"
                        onChange={(e) => this.changeStartDate(e.target.value)}
                      />
                    </Col>
                    <Col>
                      <label>End Date</label>
                      <Form.Control
                        type="date"
                        id="end_date"
                        onChange={(e) => this.changeEndDate(e.target.value)}
                      />
                    </Col>
                  </Row>
                  <Row className="mt-4">
                    <label>Location Info</label>
                    <div className="mb-2">
                      <ButtonGroup>
                        {this.radios.map((radio, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant={
                              this.state.radioValue === radio.value
                                ? "outline-primary"
                                : "outline-primary"
                            }
                            name="radio"
                            value={radio.value}
                            checked={this.state.radioValue === radio.value}
                            onChange={(e) =>
                              this.setState({
                                radioValue: e.currentTarget.value,
                              })
                            }
                            defaultValue={1}
                          >
                            {radio.name}
                          </ToggleButton>
                        ))}
                      </ButtonGroup>
                    </div>
                  </Row>
                  <Row className="p-4">
                    {this.state.radioValue === "1" ? (
                      <Form.Control
                        type="text"
                        placeholder="Enter a place name, address"
                        onChange={(e) => this.changeAddrField(e.target.value)}
                      />
                    ) : (
                      <>
                        <Form.Control
                          type="text"
                          placeholder="Enter a place name, address"
                          onChange={(e) => this.changeAddrField(e.target.value)}
                        />
                        <div class="slidecontainer mt-4">
                          <label>Select target radius</label>
                          <input
                            type="range"
                            min="1"
                            max="30"
                            defaultValue={0}
                            class="slider"
                            id="myRange"
                            onChange={(e) => this.changeRange(e.target.value)}
                            style={{ width: "100%" }}
                          />
                          <p>
                            Range:{" "}
                            <span id="rangeInKm">{this.state.rangeKm}</span> km
                          </p>
                        </div>
                      </>
                    )}
                  </Row>
                </Row>
              ) : this.state.page === 4 ? (
                <Row xs={1} md={4} className="g-4 m-4">
                  {StaticImageData.map((cardData, idx) => (
                    <Col>
                      <Card
                        className="clickedDemoCard"
                        id={idx}
                        onClick={(e) => this.clickedDemoCard(idx)}
                        style={{ border: "2px solid #F3F3F3" }}
                      >
                        <Card.Header className="card-header">
                          <Row>
                            <Col xs="3">
                              <Image
                                src={cardData}
                                width={60}
                                height={60}
                                className="border-radius"
                              />
                            </Col>
                            <Col xs>
                              <Row>
                                <h6>Mukund Cake Shop</h6>
                              </Row>
                              <Row>
                                <p>Sponsored</p>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Header>
                        <Card.Body>
                          <Card.Text>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry. Lorem Ipsum has been the
                            industry's standard dummy text ever since the 1500s,
                            when an unknown printer took a galley of type and
                            scrambled it to make a type specimen book.
                          </Card.Text>
                        </Card.Body>
                        <Card.Img variant="bottom" src={cardData} />
                      </Card>
                    </Col>
                  ))}
                </Row>
              ) : null}
              <div align="end" className="m-4">
                <Button
                  variant="primary"
                  align="end"
                  className="continueButton"
                  size="sm"
                  onClick={(e) => this.Continue(this.state.page)}
                >
                  {this.state.page > 3 ? "Start Campaign" : "Continue"}{" "}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <Row className="m-4">
              <Col xs={9}>
                <h2>Your Campaigns</h2>
                <p>Check the list of campigns you created</p>
              </Col>
              <Col xs={3}>
                <Button
                  variant="primary"
                  align="end"
                  id="createNewCampaign"
                  onClick={(e) => this.createNewCompaign()}
                >
                  <FaPlusCircle /> Create New Campaign
                </Button>
              </Col>
            </Row>
            <List></List>
          </>
        )}
      </div>
    );
  }
}

export default ChooseCampaign;
