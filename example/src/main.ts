import './style.css';
import { createRoot } from '@nuvo-js/core'
import App from './App';

const nuvo = window['@']

const root = document.getElementById('app');

createRoot(root!, App());

console.log(nuvo)

