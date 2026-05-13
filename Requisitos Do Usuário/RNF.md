# 2. Requisitos Não Funcionais

<p align="justify">A <i>Tabela 2</i> a seguir contém os Requisitos Não Funcionais (RNF) do sistema.</p>

| ID    | Requisito                                                                 | Prioridade | Requisitos Relacionados |
| :---: | :------------------------------------------------------------------------ | :--------: | :----------------------: |
| RNF01 | O sistema deve carregar a lista de móveis em até 2 segundos               | Alta       | RF03, RF04               |
| RNF02 | O sistema deve possuir interface simples e intuitiva. Critério de aceite: uma pessoa com mais de 65 anos, sem experiência prévia com o sistema, deve conseguir realizar as principais tarefas (buscar móvel) em até 10 minutos sem ajuda externa.                     | Alta       | RF01, RF02, RF03         |
| RNF03 | O sistema deve garantir a segurança dos dados dos usuários por meio de: hashing de senhas (bcrypt), comunicação exclusiva via HTTPS, controle de acesso onde cada usuário só vê seus próprios dados cadastrais, e logout automático após 30 minutos de inatividade.                | Alta       | RF01, RF02               |
| RNF04 | O sistema deve estar disponível 99% do tempo em um período de 30 dias corridos, exceto janelas de manutenção programada com aviso de 48h. O 1% restante (cerca de 7 horas por mês) pode ser usado para manutenção preventiva. Indisponibilidades não planejadas devem ser comunicadas em até 1 hora.                              | Média      | Todos                    |
| RNF05 | O sistema deve ser compatível com navegadores modernos, definidos como: duas últimas versões de Chrome, Firefox, Edge e Safari. Deve funcionar tanto em computadores (resolução mínima 1024x768) quanto em celulares (resolução mínima 320x480), com design responsivo.                    | Média      | Todos                    |

<div style="text-align: center">
<p>Tabela 2: Requisitos Não Funcionais</p>
</div>

# 3. Referências

<a href="../README.md">VOLTAR INÍCIO</a>
