# near-book-store

This project is a simple bookstore on Near blockchain. Users can publish their book and buy others books, and review a book by writing comments about it.

## Installation

```bash
git clone https://github.com//muammer-yilmaz/near-book-store
cd near-book-store
yarn
```

## How to Use Charity Smart Contract

First login to your account using near cli

```bash
near login
```

Build and deploy the smart contract.

```bash
yarn dev
```

Export the development account to the $CONTRACT

```bash
export CONTRACT=YOUR_DEV_ACCOUNT_HERE
```

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
near call $CONTRACT buyBook '{"id": "Book id"}' --accountId muammer-yilmaz.testnet --deposit 5
```

Read a Book

```bash
near call $CONTRACT getEpisodes '{"id": "Book id"}' --accountId muammer-yilmaz.testnet
```

Add a episode to your book

```bash
near call $CONTRACT addEpisode '{"id": "Book id", "text": "Episode Content"}' --accountId muammer-yilmaz.testnet
```

Add a comment to a book

```bash
near call $CONTRACT addComment '{"id": "Book id", "comment": "Your Comment"}' --accountId muammer-yilmaz.testnet
```

Get all comment of a book

```bash
near call $CONTRACT getComments '{"id": "Book id"}' --accountId muammer-yilmaz.testnet
```
