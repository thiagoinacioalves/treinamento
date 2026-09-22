# Laboratório AWS de troubleshooting

Documentação separada por público:

- [README-INSTRUTOR.md](README-INSTRUTOR.md): provisionamento, inventário, cenários de erro e soluções.
- [README-TRAINEE.md](README-TRAINEE.md): objetivo do laboratório e critérios de conclusão, sem comandos ou gabarito.

O laboratório cria uma EC2 independente para cada trainee. Em cada ambiente existe o fluxo:

```text
navegador -> Nginx (front/proxy) -> API Node.js (back) -> PostgreSQL (banco local)
```

O Terraform somente declara e configura os recursos. A execução do provisionamento é responsabilidade do instrutor.
