import { RefreshCw, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Home() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 flex flex-col items-center">
      {/* Cabeçalho */}
      <nav className="w-full max-w-2xl flex justify-between mb-8">
        <h1 className="text-2xl font-bold text-yellow-500">PiadasDev</h1>
        <Link to="/login" className="text-sm underline cursor-pointer hover:text-yellow-500">
            Área Admin
        </Link>
      </nav>

      {/* Card da Piada (Estático por enquanto) */}
      <div className="w-full max-w-2xl bg-slate-800 p-8 rounded-xl shadow-lg border border-slate-700 mb-8">
        <div className="space-y-4 text-center">
          <h2 className="text-xl text-slate-300">O que é um terapeuta para programadores?</h2>
          <p className="text-3xl font-bold text-white">Um console.log!</p>
        </div>
        
        <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 p-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-colors">
          <RefreshCw size={20} />
          Próxima Piada
        </button>
      </div>

      {/* Formulário de Envio */}
      <div className="w-full max-w-2xl bg-slate-800 p-6 rounded-xl border border-slate-700">
        <h3 className="text-lg font-bold mb-4">Envie sua piada:</h3>
        <input 
          placeholder="Pergunta" 
          className="w-full mb-3 p-3 rounded bg-slate-900 border border-slate-600 text-white focus:border-yellow-500 outline-none"
        />
        <input 
          placeholder="Resposta" 
          className="w-full mb-3 p-3 rounded bg-slate-900 border border-slate-600 text-white focus:border-yellow-500 outline-none"
        />
        <button className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded font-bold flex items-center gap-2 transition-colors">
          <Send size={18} /> Enviar
        </button>
      </div>
    </div>
  );
}
