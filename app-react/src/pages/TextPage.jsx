import React from 'react'
import { useState } from 'react'
import axios from "axios";
import ClickableWords from '../components/ClickableWords';


const TextPage = () => {
  return (
    <div>
    <ClickableWords text={"Flummoxed intricate magnanimous inorganic"} ></ClickableWords>
    </div>
  )
}

export default TextPage;
