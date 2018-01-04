# cors-tutorial
A CORS hands-on tutorial using Polymer and Node.js
From now on, brazillian portuguese only!
## Preparação do ambiente
### Clone este repositório
O repositório possui duas pastas principais, `client` e `server`. O primeiro contém uma [SPA]() Polymer que irá mandar requisições para a aplicação Node.js presente na pasta `server`.
Abra dois terminais na pasta raiz do repositório.
### Rode o servidor
Em um dos terminais, execute os seguintes comandos:
```
cd server/
npm install
node index.js 
```
Você deverá ver a seguinte mensagem(caso contrário, certifique-se que sua porta 3000 está liberada e o Node.js está instalado e atualizado):
```
Server listening on port 3000!
```
Para ter certeza que o servidor está rodando, abra o seguinte link em um browser: <http://localhost:3000/simple-request>, a mensagem 'OK' deve ser apresentada.
### Rode o cliente
No segunto terminal, execute os seguintes comandos:
```
cd client/
bower install
polymer serve

info:    Files in this directory are available under the following URLs
      applications: http://127.0.0.1:8081
      reusable components: http://127.0.0.1:8081/components/client/
```
Para ter certeza que o servidor está rodando, abra o seguinte link em um browser: <http://127.0.0.1:8081/>(A porta pode estar diferente, confira na mensagem do terminal), Uma página web deve abrir.
Seu ambiente já está pronto para o início do tutorial, abra a pasta `server` em seu editor de código preferido.
### O que vamos fazer?

