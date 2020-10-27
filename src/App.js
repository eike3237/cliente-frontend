import React from 'react';
import Header from '../src/components/header/header';/*Dando endereço da variavel armazenando em Header p/ser usado*/
import Routes from './routes';
import Tabela from '../src/components/tabela/testeTabela';
/*Dentro da div className é oq será executado, pelo app q é chamado pelo index.js, são os Components criados*/
function App() {
  return (
    <div className="App">
      <Header />
      <Routes />
    </div>
  );
}

export default App;

