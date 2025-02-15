import React from 'react'
import { useState } from 'react'
import axios from "axios";
import ClickableWords from '../components/ClickableWords';
import ClickableWordsPreloaded from '../components/ClickableWordsPreloaded';


const TextPage = () => {
  return (
    <div>
    <ClickableWordsPreloaded text={"Flummoxed intricate magnanimous inorganic"} ></ClickableWordsPreloaded>
    </div>
  )
}

export default TextPage;
