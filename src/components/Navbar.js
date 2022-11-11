import GenerateArrayButton from './GenerateArrayButton.js'
import SettingsMenu from './SettingsMenu.js'
import '../css/Navbar.css'

function Navbar(props) {
    return (
        <div id="navbar" className="flex-row flex-v-center">
            <GenerateArrayButton generateArrayOfSize={props.generateArrayOfSize} isSortingActive={props.isSortingActive} />
            <div id="sort-selection" className="flex-column flex-v-center" >  {/*onClick={props.stopSorting} */}
                <div className="flex-row flex-v-center" style={{ pointerEvents: props.isSortingActive ? "none" : 'auto', opacity: props.isSortingActive ? .6 : 1 }}>
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
                    <div id="play-action" className={!props.isSortingActive && props.isCurrentlySorted ? 'control-active' : 'control-inactive'} onClick={props.sortingRun}>
                        <svg width="30" height="30" viewBox="0 0 33 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M30.75 15.7535C32.75 16.9082 32.75 19.795 30.75 20.9497L4.49999 36.1051C2.49999 37.2598 -1.65301e-06 35.8164 -1.55206e-06 33.507L-2.27131e-07 3.19614C-1.26184e-07 0.886742 2.5 -0.556626 4.5 0.598075L30.75 15.7535Z" fill="#3BEB61" />
                        </svg>
                    </div>
                    <div id="reload-action" className={!props.isSortingActive && !props.isCurrentlySorted ? 'control-active' : 'control-inactive'} onClick={props.sortingRun}>
                        <svg width="30" height="30" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_106_2)">
                                <path d="M17.5 0C7.875 0 0 7.875 0 17.5C0 27.125 7.875 35 17.5 35C21.7798 35 25.7828 33.5122 28.8321 30.9365C29.4618 30.4046 29.4546 29.4546 28.8716 28.8716L27.8357 27.8357C27.2499 27.2499 26.3049 27.2576 25.6564 27.7732C23.4233 29.5487 20.5822 30.625 17.4562 30.625C10.1937 30.625 4.33125 24.7625 4.33125 17.5C4.33125 10.2375 10.1937 4.375 17.4562 4.375C21.0875 4.375 24.2375 5.95 26.6 8.35625L24.3919 10.5643C23.447 11.5093 24.1162 13.125 25.4526 13.125H33.4562C34.2847 13.125 34.9562 12.4534 34.9562 11.625V3.62132C34.9562 2.28496 33.3405 1.61571 32.3956 2.56066L29.75 5.20625C26.6 2.05625 22.2687 0 17.4562 0H17.5Z" fill="#EB7A3B" />
                            </g>
                            <defs>
                                <clipPath id="clip0_106_2">
                                    <rect width="35" height="35" fill="white" />
                                </clipPath>
                            </defs>
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
