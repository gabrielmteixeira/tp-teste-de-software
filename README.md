### Members:

Gabriel Teixeira - 2020054420

Ilana Virginia Barbosa - 2019086969


### Descrição
O sistema de gerenciamento financeiro permite que os usuários registrem ganhos e despesas, classifiquem-nos em categorias e definam metas e orçamentos. Ele também oferece a opção de visualizar todos esses dados por meio de gráficos informativos. Além disso, os usuários podem compartilhar o controle financeiro com parceiros, familiares ou outros, o que torna o sistema flexível e adaptável a diferentes necessidades.

### Tecnologias
O sistema é desenvolvido usando uma combinação de tecnologias que maximizam a eficiência e a escalabilidade. Python e Flask formam a base do back-end, facilitando um desenvolvimento rápido e estável. A gestão de dependências é simplificada através do Poetry, enquanto a confiabilidade é assegurada por testes automatizados com Pytest. O banco de dados Postgres contribui para a performance e escalabilidade.

No lado do front-end, React é utilizado para fornecer uma experiência de usuário interativa. A estilização é acelerada com Tailwind, proporcionando um design responsivo. O gerenciamento de pacotes fica mais eficiente graças ao Pnpm, e a qualidade do código é garantida através de testes com Jest e Cypress.

## Building and running

### Pre-requisites

We use `docker`, `docker-compose` and the PG client `psql` to start the
system. Please install these tools properly before proceeding.

The Makefile commands assume a Linux or MacOS environment. Please use a virtual
machine in case that is not your environment.

### Build commands

#### Start

To build and run the system with a test database, run:

```shell
make start
```

#### Restart

To restart the system, run

```shell
make restart
```

#### Stop

To stop the system, run

```shell
make stop
```

## Testing

After the system is running locally, do whatever you want with it. For example,
to connect to the test database, run
