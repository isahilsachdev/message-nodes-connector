import React, { useState } from 'react'

const Navbar = ({handleSave, isError}) => {
  const [showPopup, setShowPopup] = useState(false);

  // this function is to remove the success/failure popup after 2seconds
  const hanleAlert = () => {
    handleSave();
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);
    }, 2000)
  }

  return (
    <div className="navbar">
      {showPopup && (
        <div className={`${isError ? 'error-message' : 'success-message'}`}>
          {isError ? (  
            'Cannot save Flow'
          ) : (
            'Flow Saved '
          )}
        </div>
      )}
      <button onClick={hanleAlert} className="save-btn">
        Save Changes
      </button>
      <div></div>
    </div>
  )
}

export default Navbar