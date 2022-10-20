import '../css/SortingVisualizer.css';

function SortingVisualizer(props){
    return(
        <div id="visualizer">
            {
                props.array.map((item,i) => {
                    let backgroundElement;
                    if (props.currentModifyingIndex.includes(i)) {
                        backgroundElement = 'white';
                    }
                    if (props.currentRightPlaceIndex.includes(i)) {
                        backgroundElement = '#0F6E6E';
                    }
                    return (<div className={props.currentFinalAnimationIndex.includes(i) ? 'array-pillar pillar-white-temp-animation' : 'array-pillar'} 
                                 key={i} 
                                 style={{ height: item + '%' , backgroundColor: backgroundElement}}></div>)
                })
            }
        </div>
    )
}

export default SortingVisualizer;