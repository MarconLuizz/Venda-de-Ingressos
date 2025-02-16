

# Projeto 2 Programação Web Back-end: Sistema de Ingressos

O **Sistema de Venda de Ingressos** é uma aplicação destinada à gestão da comercialização de ingressos para eventos. Através de uma API RESTful e uma interface web, o sistema permite o cadastro de usuários, administração de ingressos e controle das compras realizadas, garantindo o gerenciamento de estoque em tempo real.

## Funcionalidades

### API REST

- **Gerenciamento de Usuários**: 
  - Cadastro e autenticação de usuários.
  
- **Gestão de Tipos de Ingressos**: 
  - CRUD completo para tipos de ingressos (nome, preço e quantidade disponível).

- **Venda de Ingressos**: 
  - Usuários logados podem comprar ingressos de diferentes tipos.
  - O estoque de ingressos é atualizado automaticamente.

### Interface Web

- **Login**: 
  - Interface de login com autenticação via token.

- **Histórico de Compras**: 
  - Exibição dos ingressos adquiridos pelo usuário.

- **Visualização de Ingresso**: 
  - Visualização detalhada de ingressos adquiridos.

## Regras de Negócio

- **Estoque**: 
  - Não é possível realizar compras se a quantidade solicitada exceder o estoque disponível.
  
- **Validação de Usuários**: 
  - Apenas usuários autenticados podem realizar compras.

- **Autonomia Administrativa**: 
  - Apenas administradores podem criar ou editar tipos de ingressos.

- **Segurança**: 
  - Controle adequado de permissões para garantir que usuários não visualizem ingressos que não são seus.

## Tecnologias Utilizadas
- Back-end: JavaScript e Node.js 
- Front-end: Mustache
- Banco de Dados: SQLite
  
