'use client'

import React,{ useCallback, useEffect, useRef, useState }  from 'react';
import {WORDS} from '../../public/words';
import Snackbar from '../components/snackbar';
import Keyboard from '../components/keyboard'

export interface letterColors {
  [key:string]:string
}

function Grid() {
    const [word, setWord] = useState('');
    const [inputWord, setInputWord] = useState<string[]>([]);
    const [guess, setGuess] = useState<number>(0);
    const inputRefs = useRef<(HTMLInputElement)[]>([]);
    const [currentCell, setCurrentCell] = useState<number>(0);
    const [message, setMessage] = useState('');
    const [keyboardColorCode, setkeyboardColorCode]= useState<letterColors>({});

    useEffect(()=>{
        // const fetchWord = async () => {
        //     const res = await fetch('https://random-word-api.herokuapp.com/word?length=5');
        //     const word = await res.json();
        //     setWord(word[0]);
        //     console.log(word);
        // }
        fetchWord();
        
    },[]);

    const fetchWord = () => {
        const random = Math.floor(Math.random() * WORDS.length);
        setWord(WORDS[random]);
    }

    useEffect(()=>{
        inputRefs.current[currentCell]?.focus();
    },[currentCell]);


    //generate grid onload
    const gridCells: { id: string }[] = [];
    for(let row = 0;row < 5;row++){
        for(let col = 0; col <= 5; col++){
            gridCells.push({id:`r${row}c${col}`});
        }
        
    }


    // handle every keystroke
    const handleKeyPress = (e: string) => {

        if(e === 'Enter'){
            if(inputWord.length === 5) submit();
            else return
        }else if(e === 'Backspace' || e === 'Del'){
            if(currentCell>guess*5) if((currentCell-(guess*5)>inputWord.length-1)) backspace(currentCell-1); else backspace(currentCell);
        }
        else {
            if(inputWord.length<5) enterCharacter(e);
            else return
            }
    }



    // handle key/character press(except enter and backspace)
    const enterCharacter = (e?:string) => {
        if(e) inputRefs.current[currentCell].value = e;
        let temp = [...inputWord];
        temp.push(inputRefs.current[currentCell]?.value);
        if(inputWord.length < 4) {setCurrentCell(currentCell+1);}
        setInputWord(temp);
    }


    //handle backspace press
    const backspace = (index:number) => {
        let temp = [...inputWord];
        setCurrentCell(index);
        inputRefs.current[index].value = '';
        temp.pop();
        setInputWord(temp);
    }


    //handle guess submission
    const submit = () => {
        if(checkValidity()) {verifyWord();} 
        else {setMessage("Enter a valid word!");
          setTimeout(()=>{setMessage('')},1000);
        }
    }


    //chacke if the entered word is valid
    const checkValidity = () => WORDS.indexOf(inputWord.join('').toLocaleLowerCase())!=-1;


    //create ref for every cell in grid
    const addToRefs = useCallback((el: HTMLInputElement | null, index: number) => {
        if (!el || inputRefs.current.includes(el)) return;
        inputRefs.current[index] = el;
      }, []);


    //checks if the guess is correct
    const verifyWord = () => {
        let arr = {...keyboardColorCode};
        if(word === inputWord.join('')) {
        inputWord.forEach((letter,index)=>{
           inputRefs.current[index+(guess*5)].style.backgroundColor = 'green';
           arr[letter]='green';
        });
        setCurrentCell(-1);
        setTimeout(()=>{setMessage("You Won!");
        setTimeout(()=>{setMessage('')},1000);},1000)
        }else {
        inputWord.forEach((letter,index)=>{
            if(letter == word[index]) {inputRefs.current[index+(guess*5)].style.backgroundColor = 'green'; arr[letter]='green';}
            else if(word.includes(letter)) {inputRefs.current[index+(guess*5)].style.backgroundColor = 'yellow'; if(arr[letter] != 'green') arr[letter]='yellow';}
            else {inputRefs.current[index+((guess)*5)].style.backgroundColor = 'grey'; if(arr[letter] != 'green' && arr[letter] != 'yellow')  arr[letter]='grey';}})
            setInputWord([]);
            setkeyboardColorCode(arr);
            if(guess < 5) 
                setCurrentCell(currentCell+1);
            else{
                setCurrentCell(-1);
                setMessage(`You lost! The word you are looking for is ${word}`);
                setTimeout(()=>{setMessage('')},5000); return;}
        }
        setGuess(guess+1);
        }
        


    // disable all input fields in the grid
    
    const disbaleAll = () => {
        inputRefs.current.forEach((input,index)=>{
            input.disabled = true;
        });
    }

    const reset = () => {
        setInputWord([]);
        setGuess(0);
        setCurrentCell(0);
        setkeyboardColorCode({});
        inputRefs.current.forEach((cell)=>{cell.value='';cell.style.backgroundColor='rgb(250 250 249)'});
    }

    const replay = () => {
        reset();
        setWord('');
        fetchWord();
    }


    // Todo : add replay --done
    // remove manual color change
    // code refactoring for guess*5
    

  return (
    <>
    <div className='flex flex-col'>
      {message&&(
        <div className='fixed border-solid border-2 border-black-600 rounded bg-slate-800 text-white p-3 snackbar'>
      <Snackbar message={message}/>
      </div>
      )}
      {guess<5?(<button className='text-black-700 border border-black-700 font-medium text-sm px-3 py-2 text-center mx-auto my-2' onClick={() => reset()}>Reset</button>):(<button className='text-black-700 border border-black-700 font-medium text-sm px-3 py-2 text-center mx-auto my-2' onClick={() => replay()}>Replay</button>)}
    <div className='m-auto grid grid-cols-5 gap-2'>
        {gridCells.map((cell,index)=>
             (<input key = {cell.id} onBlur={e => e.target.focus()} disabled={currentCell===index?false:true} ref={(ele) => {
                addToRefs(ele, index);
              }}
            onKeyUp={(e)=>handleKeyPress(e.key)} type='text' maxLength={1}  className='h-16 w-16 bg-stone-50 text-2xl text-center border-solid border-2 border-grey-600'/>)
        )}
    </div>
    </div>
    <Keyboard guess={guess} keyboardColorCode={keyboardColorCode} handleKeyPress={handleKeyPress} />
    </>
  )
}

export default Grid
