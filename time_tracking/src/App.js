import TimersDashboard from './components/TimersDashboard';

function App() {
  return (
    <div id="main" className="main ui">
      <h1 className="ui dividing centered header">Timers</h1>
      <div id="content">
				<TimersDashboard />
			</div>
    </div>
  );
}

export default App;
