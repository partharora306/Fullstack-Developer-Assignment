import React from "react";
import Table from "react-bootstrap/Table";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  FaFacebook,
  FaGoogle,
  FaInstagram,
  FaYoutube,
  FaTrash,
  FaPen,
  FaSearch,
} from "react-icons/fa";
import Badge from "react-bootstrap/Badge";
import axios from "axios";
import InputGroup from "react-bootstrap/InputGroup";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      campaignList: [],
      FilterCampaignList: [],
      filter: false,
      searchCampaign: "",
      checked: false,
    };
  }

  getCampaignData = () => {
    console.log("getData");
    axios
      .get(`https://still-woodland-42739.herokuapp.com`)
      .then((res) => {
        const data = res.data;
        console.log(data);
        this.setState({ campaignList: data });
      })
      .catch((e) => {
        console.log("e");
      });
  };

  searchCampaigns = (searchValue) => {
    this.setState({ searchCampaign: searchValue });
    if (searchValue !== "") {
      this.setState({ filter: true });
      let data = this.state.campaignList.filter((campaign) => {
        const arr = searchValue.split(" ");
        return arr.some((el) =>
          campaign.Campaign_name.toLowerCase().includes(el)
        );
      });
      this.setState({ FilterCampaignList: data });
      // console.log(data)
    } else {
      this.getCampaignData();
      this.setState({ filter: false });
    }
  };

  filterData = (selectedField, selectedValue) => {
    if (selectedValue === "ALL") {
      this.getCampaignData();
      this.setState({ filter: false });
    } else if (selectedField === "Platform") {
      let data = this.state.campaignList.filter((campaign) => {
        return campaign[selectedField] === selectedValue;
      });
      console.log(selectedField);
      console.log(selectedValue);
      console.log(data);
      this.setState({ filter: true });
      console.log(this.state.FilterCampaignList);

      this.setState({ FilterCampaignList: data });
    } else if (selectedField === "Campaign_on") {
      let data = this.state.campaignList.filter((campaign) => {
        return "" + campaign[selectedField] + "" === selectedValue;
      });
      console.log(selectedField);
      console.log("" + selectedValue + "");
      console.log(data);
      this.setState({ filter: true });
      console.log(this.state.FilterCampaignList);

      this.setState({ FilterCampaignList: data });
    } else if (selectedField === "Days") {
      let currDate = new Date();

      let data = this.state.campaignList.filter((campaign) => {
        console.log(campaign.Created_on);
        let dateParts = campaign.Created_on.split(" ");
        let date2 = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
        console.log("currDate" + currDate);
        console.log("date2" + date2);
        let Difference_In_Time = currDate.getTime() - date2.getTime();

        // To calculate the no. of days between two dates
        let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
        console.log("diff in days " + Difference_In_Days);
        return Difference_In_Days <= selectedValue;
      });
      console.log(selectedField);
      console.log(data);
      this.setState({ filter: true });
      console.log(this.state.FilterCampaignList);
      this.setState({ FilterCampaignList: data });
    }
  };

  deleteCampaign = (id) => {
    console.log(id);
    axios
      .post(`https://still-woodland-42739.herokuapp.com/deleteCampaign/` + id)
      .then((res) => {
        console.log(res.data);
        if (res.data !== undefined) {
          this.getCampaignData();
        } else {
          alert("data delete failed");
        }
      })
      .catch((e) => {
        console.log("e");
      });
  };

  showModal = (id, onOff) => {
    this.setState({ isOpen: true });
    this.setState({ editItemId: id });
    this.setState({ ChampaignOnOff: onOff });
    console.log("openModel " + id);
  };

  hideModal = () => {
    this.setState({ isOpen: false });
    this.getCampaignData();
  };

  EditCampaign = (id, onOff) => {
    this.showModal(id, onOff);
  };
  editThisItem = (id, onOff) => {
    let value = onOff ? false : true;
    console.log(value);
    axios
      .post(
        `https://still-woodland-42739.herokuapp.com/editCampaign/` +
          id +
          `/` +
          value
      )
      .then((res) => {
        this.hideModal();
        if (res.data !== undefined) {
          console.log(res.data);
          this.getCampaignData();
          window.location.reload();
        } else {
          alert("data delete failed");
        }
      })
      .catch((e) => {
        console.log("e");
      });
  };

  componentDidMount() {
    console.log("didMount");
    this.getCampaignData();
  }

  componentWillUnmount() {
    console.log("willMount");
  }

  render() {
    return (
      <div className="card m-4">
        <Modal show={this.state.isOpen} onHide={(e) => this.hideModal()}>
          <Modal.Header>
            <Modal.Title>Campaign turn on/Off Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you want to edit?</Modal.Body>
          <Modal.Footer>
            <Button onClick={(e) => this.hideModal()}>Cancel</Button>
            <Button
              onClick={(e) =>
                this.editThisItem(
                  this.state.editItemId,
                  this.state.ChampaignOnOff
                )
              }
              variant="danger"
            >
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
        <div id="Filters" className="m-4 mb-1">
          <Row>
            <Col xs={3}>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Search for the campaign"
                  aria-label="Search for the campaign"
                  aria-describedby="basic-addon1"
                  onChange={(e) => this.searchCampaigns(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col xs={6} className="ms-auto">
              <Row>
                <Col xs={4}>
                  <Form.Select
                    onChange={(e) =>
                      this.filterData("Platform", e.target.value)
                    }
                  >
                    <option value="ALL">All Platform</option>
                    <option value="FB">Facebook</option>
                    <option value="Google">Google</option>
                    <option value="Youtube">Youtube</option>
                    <option value="Instagram">Instagram</option>
                  </Form.Select>
                </Col>
                <Col xs={4}>
                  <Form.Select
                    onChange={(e) =>
                      this.filterData("Campaign_on", e.target.value)
                    }
                  >
                    <option value="ALL">All Status</option>
                    <option value={true}>Live now</option>
                    <option value={false}>Paused</option>
                  </Form.Select>
                </Col>
                <Col xs={4}>
                  <Form.Select
                    onChange={(e) => this.filterData("Days", e.target.value)}
                  >
                    <option value="30">Last 30 days</option>
                    <option value="10">Last 10 days</option>
                    <option value="1">Last 1 day</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>

        <Table responsive>
          <thead className="heading-row">
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={() =>
                    this.setState({ checked: !this.state.checked })
                  }
                  checked={this.state.checked}
                />
              </th>
              <th>On/Off</th>
              <th>Campaign</th>
              <th>Date Range</th>
              {/* <th>Budget</th> */}
              <th>Location</th>
              <th>Platform</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {this.state.filter
              ? this.state.FilterCampaignList.map((campaign, id) => (
                  <tr>
                    <td>{id + 1}</td>
                    <td>
                      <Form>
                        {campaign.Campaign_on ? (
                          <Form.Check
                            checked
                            type="switch"
                            id="custom-switch"
                            disabled
                          />
                        ) : (
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            disabled
                          />
                        )}
                      </Form>
                    </td>
                    <td>
                      <Row>
                        <Col xs="3">
                          <Image
                            src={campaign.Campaign_image}
                            thumbnail
                            width={70}
                          ></Image>
                        </Col>
                        <Col xs>
                          <Row>
                            <h5>{campaign.Campaign_name}</h5>
                          </Row>
                          <Row>
                            <p>Created on {campaign.Created_on}</p>
                          </Row>
                        </Col>
                      </Row>
                    </td>
                    <td>
                      {campaign.Start_date} - {campaign.End_date}
                    </td>
                    {/* <td>----</td> */}
                    {/* <td>INR {campaign.Budget}</td> */}
                    <td>{campaign.Loc}</td>
                    <td>
                      {campaign.Platform === "FB" ? (
                        <FaFacebook color="blue" size={30} />
                      ) : campaign.Platform === "Google" ? (
                        <FaGoogle size={30} />
                      ) : campaign.Platform === "Instagram" ? (
                        <FaInstagram color="red" size={30} />
                      ) : campaign.Platform === "Youtube" ? (
                        <FaYoutube color="red" size={30} />
                      ) : null}
                    </td>
                    <td>
                      {campaign.Campaign_on ? (
                        <Badge bg="success">Live now</Badge>
                      ) : (
                        <Badge bg="warning">Paused</Badge>
                      )}
                    </td>
                    <td>
                      <FaPen
                        color="blue"
                        className="mx-2"
                        onClick={(e) =>
                          this.EditCampaign(campaign._id, campaign.Campaign_on)
                        }
                      />
                      <FaTrash
                        color="red"
                        className="mx-2"
                        onClick={() => this.deleteCampaign(campaign._id)}
                      />
                    </td>
                  </tr>
                ))
              : this.state.campaignList !== undefined &&
                this.state.campaignList.length > 0
              ? this.state.campaignList.map((campaign, id) => (
                  <tr>
                    <td>
                      <input
                        type="checkbox"
                        checked={this.state.checked || null}
                      />
                    </td>
                    <td>
                      <Form>
                        {campaign.Campaign_on ? (
                          <Form.Check
                            checked
                            type="switch"
                            id="custom-switch"
                            disabled
                          />
                        ) : (
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            disabled
                          />
                        )}
                      </Form>
                    </td>
                    <td>
                      <Row>
                        <Col xs="3">
                          <Image
                            src={campaign.Campaign_image}
                            thumbnail
                            width={70}
                          ></Image>
                        </Col>
                        <Col xs>
                          <Row>
                            <h5>{campaign.Campaign_name}</h5>
                          </Row>
                          <Row>
                            <p>Created on {campaign.Created_on}</p>
                          </Row>
                        </Col>
                      </Row>
                    </td>
                    <td>
                      {campaign.Start_date} - {campaign.End_date}
                    </td>
                    <td>{campaign.Loc}</td>
                    <td>
                      {campaign.Platform === "FB" ? (
                        <FaFacebook color="blue" size={30} />
                      ) : campaign.Platform === "Google" ? (
                        <FaGoogle size={30} />
                      ) : campaign.Platform === "Instagram" ? (
                        <FaInstagram color="red" size={30} />
                      ) : campaign.Platform === "Youtube" ? (
                        <FaYoutube color="red" size={30} />
                      ) : null}
                    </td>
                    <td>
                      {campaign.Campaign_on ? (
                        <Badge bg="success">Live now</Badge>
                      ) : (
                        <Badge bg="warning">Paused</Badge>
                      )}
                    </td>
                    <td>
                      <FaPen
                        color="blue"
                        className="mx-2"
                        onClick={(e) =>
                          this.EditCampaign(campaign._id, campaign.Campaign_on)
                        }
                      />
                      <FaTrash
                        color="red"
                        className="mx-2"
                        onClick={() => this.deleteCampaign(campaign._id)}
                      />
                    </td>
                  </tr>
                ))
              : "null"}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default List;
