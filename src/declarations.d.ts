declare module "*.txt" {
  const content: string;
  export default content;
}

// For side-effect imports like: import './style.css'
declare module "*.css";

// For SCSS if you are using it
declare module "*.scss";

// (Optional) For CSS Modules if you use: import styles from './App.module.css'
declare module "*.module.css" {
  const classes: { [key: string]: string };
  export default classes;
}
