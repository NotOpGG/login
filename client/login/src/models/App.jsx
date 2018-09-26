import React from 'react';
import styles from '../styles/login.css';
class App extends React.Component {
  render() {
    return (
      <div className={styles.inputContainer}>
        <input className={'form-control ' + styles.input} type="text" placeholder="Enter username"></input>
        <button type="submit" className={'btn btn-primary ' + styles.submit}>Not OP</button>
      </div>
    );
  }
}

export default App;