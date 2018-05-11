// import a CSS module
import classes from './main.css';
import mountComponent from './src';

export default () => {
  console.log(classes.main);
  mountComponent(document.getElementById('mount'));
};