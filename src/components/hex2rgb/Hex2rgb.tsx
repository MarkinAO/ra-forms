import { useState } from "react";
import './Hex2rgb.css';

function Hex2rgb() {
    let [hexState, setHexState] = useState('#');
    let [rgbState, setRgbState] = useState('RGB(255, 255, 255)');
    let [backgroundColor, setBackgroundColor] = useState('RGB(255, 255, 255)');

    const inputHandler = (e: any) => {        
        const { value } = e.target;
        if(value.length > 7) return;
        setHexState(hexState = value ? value : '#');
        setHexState(hexState = value[0] !== '#' ? '#' + value : value);

        if(value.length === 7) {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(value);
            const rgb = result ? `RGB(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : 'Ошибка!';    
            setRgbState(rgbState = rgb);
            if(rgb !== 'Ошибка!') setBackgroundColor(backgroundColor = rgb);
        } else {
            setRgbState(rgbState = backgroundColor);
        }
    }

    return(
        <div className="hex2rgb-container" style={{backgroundColor: backgroundColor}}>
            <form className="hex2rgb-form" onSubmit={(e) => e.preventDefault()}>
                <input className="hex-string hex2rgb-field" type="text" value={hexState} onChange={inputHandler}/>
                <div className="rgb-string hex2rgb-field">{ rgbState }</div>
            </form>
        </div>
    )
}

export default Hex2rgb;