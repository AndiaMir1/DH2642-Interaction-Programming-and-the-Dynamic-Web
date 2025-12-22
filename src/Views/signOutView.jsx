import "./style/popUp.css"; 

export default function SignOutView({ show, onOpen, onClose, onConfirm }) {
    return (
        <>
            <button className="nav-button signout-btn" onClick={onOpen}>
                Sign Out
            </button>

            {show && (
                <div id="bg-modal">
                    <div className="modal-contact signout-modal">
                        <span className="close" onClick={onClose}>&times;</span>
                        <p>Are you sure you want to sign out?</p>
                        
                        <div className="signout-buttons">
                            <button className="yes-btn" onClick={onConfirm}>
                                Yes
                            </button>
                            <button className="no-btn" onClick={onClose}>
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}