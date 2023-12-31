import React,{useEffect} from 'react'
import countries from '../data'
import './translator.css'
export default function Translate() {
    useEffect(()=>{
        const fromText=document.querySelector(".from-text");
        const toText=document.querySelector(".to-text");
        const exchangeIcon=document.querySelector(".exchange");
        const selectTag=document.querySelectorAll("select");
        const icons=document.querySelectorAll(".row i");
        const TranslateBtn=document.querySelector("button");

        selectTag.forEach((tag,id)=>{
            for(let country_code in countries){
                let selected= (id===0)?(country_code==="en-GB" ?"selected":""):(country_code==="hi-IN" ?"selected":"");
                let option = `<option ${selected} value="${country_code}">${countries[country_code]}</option>`;
                tag.insertAdjacentHTML("beforeend",option);
            }
        });

        exchangeIcon.addEventListener("click",()=>{
            let tempText=fromText.value;
            let tempLang=selectTag[0].value;
            fromText.value=toText.value;
            toText.value=tempText;
            selectTag[0].value=selectTag[1].value;
            selectTag[1].value=tempLang;
        })

        fromText.addEventListener("keyup",()=>{
            if(!fromText.value){
                toText.value="";
            }
        })

        TranslateBtn.addEventListener("click",()=>{
            let text=fromText.value.trim();
            let translateFrom=selectTag[0].value;
            let translateTo=selectTag[1].value;
            if(!text) return;
            toText.setAttribute("placeholder","Translating...");
            let apiUrl=`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
            fetch(apiUrl).then(res=>res.json())
            .then(data=>{
                toText.value=data.responseData.translatedText;
            });
            toText.setAttribute("placeholder","Translation")
        });

        icons.forEach((icon)=>{
            icon.addEventListener("click",({target})=>{
              if(!fromText.value||!toText.value) return;
              if(target.classList.contains("fa-copy")){
                if(target.id==="from"){
                    navigator.clipboard.writeText(fromText.value);
                }else{
                    navigator.clipboard.writeText(toText.value);
                }
              }else{
                let sound;
                if(target.id==="from"){
                    sound=new SpeechSynthesisUtterance(fromText.value);
                    sound.lang=selectTag[0].value;
                }else{
                    sound=new SpeechSynthesisUtterance(toText.value);
                    sound.lang=selectTag[1].value;
                }
                speechSynthesis.speak(sound);
              }
            })
          })
    },[]);

  return (
    <div>
      <div className='container'>
        <div className='wrapper'>
            <div className='text-input'>
                <textarea spellCheck="false" className='from-text' placeholder='Enter text'></textarea>
                <textarea readOnly spellCheck="false" className='to-text' placeholder='Translation'></textarea>
            </div>
            <ul className='controls'>
                <li className='row from'>
                    <div className='icons'>
                        <i id='from' className='fas fa-volume-up'></i>
                        <i id='from' className='fas fa-copy'></i>
                    </div>
                    <select>

                    </select>
                </li>
                <li className='exchange'>
                    <i className='fas fa-exchange-alt'/>
                </li>
                <li className='row to'>
                    <select></select>
                    <div className='icons'>
                        <i id='to' className='fas fa-volume-up'/>
                        <i id="to" className='fas fa-copy'/>
                    </div>
                </li>
            </ul>
        </div>
        <button>Translate Text</button>
      </div>
    </div>
  )
}
