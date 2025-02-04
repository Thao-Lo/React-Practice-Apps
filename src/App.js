
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import NotificationComponent from './components/NotificationComponent';
import SendMessageComponent from './components/SendMessageComponent';
import { WebSocketProvider } from './hooks/WebSocketContext';

function App() {
  return (

    <WebSocketProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/send-notification" element={<SendMessageComponent />}/>
        <Route path="/" element={ <NotificationComponent />}/>
      </Routes>
      </BrowserRouter>
    </WebSocketProvider>
  );
}

export default App;
