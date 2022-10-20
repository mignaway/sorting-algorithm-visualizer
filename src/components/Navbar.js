import GenerateArrayButton from './GenerateArrayButton.js'
import SettingsMenu from './SettingsMenu.js'
import '../css/Navbar.css'

function Navbar(props) {
    return (
        <div id="navbar" className="flex-row flex-v-center">
            <GenerateArrayButton generateArrayOfSize={props.generateArrayOfSize}/>
            <div id="sort-selection" className="flex-column flex-v-center" >  {/*onClick={props.stopSorting} */}
                <div className="flex-row flex-v-center">
                    <div className="change-sort-arrow flex-all-centered" onClick={props.changeSortingHandler(true)}>
                        <svg  width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14 15L9 10L14 5L13 3L6 10L13 17L14 15Z" fill="white" />
                        </svg>
                    </div>
                    <h1 className="main-text m-h-20">{props.currentSorting}</h1>
                    <div className="change-sort-arrow flex-all-centered" onClick={props.changeSortingHandler(false)}>
                        <svg  width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="white" />
                        </svg>
                    </div>
                </div>
                <div id="control-sorting-button">
                    <div id="play-action" className={!props.isSortingActive ? 'control-active' : 'control-inactive'} onClick={props.sortingRun}>
                        <svg width="30" height="30" viewBox="0 0 33 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.75 15.7535C32.75 16.9082 32.75 19.795 30.75 20.9497L4.49999 36.1051C2.49999 37.2598 -1.65301e-06 35.8164 -1.55206e-06 33.507L-2.27131e-07 3.19614C-1.26184e-07 0.886742 2.5 -0.556626 4.5 0.598075L30.75 15.7535Z" fill="#3BEB61" />
                        </svg>
                    </div>
                    <div id="stop-action" className={props.isSortingActive ? 'control-active' : 'control-inactive'} onClick={props.sortingStop}>

                        <svg width="35" height="35" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="34" height="34" rx="17" stroke="#EB3B50" strokeWidth="2" />
                            <rect x="10" y="10" width="16" height="16" rx="2" fill="#EB3B50" />
                        </svg>

                    </div>
                </div>
            </div>
            <SettingsMenu changeInputSizeValue={props.changeInputSizeValue} 
                          isSortingActive={props.isSortingActive} 
                          inputSize={props.inputSize} 
                          currentSpeedMultiplier={props.currentSpeedMultiplier}
                          changeSortingSpeedHandler={props.changeSortingSpeedHandler}
                          />
        </div>
    );
}

export default Navbar;
