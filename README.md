<h1 align="center">:fork_and_knife:Tasty Recipes</h1>

## :memo: Descrição
Nesse Projeto foi desenvolvido um app de Receitas, utilizando ferramentas do ecossistema React: Hooks e Context API.

## :books: Funcionalidades
### <b>Logar</b>
* Validações de email e senha
* Uso da biblioteca react-toastify para pop-ups de notificação em caso de inputs preenchidos de forma incorreta.
### <b>Acesso as receitas</b>
* Acesso a receitas em duas categorias: Drinks e Meals
* Possibilidade de listar por todas- All e por subCategorias atravéz de buttons no menu.
* Possibilidade de listar receitas por Name, first letter ou ingredient atraves do button pesquisar disponível no header.

### <b>Detalhes da receita</b>
* Ao clicar no card de alguma receita é redirencionado para a pagina de detalhes da receita
* É possível ver lista de ingredientes e instruções do modo de preparo
* É possível compartilhar a receita atravez do buttom share.
* É possível favoritar a receita atravez do buttom favorite.
* É possível dar início a receita atravez do buttom continue Recipe.

### <b>Startando a receita</b>
* Ao clicar no button continue Recipe de alguma receita é redirecionado para a página receita em progresso
* É possível marcar como concluído a lista de ingredientes atrávez de checkbox.
* É possível finalizar a receita através do buttom finalizar.

### <b>Receitas finalizadas</b>
* Ao clicar no button finalizar é redirecionado para a página receitas finalizadas
* É possível ver as receitas finalizadas divididas em categorias: all, drinks e meals
* É possível ver detalhes de data da finalização de cada receita.

### <b>Profile</b>
* É possível ver o profile através button que fica no header.
* É possível ver email logado.
* É possível ter acesso aos links para as páginas de receitas finalizadas, receitas favoritas e de fazer logout.

### <b>Receitas favoritas</b>
* É possível ver a lista com todas as receitas favoritadas na aplicação.
* Para o salvamento dessa informação foi usado o localStorage.

## :wrench: Tecnologias utilizadas
  * _Redux_ para gerenciar estado
  * biblioteca _React-Redux_
  * Context API do _React_ para gerenciar estado
  * _React Hook useState_
  * _React Hook useContext_
  * _React Hook useEffect_
  - Criar Hooks customizados

## :rocket: Rodando o projeto
Para rodar o repositório é necessário clonar o mesmo, dar o seguinte comando para iniciar o projeto:
```
npm install
```
Para iniciar o projeto:
```
npm start
```

## :soon: Implementação futura
* Futuramente será feito o desenvolvimento de uma API para gerenciamento da aplicação.

## :handshake: Colaboradores
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/jhmorais">
        <img src="https://avatars.githubusercontent.com/u/769141?v=4" width="100px;" alt="Foto de Tati Alves no GitHub"/><br>
        <sub>
          <b>João Morais</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## :dart: Status do projeto
 Refatorando o método de salvar no localStorade da página receitas favoritas e estilizando com css.
  
  
 
 
