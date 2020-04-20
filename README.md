MindShare

API em nodeJs - Back-end

Os programas e sites que foram usados no windows foram:

Foi criado uma conta no https://www.mongodb.com/
Nesta conta foi criado o nome do projeto chamado mindshare
qualquer servidor no site é possível funcionar o banco de dados gratuíto e der um nome para seu Cluster como Cluster0.

Para que sua máquina possa ter acesso ao banco de dados é preciso primeiro habilitar o seu ip abaixo:
Whitelist a connection IP address
An IP address has been whitelisted. Add another whitelist entry in the IP Whitelist tab.

Foi criado uma conta de usuário para acessar o banco de dados em mongodb:
usuario: mindshare
senha: mindshare

No site selecionando o Cluster do projeto, você clina em connect e Connect you application
Você pode copiar: Connection string only por exemplo:
mongodb+srv://mindshare:<password>@cluster0-tkyhq.mongodb.net/test?retryWrites=true&w=majority

copie esse código e coloque o seu password no lugar <password>
Na pasta \src\config.js você pode mudar o nome
    connectionString: 'mongodb+srv://mindshare:mindshare@cluster0-tkyhq.mongodb.net/test?retryWrites=true&w=majority',

Instale o programa Node.js versão 13.12.0

Você pode acessar em qualquer navegado por exemplo Firefox

No prompt de comando (no botão incial digite cmd) você entre na pasta e instale as dependências

npm install azure-storage babel-cli babel-preset-es2015 body-parser cors debug express guid http jsonwebtoken md5 mongoose sendgrid --save

npm install nodemon --save-dev

Rode sua aplicação digitando:

npm start

Vai mostrar a mensagem que sua aplicação está rodando:

> mindshare@1.0.0 start
> node ./bin/server.js

API rodando na porta 3333

você pode acessar sua api no site http://localhost:3333/ ou usando o programa Postman

Instale o programa Postman para testar sua api

no arquivo api.txt temos os exemplos das requisições usando os métodos get, post, put e delete
