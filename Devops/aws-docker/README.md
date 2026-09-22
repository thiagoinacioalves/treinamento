# AWS Docker Lab — aplicação de três camadas

Este repositório é o material-base de um laboratório para cinco trainees. Cada trainee recebe uma instância EC2 Ubuntu limpa e uma cópia deste diretório.

## Objetivo

Completar a conteinerização de uma aplicação simples:

```text
navegador -> frontend (Nginx) -> backend (Node.js) -> PostgreSQL
```

O repositório **não contém Dockerfiles de propósito**. O `compose.yml` inicial contém somente o banco de dados. O desafio é criar os Dockerfiles do frontend e do backend, adicionar os serviços ao Compose e subir a aplicação.

## Estrutura

```text
aws-docker/
├── backend/
│   ├── package.json
│   └── server.js
├── database/
│   └── init.sql
├── frontend/
│   ├── index.html
│   └── nginx.conf
└── compose.yml
```

## Entrega esperada

Ao final, o trainee deve conseguir abrir `http://IP_DA_EC2/` e visualizar os itens carregados pelo PostgreSQL através da API.

Requisitos mínimos:

- `backend` escuta na porta `3000` e responde `GET /health` e `GET /api/items`;
- `frontend` é servido na porta `80`;
- o frontend encaminha `/api/` para o serviço `backend` pelo nome do serviço na rede do Compose;
- o backend acessa o banco usando as variáveis `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` e `DB_PASSWORD`;
- o banco usa volume persistente e o script em `database/init.sql` para criar os dados iniciais;
- apenas a porta HTTP do frontend precisa ser publicada para a internet.

## Exercício do trainee

1. Instale Docker Engine e Docker Compose.
2. Habilite e inicie o serviço do Docker.
3. Examine `backend/package.json` e `backend/server.js`.
4. Crie um Dockerfile para o backend.
5. Crie um Dockerfile para o frontend usando o `frontend/nginx.conf`.
6. Complete o `compose.yml` com os serviços `backend` e `frontend`.
7. Configure as variáveis de ambiente e a dependência saudável do banco.
8. Suba os serviços e valide a aplicação pelo navegador e pelos endpoints de saúde.

O banco pode ser iniciado com o Compose original antes de adicionar as camadas de aplicação. A imagem oficial do PostgreSQL executa `database/init.sql` somente na primeira inicialização do volume.

## Dicas de configuração

Use estes valores no serviço do backend:

```text
DB_HOST=db
DB_PORT=5432
DB_NAME=training
DB_USER=training_app
DB_PASSWORD=training_password
PORT=3000
```

O frontend deve usar o upstream `backend:3000`, e não `localhost:3000`. Dentro de um container, `localhost` aponta para o próprio container.

## Validação

O resultado esperado é:

```text
GET /health      -> 200
GET /api/items   -> 200 com itens Linux, Redes e DevOps
GET /            -> página do laboratório
```

Para limpar os containers e o volume durante um novo teste, use o procedimento de limpeza documentado pelo instrutor. A remoção do volume apaga os dados do banco.

## Infraestrutura AWS

O diretório `terraform/` contém a infraestrutura que provisiona cinco instâncias EC2 Ubuntu e copia este material para cada trainee. O Terraform não instala Docker, não cria Dockerfiles e não distribui chave privada.
