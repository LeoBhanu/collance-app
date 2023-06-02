import { useState } from 'react';
import './App.css';

import Form from './component/Form';
import { Table } from './component/Table';

function App() {
  return (
    <div className="App">
        <Form />
        <Table />
    </div>
  );
}

export default App;
