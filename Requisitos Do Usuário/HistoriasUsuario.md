# 1. História de Usuário

A Tabela 3 a seguir contém as Histórias de Usuário elicitadas.

<table>
    <thead>
        <tr style="background-color: teal; color: white">
            <th style="text-align:center">ID</th>
            <th style="text-align:center">História de Usuário</th>
            <th style="text-align:center">Critérios de Aceitação</th>
            <th style="text-align:center">Prioridade</th>
            <th style="text-align:center">RF/RNF Relacionado</th>
            <th style="text-align:center">Story Points</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td align="center">US01</td>
            <td>Como usuário que vai doar, eu quero me cadastrar na plataforma para oferecer móveis para doação.</td>
            <td>
                <ol>
                    <li>O usuário deve informar nome, e-mail e senha obrigatoriamente</li>
                    <li>A senha deve ter no mínimo 6 caracteres</li>
                    <li>O cadastro deve ser confirmado com mensagem de sucesso</li>
                    <li>O usuário deve conseguir fazer login após o cadastro</li>
                </ol>
            </td>
            <td align="center">Alta</td>
            <td align="center">RF07</td>
            <td align="center">8</td>
        </tr>
        <tr>
            <td align="center">US02</td>
            <td>Como usuário que vai receber, eu quero me cadastrar na plataforma para solicitar móveis disponíveis.</td>
            <td>
                <ol>
                    <li>O usuário deve informar nome, e-mail, senha e endereço</li>
                    <li>Todos os campos devem ser obrigatórios</li>
                    <li>O endereço deve ser armazenado corretamente</li>
                </ol>
            </td>
            <td align="center">Alta</td>
            <td align="center">RF10</td>
            <td align="center">3</td>
        </tr>
        <tr>
            <td align="center">US03</td>
            <td>Como usuário que vai doar, eu quero cadastrar um móvel disponível para encontrar alguém que precise dele.</td>
            <td>
                <ol>
                    <li>O doador deve informar: nome do móvel, descrição detalhada, estado de conservação (opções: novo, bom, regular, precisa de reparos), e categoria/tipo do móvel (ex: sofá, cama, mesa, armário).</li>               
                    <li>Os filtros (tipo e estado de conservação) são selecionados pelo doador em menus pré-definidos pelo sistema, não digitados livremente.</li>
                    <li>O móvel deve aparecer na lista pública imediatamente após o cadastro, com status "disponível".</li>
                    <li>O sistema deve exibir mensagem de sucesso após o cadastro.</li>
                </ol>
            </td>
            <td align="center">Alta</td>
            <td align="center">RF03</td>
            <td align="center">3</td>
        </tr>
        <tr>
            <td align="center">US04</td>
            <td>Como usuário que vai receber, eu quero buscar e visualizar móveis disponíveis para encontrar itens que atendam minhas necessidades.</td>
            <td>
                <ol>
                    <li>O usuário deve conseguir visualizar uma lista de móveis disponíveis com paginação de 20 móveis por página.</li>               
                    <li>Deve ser possível filtrar por: tipo de móvel (ex: sofá, cama, mesa), estado de conservação (novo, bom, regular, precisa de reparos), tempo de uso (menos de 1 ano, 1-3 anos, 3-5 anos, mais de 5 anos), e bairro.</li>
                    <li>Apenas móveis com status "disponível" devem ser exibidos na lista principal.</li>
                    <li>Deve ser possível acessar os detalhes de um móvel específico (página individual com fotos, descrição completa, dados do doador anonimizados).</li>
                </ol>
            </td>
            <td align="center">Alta</td>
            <td align="center">RF03</td>
            <td align="center">8</td>
        </tr>
    </tbody>
</table>

<div align="center">
Tabela 3: Histórias de Usuário
</div>

## 5. Referências bibliográficas
