import { MouseEvent } from 'react';
import './style.css';
import { letterColors } from '../app/page';

export default function Keyboard({guess,keyboardColorCode,handleKeyPress}:{guess:number,keyboardColorCode:letterColors,handleKeyPress:Function}){
    const row1=['q','w','e','r','t','y','u','i','o','p'];
    const row2=['a','s','d','f','g','h','j','k','l'];
    const row3 = ['Del','z','x','c','v','b','n','m','Enter'];
    const keyClasses = "keyboard-button bg-stone-50 border-solid border-2 border-grey-600"

    const handleClick = (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>) => {
        if(guess<5) handleKeyPress((e.target as HTMLInputElement).value);
    }




    return(<>
    <div className="keyboard-cont">
        <div className="first-row">
            {
                row1.map((chr)=>(<button key={chr} className={`${keyboardColorCode[chr]} ${keyClasses}`} value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
            
        </div>
        <div className="second-row">
        {
                row2.map((chr)=>(<button key={chr} className={`${keyboardColorCode[chr]} ${keyClasses}`} value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
        </div>
        <div className="third-row">
        {
                row3.map((chr)=>(<button key={chr} className={`${keyboardColorCode[chr]} ${keyClasses}`} value={chr} onMouseDown={e=>e.preventDefault()} onClick={(e)=>{handleClick(e)}}>{chr}</button>))
            }
        </div>
    </div>
    </>)
}