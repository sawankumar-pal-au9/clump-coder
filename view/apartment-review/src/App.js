import React, {useState} from 'react';
import Routing from './components/Routing';

function App() {
  const [isLogin, setIsLogin] = useState(sessionStorage.getItem('token')?true:false);

  return (
    <Routing isLogin={isLogin} setIsLogin={setIsLogin}/>
  );
}

export default App;
