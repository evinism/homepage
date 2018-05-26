// import a CSS module
import classes from './main.css';
import mountComponent from './src';

export default () => {
  mountComponent(document.getElementById('mount'));
};