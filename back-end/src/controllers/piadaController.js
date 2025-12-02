import * as Piada from '../models/Piada.js'; // Importamos o Model


export async function submeterPiada(req, res) {
    const { pergunta, resposta } = req.body; // Pega os dados enviados no JSON

    // 1. Validação: Verifica se os campos foram preenchidos
    if (!pergunta || !resposta) {
        return res.status(400).json(
            {
                message: 'Erro: Pergunta e resposta são obrigatórias.'
            }
        );
    }

    try {
        // 2. Chama o Model para salvar
        const novaPiada = await Piada.createPiada(pergunta, resposta);

        // 3. Responde com Sucesso (201 = Created)
        res.status(201).json(
            {
                message: 'Sucesso! Piada enviada para moderação.',
                piada: novaPiada
            }
        );
    } catch (error) {
        // Se der erro no banco, avisa o usuário (500 = Erro Interno)
        res.status(500).json({ message: 'Erro ao cadastrar a piada.' });
    }
}

export async function buscarPiadaAleatoria(req, res) {
    try {
        const piada = await Piada.getPiadaAleatoria();

        // Se não tiver nenhuma piada aprovada no banco, o retorno será undefined
        if (!piada) {
            return res.status(404).json(
                {
                    message: 'Ainda não temos piadas aprovadas. Cadastre uma!'
                }
            );
        }

        // Se achou, devolve a piada
        res.json(piada);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar piada.' });
    }
}

export async function listarPiadasPendentes(req, res) {
    try {
        const piadas = await Piada.getPiadasPendentes();
        res.json(piadas);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar piadas pendentes.' });
    }
}

// Realiza a aprovação
export async function aprovarPiada(req, res) {
    const { id } = req.params; // Pega o ID da URL (ex: /piadas/1/aprovar)

    try {
        // Envia "1" para o model, indicando aprovação
        const sucesso = await Piada.moderarPiada(id, 1);

        if (sucesso) {
            res.json(
                {
                    message: `Piada ${id} aprovada com sucesso! Agora ela é pública.`
                }
            );
        } else {
            res.status(404).json({ message: 'Piada não encontrada.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao moderar piada.' });
    }
}
