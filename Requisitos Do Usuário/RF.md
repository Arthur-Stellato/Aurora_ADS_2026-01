# 1. Requisitos Funcionais

<p align="justify">A <i>Tabela 1</i> a seguir contém os Requisitos Funcionais (RF) elicitados utilizando a técnica de Brainstorm.</p>

| ID   | Requisito                                                                 | Prioridade | Requisitos Relacionados |
| :--: | :------------------------------------------------------------------------ | :--------: | :----------------------: |
| RF01 | O sistema deve fornecer os resultados tão rápido quanto possível. O tempo 
máximo de resposta para qualquer operação (busca, cadastro, filtro) deve ser de até 
2 segundos em condições normais de rede. O sistema considera um móvel por cadastro 
(itens individuais, não conjuntos). O móvel pode estar em qualquer estado de 
conservação (informado pelo doador).                                               | Alta       | -                        |
| RF02 | O usuário deve poder acessar os móveis que ele mesmo cadastrou para doação
e que ainda estão com status "disponível". Além disso, deve poder acessar os móveis
que ele salvou como "favoritos" ou demonstrou interesse.                           | Alta       | RF01                     |
| RF03 | O usuário deve poder acessar os móveis disponíveis em doação separados
pelas seguintes categorias: (1) móveis disponíveis para receber, (2) móveis em 
processo de doação (aguardando retirada/entrega), (3) móveis já doados (histórico).
Apenas móveis com status "disponível" aparecem na lista principal de busca.        | Baixa      | RF01                     |
| RF04 | O usuário deve poder filtrar os móveis disponíveis usando os seguintes
critérios, podendo combinar múltiplos filtros: tipo de móvel 
(sofá, cama, mesa, armário, etc.), estado de conservação 
(novo, bom, regular, precisa de reparos), faixa de tamanho 
(pequeno, médio, grande), bairro/região do doador.                                 | Média      | RF03                     |

<div style="text-align: center">
<p>Tabela 1: Requisitos Funcionais</p>
</div>

# 2. Referências

<a href="../README.md">VOLTAR INÍCIO</a>
