import { MouseEvent } from 'react';
import './style.css';

export default function Keyboard({handleKeyPress}:{handleKeyPress:Function}){
    const row1=['q','w','e','r','t','y','u','i','o','p'];
    const row2=['a','s','d','f','g','h','j','k','l'];
    const row3 = ['Del','z','x','c','v','b','n','m','Enter'];

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        handleKeyPress((e.target as HTMLInputElement).value);
    }




    return(<>
    <div className="keyboard-cont">
        <div className="first-row">
            {
                row1.map((chr)=>(<button key={chr} className="keyboard-button bg-stone-50 border-solid border-2 border-grey-600" value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
            
        </div>
        <div className="second-row">
        {
                row2.map((chr)=>(<button key={chr} className="keyboard-button bg-stone-50 border-solid border-2 border-grey-600" value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
        </div>
        <div className="third-row">
        {
                row3.map((chr)=>(<button key={chr} className="keyboard-button bg-stone-50 border-solid border-2 border-grey-600" value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
        </div>
    </div>
    </>)
}