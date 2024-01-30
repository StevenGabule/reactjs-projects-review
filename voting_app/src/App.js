import ProductLists from './components/ProductLists';
import './App.css';

function App() {
  return (
    <div className="main ui text container">
      <h1 className='ui dividing centered header'>
				Popular Products
			</h1>
			<div id="content">
				<ProductLists />
			</div>
    </div>
  );
}

export default App;
