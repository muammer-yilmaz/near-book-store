# near-book-store

This project is a simple bookstore on Near blockchain. Users can publish their book and buy others books, and review a book by writing comments about it.

## Installation

>  Prerequisites: Make sure you've installed Node.js ≥ 12 and Yarn

```bash
git clone https://github.com/muammer-yilmaz/near-book-store
cd near-book-store
yarn
```

## How to Use Bookstore Smart Contract

First login to your account using near cli

```bash
near login
```

## Scripts

`near-book-store/scripts`

1. run `dev-deploy.sh` --> builds and deploys contract to blockchain
2. run any script to interact with contract 

## Commands

Build and deploy the smart contract.

```bash
yarn dev
```

Export the development account to the $CONTRACT

```bash
export CONTRACT=YOUR_DEV_ACCOUNT_HERE
```

---

Create a Book.

```bash
near call $CONTRACT createBook '{"name": "Book Name", "desc": "Book Description", "price" : 5}' --accountId muammer-yilmaz.testnet
```

List All Books

```bash
near call $CONTRACT getBooks '{"start": 0, "limit" : 10}' --accountId muammer-yilmaz.testnet
```

Buy a Book

```bash
near call $CONTRACT buyBook '{"id": Book id}' --accountId muammer-yilmaz.testnet --deposit 5
```

Read a Book

```bash
near call $CONTRACT getChapters '{"id": Book id}' --accountId muammer-yilmaz.testnet
```

Add a chapter to your book

```bash
near call $CONTRACT addChapter '{"id": Book id, "content": "Chapter Content"}' --accountId muammer-yilmaz.testnet
```

Add a comment to a book

```bash
near call $CONTRACT addComment '{"id": Book id, "comment": "Your Comment"}' --accountId muammer-yilmaz.testnet
```

Get all comment of a book

```bash
near call $CONTRACT getComments '{"id": Book id}' --accountId muammer-yilmaz.testnet
```

Project Structure
```
near-book-store
│   README.md
│   package.json
|   compile.js
|   ...
│
└───assembly 
│   │   index.ts
│   │   model.ts
|   |   utils.ts
│   │   ...
│   
│   
└───scripts  
    │ dev-deploy.sh
    │ create-book.sh
    │ add-chapter.sh
    │ add-comment.sh
    │ get-comments.sh
    │ list-books.sh
    │ read-book.sh

```