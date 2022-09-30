import { width } from '@mui/system'
import React, { useState } from 'react'
import "../Users/ModalData.css"
const ModalData = ({ img }) => {
    const [data, setData] = useState([0, 1, 2, 3])
    let modelStyle = {
        display: "block",
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    }
    return (
        <div class="modal" tabindex="-1" style={modelStyle}>
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="heading modal-header">
                        <h3 class="modal-title">User Approval</h3>
                        <h6 class="modal-title">User Profile Image and Video Bio Approval</h6>
                        {/* <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    {/* Photos section */}
                    <div className='section'>
                        <div>
                            <ul>
                                <li>Photos</li>
                                <li>Video Bios</li>
                                <li>Action</li>
                            </ul>
                        </div>

                        <div >
                            <img src={img} alt='photo' width="100px" className='img1' />

                            <img src={img} alt='photo' width="100px" className='img1' />
                        </div>
                    </div>
                    {/* Photos section end */}

                    {/* video Section start */}
                    {/* <div className='section'>
                        <div>
                            <ul>
                                <li>Photos</li>
                                <li>Video Bios</li>
                                <li>Action</li>
                            </ul>
                        </div>
                        <div >
                            <img src={img} alt='photo' width="100px" className='img1' />
                        </div>
                    </div> */}
                    {/* video Section end */}
                </div>
            </div>
        </div>
    )
}

export default ModalData