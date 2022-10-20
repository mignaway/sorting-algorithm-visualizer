import React, { useState } from 'react';

function SettingsMenu(props){
    const [settingsVisible, setSettingsVisible ] = useState(false);
    return(
        <div id="SettingsMenu" className="flex-row flex-v-center">
            <div className="flex-column" style={{position: 'relative'}}>
                <svg id="settings-menu-open" onClick={() => setSettingsVisible(!settingsVisible)} style={{ opacity: props.isSortingActive ? .5 : 1}} width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3.625 6.04167H8.45833M25.375 6.04167H13.2917M3.625 14.5H18.125M25.375 14.5H22.9583M3.625 22.9583H6.04167M25.375 22.9583H10.875" stroke="white" strokeWidth="1.28889" strokeLinecap="round" />
                    <path d="M10.875 8.45833C12.2097 8.45833 13.2917 7.37635 13.2917 6.04167C13.2917 4.70698 12.2097 3.625 10.875 3.625C9.54035 3.625 8.45837 4.70698 8.45837 6.04167C8.45837 7.37635 9.54035 8.45833 10.875 8.45833Z" stroke="white" strokeWidth="1.28889" strokeLinecap="round" />
                    <path d="M20.5417 16.9167C21.8764 16.9167 22.9583 15.8347 22.9583 14.5C22.9583 13.1653 21.8764 12.0833 20.5417 12.0833C19.207 12.0833 18.125 13.1653 18.125 14.5C18.125 15.8347 19.207 16.9167 20.5417 16.9167Z" stroke="white" strokeWidth="1.28889" strokeLinecap="round" />
                    <path d="M8.45829 25.375C9.79298 25.375 10.875 24.293 10.875 22.9583C10.875 21.6237 9.79298 20.5417 8.45829 20.5417C7.1236 20.5417 6.04163 21.6237 6.04163 22.9583C6.04163 24.293 7.1236 25.375 8.45829 25.375Z" stroke="white" strokeWidth="1.28889" strokeLinecap="round" />
                </svg>
                <div id="settings-menu-popup" style={{ display: (settingsVisible && !props.isSortingActive) ? 'grid' : 'none'}}>
                    <h1 className="main-text">Input size</h1>
                    <div id="settings-input-size" className="flex-row flex-v-center"><input type="range" min="1" max="200" onInput={(input) => props.changeInputSizeValue(input.target.value)} /><h1 className="main-text text-small m-l-10">{props.inputSize}</h1></div>
                    <h1 className="main-text">Speed</h1>
                    <div id="settings-speed" className="flex-row flex-v-center">
                        <div className="cursor-pointer">
                            <svg onClick={() => props.changeSortingSpeedHandler(false)} width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M14 15L9 10L14 5L13 3L6 10L13 17L14 15Z" fill="white" />
                            </svg>
                        </div>
                        <h1 id="speed-multiplier-text" className="main-text m-h-10" style={{ fontSize: '16px', color: '#3BEB61' }}>{props.currentSpeedMultiplier}x</h1>
                        <div className="cursor-pointer">
                            <svg onClick={() => props.changeSortingSpeedHandler(true)} width="15" height="15" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 15L11 10L6 5L7 3L14 10L7 17L6 15Z" fill="white" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsMenu;