import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Login } from './pages/Login';

import { AuthProvider, useAuth } from './context/AuthContext'; // <--- Importe o Provider
import { Admin } from './pages/Admin';

// --- O COMPONENTE PORTEIRO ---
// Ele recebe um "filho" (a página que você quer acessar)
function RotaProtegida({ children }: { children: JSX.Element }) {
  const { isAuthenticated } = useAuth(); // Pergunta pro contexto: "Tá logado?"
  
  if (!isAuthenticated) {
    // Se NÃO estiver logado, manda pro Login
    return <Navigate to="/login" />;
  }
  
  // Se estiver logado, deixa passar e mostra a página
  return children;
}

function App() {
  return (
    // 1. BrowserRouter: O "Pai" que monitora a URL do navegador
    <BrowserRouter>
      
      <AuthProvider>
        {/* 2. Routes: Uma lista de regras. Ele escolhe APENAS UMA por vez. */}
        <Routes>
          
          {/* 3. Route: A regra individual */}
          {/* "path" é o endereço, "element" é o que aparece na tela */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />

          {/* 3. A rota Admin agora fica DENTRO do Porteiro */}
          <Route 
            path="/admin" 
            element={
              <RotaProtegida>
                <Admin />
              </RotaProtegida>
            } 
          />
          
          {/* Dica: Podemos criar uma rota para página não encontrada (404) depois */}
          <Route path="*" element={
            <h1 className="text-white">404 Página não encontrada</h1>
          } />

        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
