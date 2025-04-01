
# Autenticação e autorização

Projeto full stack com o intuito de aprender a fazer autorização de tipos de usuário. 
EXEMPLO: se o usuário for administrador, ele terá acesso a informações x e y. Se o usuário for apenas um cliente, terá acesso a informações x.




## Learnings

 #### Revisão de aprendizados prévios :
    - banco de dados 
    - autenticação
    - rotas 
    - integração de backend e frontend 
### Aprendizados novos
##### AUTORIZAÇÃO: 

        Autorização é o processo de verificar se o usuário tem permissão 
        para acessar uma área de uma aplicação ou executar ações específicas. 
        A autorização pode conceder ou negar permissão para realizar tarefas 
        ou acessar áreas de uma aplicação.  
        
        
 ~obs~ : *a autenticação vem antes da autorização* 

## Roadmap Backend

- cria-se uma migrations pro usuário, no qual continha uma tabela de ROLE, ou seja, a função do usuário.

- adiciona-se as duas únicas opções de roles `["admin", "costumer"]`, e adiciona como default ["costumer"] para qualquer usuário que se inscrever.

-  Adiciona-se a ROLE como requisição, primeiramente do Session Controller {pega a role a partir do token do user}, e por fim, passa pelo middleware de autenticação como `request.user = 
    {
        id: Number(user_id), 
        role
    }`

-  Cria-se um middleware de autorização: É uma função que recebe um `roleToVerify` como parâmetro; Recupera o role passada como requisição do user no middleware de autenticação; verifica se a `role do user ==  roleToVerify`. Caso seja diferente => `throw new AppError`.. caso seja igual,  `return next()`

- Aplica-se o middlware de autorização em um **conjunto** de rotas: `salesRoutes.use(verifyUserAuthorization("admin"));` onde `'sales'` é o nome da rota deste exemplo. `('admin')` é a role, passada como parâmetro na função do middleware que indica quem terá acesso a esse conjunto de rotas, neste caso, administradores. **ALERT** - Passando como `__routes.use()`, todas as rotas do arquivo, neste exemplo, todas as rotas de `sales` passarão pelo middleware, consequentemente qualquer rota de sale, só será acessada pelo **admin**.

- Aplica-se o middlware em uma **única rota**:  `productsRoutes.post("/",  verifyUserAuthorization('admin'), productsController.create);`  

- Adiciona-se outras **roles**: 
    1. recria a migrate, passando `["admin", "costumer", "sale"]` (sale como nova role)
    2. atualiza o middleware de autorização. agora ao invés de comparar a role do usuário com o roleToVerify, verifica-se `if(!roleToVerify.includes(role))`. Se `true`,`throw new AppError`.. caso `false`,  `return next()`.
    3. dentro da rota que você desejar ter acesso a um, ou mais roles: `salesRoutes.use(verifyUserAuthorization(["admin", "sale"]));`


## Roadmap Frontend

- Separa-se as rotas, para definir quais cada tipo se user poderá acessar: Duplica e edita `app.routes.jsx` 2 vezes, dando origem às novas rotas de cada role `customer.routes, admin.routes & sale.routes `

- Importa-se todas as rotas dentro do index.jsx (arquivo no qual se constrói a lógica de redirecionamento de rotas de acordo com o usuário).

- Cria-se uma função `"getRoutes()"`; dentro dela: `switch(user.roules){}`

- Cria-se a lógica por dentro do `switch`: **1.** Cria-se a pasta `'utils'`, dentro dela, `roles.js`. **2.** Dentro da role.js, exporta-se `const USER_ROLES = {(aqui, adiciona-se todas as roles. ex: SALE: 'sale')}`. **3.** Constrói-se a lógica para cada caso, seguindo o mesmo padrão: `SWITCH(user.role){case USER_ROLES.ADMIN return <AdminRoutes />}`

- Editando os componentes presentes na tela, dependendo do `user.role`: No **componente que deseja-se ocultar/exibir**, constrói-se a seguinte lógica em volta do feature:
 ```
import { useAuth } from '../../hooks/auth'
import { USER_ROLES } from '../../utils/roles'

    {
    //para que apenas *uma* role exiba esse conteúdo:
        user.role === USER_ROLES.ADMIN &&
    //para que duas ou mais:
        [USER_ROLES.ADMIN, USER_ROLES.SALE].includes(user.role) &&
        <>
            <Feature/>
        </>
    }
 ```
*esse método pode ser utilizado em qualquer ocasião onde é necessário ocultar ou exibir algo, dependendo do cargo do usuário.*





## Tech Stack

**Client:** ReactJS

**Server:** Node, Express , JWT

