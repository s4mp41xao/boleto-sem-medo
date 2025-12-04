# Arquitetura do Sistema Boleto Sem Medo

Este documento descreve a arquitetura do projeto "Boleto Sem Medo", detalhando os componentes do Frontend, Backend e suas interações com serviços externos.

## Diagrama de Arquitetura

```mermaid
graph TD
    %% Estilos
    classDef client fill:#e1f5fe,stroke:#01579b,stroke-width:2px;
    classDef server fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px;
    classDef database fill:#fff3e0,stroke:#ef6c00,stroke-width:2px;
    classDef external fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px;

    subgraph Client ["Frontend (Vite + React)"]
        direction TB
        App[App.tsx]
        ChatInterface[ChatInterface.tsx]
        
        App --> ChatInterface
    end
    class Client client

    subgraph Server ["Backend (NestJS)"]
        direction TB
        AppModule
        
        subgraph Modules
            ChatModule
            AiModule
            BoletoModule
            HistoryModule
            DatabaseModule
        end
        
        subgraph Services
            ChatService
            AiService
            BoletoService
            HistoryService
        end
        
        subgraph Controllers
            ChatController
            HistoryController
        end

        AppModule --> ChatModule
        AppModule --> AiModule
        AppModule --> BoletoModule
        AppModule --> HistoryModule
        AppModule --> DatabaseModule

        ChatModule --> ChatController
        ChatModule --> ChatService
        
        ChatService --> AiService
        ChatService --> BoletoService
        ChatService --> HistoryService
        
        HistoryModule --> HistoryController
        HistoryModule --> HistoryService
    end
    class Server server

    subgraph External ["Serviços Externos"]
        Gemini[Google Gemini 2.0 Flash API]
        BrasilAPI[BrasilAPI]
        MongoDB[(MongoDB Database)]
    end
    class External external

    %% Conexões
    ChatInterface -->|HTTP Requests| ChatController
    ChatInterface -->|HTTP Requests| HistoryController
    
    AiService -->|API Calls| Gemini
    BoletoService -->|API Calls| BrasilAPI
    
    HistoryService -->|Mongoose| MongoDB
    DatabaseModule -->|Connection| MongoDB
```

## Explicação dos Componentes

### 1. Frontend (Client)
O frontend é construído com **Vite**, **React** e **TypeScript**.
-   **Estilização**: Utiliza **TailwindCSS** e componentes da biblioteca **Radix UI**.
-   **Componente Principal**: `ChatInterface` é o componente central que gerencia a interação do usuário com o chat.
-   **Comunicação**: Realiza requisições HTTP para o backend (API NestJS) para enviar mensagens e buscar histórico.

### 2. Backend (Server)
O backend é uma aplicação **NestJS** modularizada.

#### Módulos Principais:
-   **AppModule**: O módulo raiz que orquestra todos os outros módulos.
-   **ChatModule**: Gerencia a lógica do chat.
    -   **ChatController**: Recebe as requisições do frontend.
    -   **ChatService**: Processa as mensagens, coordena chamadas para a IA e serviços de boleto.
-   **AiModule**: Encapsula a lógica de inteligência artificial.
    -   **AiService**: Comunica-se com a API do **Google Gemini 2.0 Flash** para processar texto e imagens.
-   **BoletoModule**: Contém a lógica de negócios específica para validação e leitura de boletos.
    -   **BoletoService**: Realiza validações e consulta dados de CNPJ e bancos via **BrasilAPI**.
-   **HistoryModule**: Gerencia o histórico de transações/conversas.
    -   **HistoryService**: Salva e recupera dados do banco de dados.
-   **DatabaseModule**: Configura a conexão com o banco de dados.

### 3. Serviços Externos
-   **MongoDB**: Banco de dados NoSQL utilizado para persistir o histórico de conversas e transações. A conexão é gerenciada via **Mongoose**.
-   **Google Gemini 2.0 Flash API**: Serviço de IA utilizado para interpretar o conteúdo dos boletos e gerar respostas para o usuário.
-   **BrasilAPI**: API pública utilizada para consultar dados de CNPJ e informações bancárias.

## Fluxo de Dados Típico
1.  O usuário envia uma mensagem ou imagem de boleto via `ChatInterface`.
2.  A requisição chega ao `ChatController` no backend.
3.  O `ChatService` processa a requisição:
    -   Usa o `AiService` para analisar o texto ou imagem (Gemini).
    -   Usa o `BoletoService` para validações específicas (BrasilAPI).
    -   Usa o `HistoryService` para salvar a interação.
4.  A resposta é devolvida ao frontend e exibida ao usuário.
