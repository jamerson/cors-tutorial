# cors-tutorial
A CORS hands-on tutorial using Polymer and Node.js
From now on, brazillian portuguese only!
## Preparação do ambiente
### Pré-requisitos
- *Node.js*
- *Polymer*
### Clone este repositório
O repositório possui duas pastas principais, `client` e `server`. O primeiro contém uma [SPA]() Polymer que irá mandar requisições para a aplicação Node.js presente na pasta `server`.
Abra dois terminais na pasta raiz do repositório.
### Rode o servidor
Em um dos terminais, execute os seguintes comandos:
```shell
cd server/
npm install
node index.js 
```
Você deve ver a seguinte mensagem(caso contrário, certifique-se que sua porta 3000 está liberada e o Node.js está instalado e atualizado):
```
Server listening on port 3000!
```
Para ter certeza que o servidor está rodando, abra o seguinte link em um browser: <http://localhost:3000/simple-request>, a mensagem 'OK' deve ser apresentada.
### Rode o cliente
No segunto terminal, execute os seguintes comandos:
```shell
cd client/
bower install
polymer serve
```
Você deve ver a seguinte mensagem:
```
info:    Files in this directory are available under the following URLs
      applications: http://127.0.0.1:8081
      reusable components: http://127.0.0.1:8081/components/client/
```
Para ter certeza que o servidor está rodando, abra o seguinte link em um browser: <http://127.0.0.1:8081/>(A porta pode estar diferente, confira na mensagem do terminal), Uma página web deve abrir.
Seu ambiente já está pronto para o início do tutorial, abra a pasta `server` em seu editor de código preferido.
## O que vamos fazer?
O cliente *web* possui dois botões 'Send Request', que enviam requisições para o servidor Node.js, inicialmente essas requisições falham devido a validação do CORS, durante o tutorial será passado o que é esse mecanismo, como e por que ocorre, e a medida que formos modificando o código do servidor para que ele responda corretamente as requisições, será explicado o que é necessário para que a comunicação entre cliente e servidor aconteça sem falhas.
A grosso modo, o mecanismo CORS age tanto do lado do cliente quanto do servidor para que políticas de segurança sejam aplicadas. Do lado do servidor,  
## Requisições Simples

### Tentando acessar um recurso em outro domínio
Ao apertar o botão *'Send Simple Request'*, você vai perceber que a seguinte mensagem de erro aparece: *The server returned an error response that could not be retrieved by the app, you can confirm it looking for any error message on Developer Console. Probably the CORS headers aren't correctly implemented.*, isto acontece por que, o *browser* identificou que uma requisição simples esta sendo enviada para um domínio diferente do dele, uma requisição simples é uma requisição que atende a alguns requisitos, definidos [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), na seção??? *Simple Requests*, você como desenvolvedor *web* na prática não precisará se preocupar em enviar uma requisição simples ou não, o *browser* se encarrega de categorizá-la e aplicar o processo de validação correto.
Ao apertar o botão, uma requisição [XHR](???) é enviada para o endereço <http://localhost:3000/simple-request>, o servidor recebe esta requisição e chama a função callback definina na chamada do método `app.get` no arquivo [index.js](https://github.com/jamerson/cors-tutorial/blob/master/server/index.js) (mais detalhes sobre como funciona o servidor virá a seguir):
```js
app.get('/simple-request', (req, res) => {
    res = disableCaching(res)

    res.sendStatus(200)
})
```

Este método recebe a requisição, representada pelo objeto `req`, e prepara uma resposta(representado pelo objeto `res`) com [código de *status* 200](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200). Este método efetivamente funciona e a resposta é enviada. O * browser* recebe a resposta e inicia a validação da mesma relacionado ao `CORS`, para requisições GET simples é necessário que a resposta venha com um cabeçalho, ou *header*, chamado `Access-Control-Allow-Origin` contendo o domínio corrente da aplicação *web*, neste caso <http://127.0.0.1:8081>, ou o caracter '*' que representa a permissão para todos os domínios, como não é o caso, o próprio *browser* encarrega-se de invalidar a requisição e a resposta. O código *Javascript* não tem acesso ao objeto de resposta, não é possível saber que o código de retorno foi na verdade `200` nem ler o conteudo da resposta. é possível ver na aba *Console* do *Developer Tools* uma mensagem de erro relacionada ao CORS, como por exemplo: *Failed to load http://localhost:3000/simple-request: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8081' is therefore not allowed access.*. Nossa tarefa agora é modificar o código do servidor para que ele envie o cabeçalho corrretamente na resposta.
**Nota:** O método `disableCaching` pode ser ignorado durante o tutorial, ele é responsável por definir cabeçalhos que irão evitar a resposta com código [304](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#304) em requisições recorrentes).
### Conhecendo o código do servidor
Antes de iniciarmos as modificações necessárias, é preciso algumas explicações sobre o servidor. Ele é um código *Javascript* que roda no *Node.js* e utiliza o pacote *expressjs* para escutar e tratar requisições REST. É suficiente saber o *express* é instanciado na constante `app` e este objeto possui um método para cada método HTTP disponível(`app.get` para `GET`, `app.post` para `POST`, etc.), os parâmetros mais importantes desses métodos, que são os usados nesse esqueleto de ser
