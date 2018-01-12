# cors-tutorial WIP
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
## Requisições Simples
### Tentando acessar um recurso em outro domínio
Ao apertar o botão *'Send Simple Request'*, você vai perceber que a seguinte mensagem de erro aparece: *The server returned an error response that could not be retrieved by the app, you can confirm it looking for any error message on Developer Console. Probably the CORS headers aren't correctly implemented.*, isto acontece por que, o *browser* identificou que uma requisição simples esta sendo enviada para um domínio diferente do dele, uma requisição simples é uma requisição que atende a alguns requisitos, definidos [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS), na seção??? *Simple Requests*, você como desenvolvedor *web* na prática não precisará se preocupar em enviar uma requisição simples ou não, o *browser* se encarrega de categorizá-la e aplicar o processo de validação correto.
Ao apertar o botão???, uma requisição [XHR](???) é enviada para o endereço <http://localhost:3000/simple-request>, o servidor recebe esta requisição e chama a função callback definina na chamada do método `app.get` no arquivo [index.js](server/index.js) (mais detalhes sobre como funciona o servidor virão a seguir):
```js
app.get('/simple-request', (req, res) => {
    res = disableCaching(res)
    
    //TODO: Put your code here
    
    res.sendStatus(200)
})
```

Este método recebe a requisição, representada pelo objeto `req`, e prepara uma resposta(representado pelo objeto `res`) com [código de *status* 200](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#200). Este método efetivamente funciona e a resposta é enviada. O *browser* recebe a resposta e inicia a validação da mesma relacionado ao *CORS*, para requisições GET simples é necessário que a resposta venha com um cabeçalho, ou *header*, chamado `Access-Control-Allow-Origin` contendo o domínio corrente da aplicação *web*, neste caso <http://127.0.0.1:8081>, ou o caracter '*' que representa a permissão para todos os domínios, como não é o caso, o próprio *browser* encarrega-se de invalidar a requisição e a resposta. O código *Javascript* não tem acesso ao objeto de resposta, não é possível saber que o código de retorno foi na verdade `200` nem ler o conteudo da resposta. é possível ver na aba *Console* do *Developer Tools* uma mensagem de erro relacionada ao *CORS*, como por exemplo: *Failed to load http://localhost:3000/simple-request: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:8081' is therefore not allowed access.*. Nossa tarefa agora é modificar o código do servidor para que ele envie o cabeçalho corrretamente na resposta.

**Nota:** O método `disableCaching` pode ser ignorado durante o tutorial, ele é responsável por definir cabeçalhos que irão evitar a resposta com código [304](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#304) em requisições recorrentes).
### Conhecendo o código do servidor
Antes de iniciarmos as modificações necessárias, é preciso algumas explicações sobre o servidor. Ele é um código *Javascript* que roda no *Node.js* e utiliza o pacote *expressjs* para escutar e tratar requisições REST. É suficiente saber o *express* é instanciado na constante `app` e este objeto possui um método para cada método HTTP disponível(`app.get` para `GET`, `app.post` para `POST`, etc.), os parâmetros mais importantes desses métodos, que são os usados nesse esqueleto de servidor, são a *string* do padrão da *URL* que aquele método específico irá tratar, e o segundo parâmetro, uma função *callback* que será chamada quando for recebida uma requisição em um *endpoint* que bata com o padrão definido. No caso do método `app.get` definido logo acima, a função que retorna uma resposta de sucesso será chamada sempre que uma requisição do tipo GET for feita no *endpoint* `simple-request`.
A última linha, chamando o método `listen`, inicia o serviço, atrelando a porta 300 e imprimindo a mensagem no *terminal*: 
```js
app.listen(3000, () => console.log('Server listening on port 3000!'))
```
### Corrigindo as respostas das requisições simples
Como já foi dito, as repostas devem contar um cabeçalho nomeado 'Access-Control-Allow-Origin', podemos fazer isso chamando o método `header` do objeto `res` passando o nome da chave e seu valor, por agora vamos tomar o caminho mais fácil e criar o cabeçalho com o valor '\*':
```js
res.header('Access-Control-Allow-Origin', '*')
```
Ponha esta linha de código no corpo do método responsável por tratar as requisições `GET` para `/simple-request` e reinicie o servidor(aperte `CTRL-C` no terminal e execute o último comando de inicialização descrito no tópico [Rode o servidor](#rode-o-servidor)).
Ao apertar novamente o botão *'Send Simple Request'*, perceba que a mensagem mudou: `The server returned a successful response with all valid headers` e o *Console* do *Developer Tools* não mostrará mais nenhum erro referente ao *CORS*, ao ver os cabeçalhos da resposta, na aba *Network*, é possível verificar a presença do cabeçalho do *CORS*.
## Requisições *preflighted*
Algumas requisições possuem características que faz o *browser* enviar uma requisição [OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS) antes da requisição propriamente dita, ela é chamada de `preflight request` e é usada para descrever para o servidor a requisição que será feita logo em seguida.
O segundo botão, chamado `Send Preflighted GET Request`, realiza uma requisição desse tipo, na prática, mudando o `Content Type` de `text/plain` para `text/html` já torna a requisição elegível de ser precedida por uma `preflight request` (para uma explicação completa clique [aqui](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) e vá para a sessão `Preflighted requests`). Ao clicar no botão, é possível ver no *Console* do *Developer Tools* uma requisição `OPTIONS` falhar devido a validação do *CORS*, mais uma vez precisamos modificar o servidor.
### Corrigindo as respostas das requisições *preflighted*
O tratamento necessário é o mesmo, incluir os cabeçalhos necessários, mas por que??? as modificações feitas para as requisições simples não servem neste caso? Na realidade, a requisição `GET` nem chegou a ser enviada, como o servidor não enviou uma resposta com os cabeçalhos exigidos pelo *CORS*, a primeira requisição, `OPTIONS` falha e todo o processo é abortado neste ponto.
Concluímos que a reposta da requisição *preflighted* também deve conter os cabeçalhos, para implementar isso, é simples no servidor, localize a chamada para o método `app.options`, com o mesmo *endpoint* do `GET` e adicione o mesmo cabeçalho *CORS* usado anteriormente:
```js
res.header('Access-Control-Allow-Origin', '*')
```

Reinicie o servidor, como anteriormente, e clique novamente no botão, você vai perceber que ainda não houve sucesso na requisição, o *Console* apresenta a seguinte mensagem: `Failed to load http://localhost:3000/simple-request: Request header field content-type is not allowed by Access-Control-Allow-Headers in preflight response.`

Outro cabeçalho, além do já incluso, é requirido neste caso: `Access-Control-Allow-Headers`, este cabeçalho define os nomes de cabeçalhos permitidos nas requisições *CORS*, no primeiro teste não estávamos definindo explicitamente um `Content Type`, então a requisição enviada não possuía o tal cabeçalho, com a mudança do `Content Type` para `text/html` na segunda requisição, a requisição `OPTIONS` enviada (e a próxima requisição `GET`) possuem um cabeçalho `content-type` definido, então ele deve estar definido como um cabeçalho permitido em `Access-Control-Allow-Headers`. Um valor válido para `Access-Control-Allow-Headers` é uma *string* com uma sequência de palavras separadas por vírgula, cada palavra é o nome de um cabeçalho permitido. NO nosso caso, devemos setar o valor para `content-type`:
```js
res.header('Access-Control-Allow-Headers', 'content-type')
```
Reinicie o servidor mais uma vez e a requisição deve funcionar desta vez.

### Conclusão
A partir de agora, você já deve ter percebido como funciona essa comunicação e validação, como diagnosticar um erro quando as coisas dão errado e ter uma idéia de onde está o erro e como corrigir. Existem outros cabeçalhos que não foram abordados aqui e recomendo ler a documentação da Mozilla extensivamente *linkada* neste artigo. 





