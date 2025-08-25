# 📌 Aplicativo Cliente – Jogo da Velha

Aplicativo React Native + Expo para jogar Jogo da Velha, consumindo a API desenvolvida em .NET 8. Permite que dois usuários joguem partidas e gerenciem seus perfis.
---

## 🚀 Tecnologias Utilizadas

- [React Native 0.79.5](https://reactnative.dev/) – Framework para desenvolvimento mobile.  
- [Expo 53](https://docs.expo.dev/) – Ferramenta para build, desenvolvimento e deploy mobile.  
- [React Navigation](https://reactnavigation.org/) – Navegação entre telas do aplicativo:
  - @react-navigation/native  
  - @react-navigation/native-stack  
  - @react-navigation/bottom-tabs  
  - @react-navigation/stack  
- [Axios 1.11.0](https://axios-http.com/) – Cliente HTTP para comunicação com a API.  
- [TypeScript 5.8.3](https://www.typescriptlang.org/) – Tipagem estática e mais segurança no código.  
- [React Native Screens & Safe Area Context](https://reactnative.dev/docs/safeareaview) – Melhor performance em navegação e suporte a telas seguras.
---

## 📂 Estrutura do Projeto
Estruturou-se esta aplicação BACK-END, com base no DDD. Assim dividiu-se a organização das partes desta, da seguinte forma:
```bash
├── src

│   ├── api               # Comunicação com API (Axios)

│   ├── assets                 # Imagens, fontes, ícones

│   ├── components             # Componentes reutilizáveis (Botões, Cards, Inputs)

│   │   ├── modais             # Componentes modais que funcionam como alert

│   ├── screens                # Telas da aplicação (GamePlay, Home, Settings)

│   ├── contexts               # Contextos

│   ├── dto                    # Objetos de transferencia

│   ├── enums                    # Enumeradores

│   ├── models                    # Models referente as entidades

│   ├── routes             # Configuração das rotas e stacks

│   ├── styles                  # Folhas de estilização

│   ├── types                  # Armazena objetos como props e etc.

│   └── App.tsx                # Arquivo principal do aplicativo

├── package.json

├── tsconfig.json

└── app.json                   # Configurações do Expo

---

## ⚙️ Configuração do Ambiente

1️⃣ Pré-requisitos
- Node.js LTS

- Expo CLI (npm install -g expo-cli)

- Emulador Android/iOS ou dispositivo físico


2️⃣ Variáveis de Ambiente
O Arquivo .env foi postado no repositório aqui para melhor finalidade de testes, mais segue aqui também as variaveis de teste

EXPO_PUBLIC_API_URL="http://localhost:5180"

▶️ Executando a Aplicação

Em seguida se for a primeira execução apos o clone:
npm install

# Abrir no Web
npm run web

# Ou abrir no Web
npm run web

# Abrir no Android
npm run android

Após isso o APP deve estar rodando.




