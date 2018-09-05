import React from 'react';
import styles from '../styles/login.css';
console.log('styles: ', styles);
class App extends React.Component {
  render() {
    return (
      <div className={styles.inputContainer}>
      Hi from app
        <input className={'form-control ' + styles.input} type="text" placeholder="Enter username" aria-label="Search"></input>
      </div>
    );
  }
}

export default App;