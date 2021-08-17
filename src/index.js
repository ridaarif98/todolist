import './style.css';
import {  statusCheck } from './status.js';

document.getElementById('showListItem').addEventListener('click', (e) => {
  if (e.target.classList.contains('checkboX')) {
    statusCheck(e);
  }
});