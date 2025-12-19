import './style/suspenseView.css';

export function SuspenseView(props){
    return(
        <div className="suspense-container">
            {props.error? 
                <span className="error-message">{props.error.toString()}</span>
            :   <div className="loading-spinner">
                    <div className="spinner"></div>
                    <p>Loading...</p>
                </div>
            }
        </div>
    );
}