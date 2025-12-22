import './style/homePageLayoutView.css';

export function TestLayout(props){
    return(
        <div className= "home-page-layout">
            <div className="body">
                <div className="left-side">
                    {props.weather}
                </div>

                <div className="right-side">
                    {props.recommended}
                </div>
            </div>
            <div className='get-songs'>
                {props.getSong}
            </div>
        </div>
    );
}