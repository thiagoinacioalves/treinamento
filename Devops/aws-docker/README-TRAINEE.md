# Laboratório AWS Docker — roteiro do trainee

Você recebeu uma instância Ubuntu limpa. A aplicação está em `/home/ubuntu/aws-docker` e possui três camadas:

```text
navegador -> frontend Nginx -> backend Node.js -> PostgreSQL
```

O Compose inicial contém somente o banco de dados. Os Dockerfiles fazem parte do exercício.

## Tarefas

1. Instale Docker Engine e Docker Compose.
2. Habilite e inicie o serviço do Docker.
3. Leia o `README.md` do diretório da aplicação.
4. Crie o Dockerfile do backend usando `backend/package.json` e `backend/server.js`.
5. Crie o Dockerfile do frontend usando `frontend/index.html` e `frontend/nginx.conf`.
6. Complete o `compose.yml` adicionando `backend` e `frontend`.
7. Configure a comunicação entre os serviços pela rede interna do Compose.
8. Publique somente o frontend na porta HTTP da instância.
9. Suba a aplicação e valide o resultado pelo endereço informado pelo instrutor.

## Critérios de conclusão

- `GET /` abre a interface web;
- a interface mostra Linux, Redes e DevOps;
- `GET /health` responde HTTP 200;
- o backend acessa o PostgreSQL pelo nome `db`, sem usar `localhost`;
- os dados continuam disponíveis após recriar os containers, usando o volume do banco;
- você consegue explicar o caminho da requisição entre as três camadas.

Não altere as instâncias dos demais trainees e não exponha a porta 5432 para a internet.
