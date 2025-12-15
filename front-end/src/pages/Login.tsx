import { Link } from 'react-router-dom'; // Importamos o Link para poder voltar

export function Login() {
  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      
      {/* Container do Formulário */}
      <div className="bg-slate-800 p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-700">
        
        <h1 className="text-2xl font-bold text-white mb-6 text-center">Login Admin</h1>
        
        <form className="flex flex-col gap-4">
          <div>
            <label className="text-slate-400 text-sm">Email</label>
            <input 
              type="email" 
              placeholder="admin@email.com" 
              className="w-full mt-1 p-3 rounded bg-slate-900 border border-slate-600 text-white focus:border-yellow-500 outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-slate-400 text-sm">Senha</label>
            <input 
              type="password" 
              placeholder="••••••" 
              className="w-full mt-1 p-3 rounded bg-slate-900 border border-slate-600 text-white focus:border-yellow-500 outline-none transition-colors"
            />
          </div>

          <button className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold p-3 rounded transition-colors mt-2">
            Entrar
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-500 hover:text-white text-sm transition-colors">
            Voltar para Home
          </Link>
        </div>

      </div>
    </div>
  );
}
