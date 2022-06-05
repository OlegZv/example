import logo from "./logo.svg";
import "./App.css";
import SomeConfig from "./components/SomeConfig";
import WorkingConfig from "./components/WorkingConfig";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <p>Working input:</p>
      <WorkingConfig />
      <p>
        Not working input:
      </p>
      <SomeConfig />
    </div>
  );
}

export default App;
