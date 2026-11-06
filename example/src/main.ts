import './style.css';
import { createRoot } from '../../dist'
import App from './App';

const doggy = window['@']


const root = document.getElementById('app');

createRoot(root!, App());

console.log(doggy)

