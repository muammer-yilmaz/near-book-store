// assembly/model.ts
import {
    PersistentUnorderedMap, math,
    Context,
    PersistentVector,
} from "near-sdk-as";

import { AccountId, Money, Timestamp } from "./utils";

//stores created books on blockchain data
export const books = new PersistentUnorderedMap<u32, Book>("books");
//stores each book with its owners
export const bookOwners = new PersistentUnorderedMap<u32, Array<AccountId>>("access");

@nearBindgen
export class Book {
    id: u32
    owner: AccountId = Context.sender
    name: string
    desc: string
    img: string
    price: Money
    episodeList: PersistentVector<Episode> = new PersistentVector<Episode>("episodes")
    comments: PersistentVector<Comment> = new PersistentVector<Comment>("comments")

    constructor(owner: AccountId, name: string, desc: string, price: Money) {
        this.id = math.hash32<string>(name);
        this.owner = owner;
        this.name = name;
        this.desc = desc;
        this.price = price
    }

    static createBook(owner: AccountId, name: string, desc: string, price: Money): Book {
        const book = new Book(owner, name, desc, price);
        books.set(book.id, book);
        return book;
    }

    static buyBook(id: u32): void {
        this.assert_amount(id)
        let list: Array<AccountId>
        if (bookOwners.contains(id)) {
            list = bookOwners.getSome(id);
            list.push(Context.sender);
            bookOwners.set(id, list);
        }
        else {
            let list = new Array<AccountId>();
            list.push(Context.sender);
            bookOwners.set(id, list);
        }
    }

    static addComment(id: u32, text: string): Comment {
        this.assert_access(id, Context.sender);
        let book = this.findBookById(id);
        let comment = new Comment(text);
        book.comments.push(comment)
        return comment;
    }

    static setImg(id: u32, link: string): string {
        let book = this.findBookById(id);
        this.assert_owner(book, Context.sender);
        book.img = link;
        books.set(book.id, book);
        return book.img
    }

    static getBookOwners(id: u32): Array<string> {
        let list = bookOwners.getSome(id);
        return list;
    }

    static getComments(id: u32): Array<Comment> {
        let book = this.findBookById(id);
        let comments = new Array<Comment>();
        for (let i = 0; i < book.comments.length; i++) {
            comments.push(book.comments[i]);
        }
        return comments;
    }

    static addEpisode(id: u32, text: string): Episode {
        const book = this.findBookById(id)
        this.assert_owner(book, Context.sender);
        const episode = new Episode(text);
        book.episodeList.push(episode);

        return episode;
    }

    static getEpisodes(id: u32): PersistentVector<Episode> {
        this.assert_access(id, Context.sender);
        const book = this.findBookById(id);
        return book.episodeList;
    }

    static findBookById(id: u32): Book {
        return books.getSome(id);
    }

    static findBooks(offset: u32, limit: u32 = 10): Book[] {
        return books.values(offset, limit + offset);
    }

    // Is Caller The Owner ?
    static assert_owner(book: Book, caller: AccountId): void {
        assert(book.owner == caller, 'Only owner can call this function !!');
    }
    // Caller needs to be owner of the book
    static assert_access(id: u32, caller: AccountId): void {
        let list = bookOwners.getSome(id);
        assert(list.indexOf(caller) != -1, "Only book owner can call this function !!");
    }
    // Book price must be lower or equal than deposited money
    static assert_amount(id: u32): void {
        let book = this.findBookById(id);
        assert(book.price <= Context.attachedDeposit, "Not enough money attached !!")
    }
}


@nearBindgen
export class Episode {
    content: string
    constructor(text: string) {
        this.content = text
    }
}

@nearBindgen
export class Comment {
    created_at: Timestamp = Context.blockTimestamp;
    author: AccountId = Context.predecessor;
    comment: string
    constructor(text: string) {
        this.comment = text
    }
}