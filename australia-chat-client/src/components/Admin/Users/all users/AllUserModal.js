// import React, { useEffect, useState } from 'react'
// import "../all users/AllUserModal.css"

// const AllUserModal = (props) => {
//     let modalStyle = {
//         display: "block",
//         backgroundColor: "rgba(0,0,0,0.8)",
//     }
//     const [location, setLocation] = useState("")
//     const getdata = async () => {
//         try {
//             const res = await fetch(`http://api.positionstack.com/v1/reverse?access_key=344f4144ab0a42646c792169fb6f8ab8&query=${props.Location[0]},${props.Location[1]}`)
//             const result = await res.json()
//             setLocation(`${result.data[0].county}, ${result.data[0].region}, ${result.data[0].country}`)
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     useEffect(() => {
//         getdata()
//     }, [])
//     return (
//         <>
//             <div className='modal' id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true" tabIndex={-1} style={modalStyle} >
//                 <div className="modal-dialog">
//                     <div className="modal-content">
//                         <div className="heading modal-header">
//                             <h5 className="modal-title" id="exampleModalLabel">{props.name}</h5>
//                             <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={props.hide}></button>
//                         </div>
//                         <div className="modal-body">
//                             <div className='shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <img src={`/api/v1/user-media/user-profile/${props.img}`} className="img img-responsive" width="100%" height="auto" alt='pho' />
//                                 <div className='d-flex justify-content-between'>
//                                     <div className="name profile-name">{props.name}</div>
//                                     <div className='age'>{props.AboutMe.age}</div>
//                                 </div>
//                                 <div className='name'>{location}</div>
//                             </div>

//                             <div className='mt-5 shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <ul>
//                                     {/* <li>{props.Questions[0]}</li>
//                                     <li>{props.Questions[1]}</li>
//                                     <li>{props.Questions[2]}</li>
//                                     <li>{props.Questions[0]}</li> */}
//                                     {props.Questions.questions.map((elem, index) => {
//                                         return (
//                                             <div key={index}>
//                                                 <li>{elem}</li>
//                                             </div>
//                                         )
//                                     })}
//                                 </ul>
//                             </div>
//                             <div className='d-flex mt-3 shadow-lg p-3 mb-5 bg-body rounded row '>
//                                 {/* <div className='ms-3' >
//                                     <img src={`/api/v1/user-media/user-profile/${props.Photos[0].photoKey}`} alt='pho' width="100%" height="150px" className='img1' />
//                                     <img src={`/api/v1/user-media/user-profile/${props.Photos[1].photoKey}`} alt='pho' width="100%" height="150px" className='img1' />
//                                 </div>
//                                 <div className='ms-5 ' >
//                                     <img src={`/api/v1/user-media/user-profile/${props.Photos[2].photoKey}`} alt='pho' width="100%" height="150px" className='img1' />
//                                     <img src={`/api/v1/user-media/user-profile/${props.Photos[3].photoKey}`} alt='pho' width="100%" height="150px" className='img1' />
//                                 </div> */}
//                                 {props.Photos.map((elem) => {

//                                     return (
//                                         <div className='col-6'>
//                                             <img src={`/api/v1/user-media/user-profile/${elem.photoKey}`} alt='pho' width="100%" height="auto" className='img1' />
//                                         </div>
//                                     )
//                                 })}
//                             </div>
//                             <div className='mt-0 shadow-lg p-3 mb-3 bg-body rounded'>
//                                 <h6>My Interest</h6>
//                                 <div className='d-flex justify-content-around row'>
//                                     {/* <p className='interest'>{props.Interest[0]}</p>
//                                     <p className='interest'>{props.Interest[0]}</p>
//                                     <p className='interest'>{props.Interest[1]}</p>
//                                     <p className='interest'>{props.Interest[1]}</p> */}
//                                     {props.Interest.map((elem, index) => {
//                                         return (
//                                             <div className='col-4 text-center' key={index}>
//                                                 <p className='interest'>{elem}</p>
//                                             </div>
//                                         )
//                                     })}
//                                 </div>
//                             </div>
//                             <div className='shadow-lg p-3 mb-3 bg-body rounded'>
//                                 <div className='identity mt-0 d-flex justify-content-around '>
//                                     <div className='me-0'>
//                                         <h6>Date of birth</h6>
//                                         <p>{props.Dob}</p>
//                                     </div>
//                                     <div className='pe-5 identity '>
//                                         <h6>I identity as</h6>
//                                         <p>Female</p>
//                                     </div>
//                                 </div>
//                                 <div className='mt-2 d-flex justify-content-around'>
//                                     <div>
//                                         <h6>I want to meet</h6>
//                                         <p>{props.Meet}</p>
//                                     </div>
//                                     <div>
//                                         <h6>I am ready for </h6>
//                                         <p>{props.Relationship}</p>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* first section start */}
//                             <div className=' main-card card-body mt-5 shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <h6>More About Me</h6>
//                                 <div className='d-flex justify-content-around '>
//                                     <div className='mt-2'>
//                                         <p>Traditional</p>
//                                         <p>Spontaneous</p>
//                                         <p>Spiritual</p>
//                                         <p>Social Butterfly </p>
//                                         <p>Age</p>
//                                         <p>Height</p>
//                                         <p>Smoker</p>
//                                         <p>Drinker</p>
//                                     </div>
//                                     <div className='justify-content-around'>

//                                         <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.traditional} />
//                                         <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.spontaneous} max="100" min="0" step="0" />
//                                         <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.spiritual} />
//                                         <div>
//                                             <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.socialButterfly} />
//                                             <div className='d-flex'>
//                                                 <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.age} />
//                                                 <div className='mt-2 ms-2'>{props.AboutMe.age}</div>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <input type="range" className="inputt form-control-range" id="customRange1" value={props.AboutMe.height} min="0" max="500" />
//                                                 <div className='mt-2 ms-2'>{props.AboutMe.height}cm</div>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <p className='add mt-1' style={
//                                                     props.AboutMe.smoker === true
//                                                         ? {
//                                                             backgroundColor: "red"
//                                                         }
//                                                         : {
//                                                             backgroundColor:
//                                                                 "#FFB7B7"
//                                                         }
//                                                 }>{props.AboutMe.smoker === true ? "Yes" : "No"}</p>
//                                                 <p className='ms-5'>Socially</p>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <p className='add' style={
//                                                     props.AboutMe.smoker === true
//                                                         ? {
//                                                             backgroundColor: "red"
//                                                         }
//                                                         : {
//                                                             backgroundColor:
//                                                                 "#FFB7B7"
//                                                         }
//                                                 }>{props.AboutMe.drinker === true ? "Yes" : "No"}</p>
//                                                 <p className='ms-5'>Socially</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='modern mt-2'>
//                                         <pre className="iconn">Modern dating</pre>
//                                         <pre className='icon'>
//                                             Modern
//                                         </pre>
//                                         <div className='side1'>
//                                             <pre>Planned</pre>
//                                         </div>
//                                         <div className='side'>
//                                             <pre className='iconn'>Non-religious</pre>
//                                             <pre className='icon'>
//                                                 NonReligion
//                                             </pre>
//                                             <div className='side1'>
//                                                 <pre>Wallflower</pre>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* first section end */}

//                             {/* second more about me start*/}
//                             <div className=' main-card card-body mt-5 shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <h6>More About Me</h6>
//                                 <div className='d-flex justify-content-around '>
//                                     <div className='mt-2'>
//                                         <p>Traditional</p>
//                                         <p>Spontaneous</p>
//                                         <p>Spiritual</p>
//                                         <p>Social Butterfly </p>
//                                         <p>Age</p>
//                                         <p>Height</p>
//                                         <p>Smoker</p>
//                                         <p>Drinker</p>
//                                     </div>
//                                     <div className='justify-content-around'>

//                                         <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.traditional} />
//                                         <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.spontaneous} />
//                                         <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.spiritual} />
//                                         <div>
//                                             <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.socialButterfly} />
//                                             <div className='d-flex'>
//                                                 <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.age} />
//                                                 <div className='mt-2 ms-2'>{props.AboutMe.age}</div>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <input type="range" className="inputt form-control-range" id="customRange1" defaultValue={props.AboutMe.height} min="0" max="500" />
//                                                 <div className='mt-2 ms-2'>{props.AboutMe.height}cm</div>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <p className='add mt-1' style={
//                                                     props.AboutMe.smoker === true
//                                                         ? {
//                                                             backgroundColor: "#1ECEA5"
//                                                         }
//                                                         : {
//                                                             backgroundColor:
//                                                                 "#FFB7B7"
//                                                         }
//                                                 }>{props.AboutMe.smoker === true ? "Yes" : "No"}</p>
//                                                 <p className='ms-5'>Socially</p>
//                                             </div>
//                                             <div className='d-flex'>
//                                                 <p className='add' style={
//                                                     props.AboutMe.smoker === true
//                                                         ? {
//                                                             backgroundColor: "#1ECEA5"
//                                                         }
//                                                         : {
//                                                             backgroundColor:
//                                                                 "#FFB7B7"
//                                                         }
//                                                 }>{props.AboutMe.drinker === true ? "Yes" : "No"}</p>
//                                                 <p className='ms-5'>Socially</p>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className='modern mt-2'>
//                                         <pre className="iconn">Modern dating</pre>
//                                         <pre className='icon'>
//                                             Modern
//                                         </pre>
//                                         <div className='side1'>
//                                             <pre>Planned</pre>
//                                         </div>
//                                         <div className='side'>
//                                             <pre className='iconn'>Non-religious</pre>
//                                             <pre className='icon'>
//                                                 NonReligion
//                                             </pre>
//                                             <div className='side1'>
//                                                 <pre>Wallflower</pre>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             {/* second more about me end*/}

//                             {/* third section */}
//                             <div className='d-flex justify-content-between shadow-lg p-3 mb-5 bg-body rounded'>
//                                 <div>
//                                     <div>Plan</div>
//                                     <div>{props.Plan}</div>
//                                 </div>
//                                 <div>
//                                     <div>PlanType</div>
//                                     <div>{props.PlanType}</div>
//                                 </div>
//                                 <div>
//                                     <div>PlanExpireDate</div>
//                                     <div>{props.Expire}</div>
//                                 </div>
//                             </div>

//                         </div>
//                         <div className="modal-footer">
//                             <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={props.hide}>Close</button>
//                             {props.Block === false ? <button type="button" className="btn btn-primary">Block User</button> : <button type="button" className="btn btn-primary">Unblock User</button>}

//                         </div>

//                     </div>
//                     <div className="side">
//                       <pre>Non-religious</pre>
//                       <div className="side1">
//                         <pre>Wallflower</pre>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div className="d-flex justify-content-between shadow-lg p-3 mb-5 bg-body rounded">
//                 <div>
//                   <div>Plan</div>
//                   <div>{props.Plan}</div>
//                 </div>
//                 <div>
//                   <div>PlanType</div>
//                   <div>{props.PlanType}</div>
//                 </div>
//                 <div>
//                   <div>PlanExpireDate</div>
//                   <div>{props.Expire}</div>
//                 </div>
//               </div>
//             </div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-bs-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button
//                 type="button"
//                 onClick={blockBtnHandler}
//                 className="btn btn-primary"
//               >
//                 Block User
//               </button>
//             </div>

//         </>
//     )
// }

// export default AllUserModal;
