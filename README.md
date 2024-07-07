# Front Invest (front-invest)
# Gestão de compra de ativos financeiros

Este projeto é um MVP (Minimum Viable Product) para gestão de ativos financeiros,
consiste em uma pequena aplicação desenvolvida com VueJS e [Quasar](https://quasar.dev/).

A aplicação permite que o usuário cadastre operações que realiza no mercado financeiro.
Mas inicialmente possui suporte somente a gestão de compra e venda de ações e fundos imobiliários.
É possível toda uma gestão das operações, bem como a consolidação e
apuração da posição total, mostrando por ativo se está tendo lucro ou prejuízo.
No backend é consultado uma api para obter a cotação das ações e fundos imobiliários.

Este repositório é uma evolução desse [aqui](https://github.com/jeangomes/eng-soft-mvp1-front).

## Como rodar o frontend (para uso local)

1. Verifique os arquivos docker-compose.yml e o quasar.config.js, talvez seja necessário um ajuste de portas.
2. A aplicação rodando no Docker vai estar na porta 8082, sendo a mesma na máquina host.
3. Crie a imagem e suba o container com o comando: **docker-compose up -d**
4. Entre no container pelo terminar com o comando: **docker exec -ti mvp4-frontend_front_invest_1 sh** (onde mvp4-frontend_front_invest_1 é o nome do container)
5. Siga as instruções abaixo para rodar e subir a aplicação.

## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```



### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.config.js](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).
