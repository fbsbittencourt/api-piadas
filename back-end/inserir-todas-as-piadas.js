import Piada from './src/models/Piada.js'; // Importamos o Model
import piadas from './piadas.json' with { type: 'json' }; // ES Modules + import JSON (Node ≥ 17.5)

console.log(`Iniciando inserção de ${piadas.length} piadas...\n`);

for (const [index, piada] of piadas.entries()) {
    try {
        await Piada.criar(piada.pergunta, piada.resposta);
        process.stdout.write(`\rPiadas inseridas: ${(index + 1).toString().padStart(3)}/${piadas.length}`);
    } catch (erro) {
        console.error(`\nErro na piada ${index + 1}:`, erro.message);
    }
}

console.log('\n\nTodas as 95 piadas foram inseridas com sucesso!');
