import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModalDialog from "react-bootstrap/ModalDialog";
import SliderModal from "./SliderModal";

function UserModel(props) {
  const handleClose = () => props.setModal(false);

  const unBlockUser = () => {
    props.unBlockUserApi(props.user._id);
    props.setModal(false);
  };
  const blockUser = () => {
    props.blockUserApi(props.user._id);
    props.setModal(false);
  };
  const closeModal = () => {
    props.setModal(false);
  };

  function toFeet(n) {
    var realFeet = (n * 0.3937) / 12;
    var feet = Math.floor(realFeet);
    var inches = Math.round((realFeet - feet) * 12);
    return feet + "&prime;" + inches + "&Prime;";
  }

  const user = props.user;
  // console.log(user.myIdealMatch.age.start, user.myIdealMatch.age.end);

  const [location, setLocation] = useState("");
  const getData = async () => {
    try {
      const res = await fetch(
        `http://api.positionstack.com/v1/reverse?access_key=344f4144ab0a42646c792169fb6f8ab8&query=${user.location.coordinates[0]},${user.location.coordinates[1]}`
      );
      const result = await res.json();
      setLocation(
        `${result.data[0].county}, ${result.data[0].region}, ${result.data[0].country}`
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Modal show={props.modal} onHide={handleClose}>
        <div style={{ backgroundColor: "rgb(243, 242, 247)" }}>
          <div style={{ position: "relative", width: "auto" }}>
            {user.selfie ? (
              <img
                src={`/api/v1/user-media/user-profile/${user.selfie}`}
                alt="Profile"
                width="100%"
              />
            ) : (
              <img src="/images/notFound.png" alt="Not Found" width="100%" />
            )}
            <div
              style={{
                position: "absolute",
                bottom: "5px",
                color: "white",
                left: "20px",
              }}
            >
              <h2>{user.name}</h2>
              <h5>{location}</h5>
            </div>
            <div
              onClick={closeModal}
              style={{
                position: "absolute",
                right: "20px",
                color: "white",
                top: "15px",
                cursor: "pointer",
              }}
            >
              <h2>X</h2>
            </div>
          </div>
          <div className="shadow-lg p-1 m-3 bg-body rounded">
            <ul>
              {user.questions &&
                user.questions.map((element, index) => {
                  return <li key={index}>{element}</li>;
                })}
            </ul>
          </div>
          <div className="row">
            {user.photos &&
              user.photos.map((element, index) => {
                return (
                  <div className="col-6 pb-3 ">
                    <img
                      src={`/api/v1/user-media/user-profile/${element.photoKey}`}
                      alt="pho"
                      width="100%"
                    />
                  </div>
                );
              })}
          </div>

          <div className="shadow-lg p-1 m-3 px-2 bg-body rounded">
            <div className="row d-flex justify-content-around">
              {user.myInterests &&
                user.myInterests.map((element, i) => {
                  return (
                    <div className="col-3 pt-3  text-center">
                      <p
                        style={{
                          backgroundColor: "#FE92B9",
                          padding: "0px 10px 0px 10px",
                          borderRadius: "17px",
                        }}
                      >
                        {element}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="shadow-lg p-1 m-3 bg-body rounded">
            <div className="row p-2">
              <div className="col-6">
                <h6>Date Of Birth</h6>
                <h5>{user.dob}</h5>
              </div>
              <div className="col-6">
                <h6>I identify as</h6>
                <h5>{user.iIdentifyAs}</h5>
              </div>
              <div className="col-6">
                <h6>I want to meet</h6>
                <h5>{user.lookingFor}</h5>
              </div>
              <div className="col-6">
                <h6>I am ready for</h6>
                <h5>{user.readyFor}</h5>
              </div>
            </div>
          </div>
          <div className="shadow-lg p-1 m-3 bg-body rounded">
            <h6>More About me</h6>

            <SliderModal
              step={100}
              value={user.moreAboutMe.traditional}
              firstName={"Traditional"}
              secondName={"Modern dating"}
            />

            <SliderModal
              step={100}
              value={user.moreAboutMe.spontaneous}
              firstName={"Spontaneous"}
              secondName={"Planned"}
            />
            <SliderModal
              step={100}
              value={user.moreAboutMe.spiritual}
              firstName={"Spiritual"}
              secondName={"Non-religious"}
            />
            <SliderModal
              step={100}
              value={user.moreAboutMe.socialButterfly}
              firstName={"Social Butterfly"}
              secondName={"Wallflower"}
            />
            <SliderModal
              step={250}
              value={user.moreAboutMe.height}
              firstName={"Height"}
              secondName={""}
            />
            <SliderModal
              step={60}
              value={user.moreAboutMe.age}
              firstName={"Age"}
              secondName={""}
            />
            <div className="row ">
              <div className="col-3">
                <p>Smoker</p>
              </div>
              <div className="col-2  text-center">
                {user.moreAboutMe.smoker && user.moreAboutMe.smoker ? (
                  <p
                    style={{
                      backgroundColor: "#1ECEA5",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    Yes
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: "#FE92B9",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    No
                  </p>
                )}
              </div>
              <div className="col-3">
                <p>Socially</p>
              </div>
            </div>
            <div className="row ">
              <div className="col-3">
                <p>Drinker</p>
              </div>
              <div className="col-2  text-center">
                {user.moreAboutMe.drinker && user.moreAboutMe.drinker ? (
                  <p
                    style={{
                      backgroundColor: "#1ECEA5",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    Yes
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: "#FE92B9",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    No
                  </p>
                )}
              </div>
              <div className="col-3">
                <p>Socially</p>
              </div>
            </div>
          </div>

          <div className="shadow-lg p-1 m-3 bg-body rounded">
            <h6>My Ideal Match</h6>

            <SliderModal
              step={100}
              value={user.myIdealMatch.traditional}
              firstName={"Traditional"}
              secondName={"Modern dating"}
            />

            <SliderModal
              value={user.myIdealMatch.spontaneous}
              step={100}
              firstName={"Spontaneous"}
              secondName={"Planned"}
            />
            <SliderModal
              value={user.myIdealMatch.spiritual}
              step={100}
              firstName={"Spiritual"}
              secondName={"Non-religious"}
            />
            <SliderModal
              value={user.myIdealMatch.socialButterfly}
              step={100}
              firstName={"Social Butterfly"}
              secondName={"Wallflower"}
            />
            <SliderModal
              value={[
                user.myIdealMatch.height.start,
                user.myIdealMatch.height.end,
              ]}
              step={250}
              firstName={"Height"}
              secondName={""}
            />
            <SliderModal
              value={[user.myIdealMatch.age.start, user.myIdealMatch.age.end]}
              step={60}
              firstName={"Age"}
              secondName={""}
            />
            <div className="row ">
              <div className="col-3">
                <p>Smoker</p>
              </div>
              <div className="col-2  text-center">
                {user.myIdealMatch.smoker && user.myIdealMatch.smoker ? (
                  <p
                    style={{
                      backgroundColor: "#1ECEA5",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    Yes
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: "#FE92B9",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    No
                  </p>
                )}
              </div>
              <div className="col-3">
                <p>Socially</p>
              </div>
            </div>
            <div className="row ">
              <div className="col-3">
                <p>Drinker</p>
              </div>
              <div className="col-2  text-center">
                {user.moreAboutMe.drinker && user.moreAboutMe.drinker ? (
                  <p
                    style={{
                      backgroundColor: "#1ECEA5",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    Yes
                  </p>
                ) : (
                  <p
                    style={{
                      backgroundColor: "#FE92B9",
                      padding: "0px 10px 0px 10px",
                      borderRadius: "17px",
                    }}
                  >
                    No
                  </p>
                )}
              </div>
              <div className="col-3">
                <p>Socially</p>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between shadow-lg p-3 m-3 bg-body rounded">
            <div>
              <div>Plan</div>
              <div>{user.yourPlan}</div>
            </div>
            <div>
              <div>PlanType</div>
              <div>{user.planDuration}</div>
            </div>
            <div>
              <div>PlanExpireDate</div>
              <div>{user.planExpire}</div>
            </div>
          </div>
          <div className="row ">
            <div className="col d-flex justify-content-center mb-3">
              <div>
                {user.userblocked ? (
                  <Button className="btn btn-success" onClick={unBlockUser}>
                    UnBlock User
                  </Button>
                ) : (
                  <Button onClick={blockUser} className="btn btn-danger">
                    Block User
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default UserModel;
