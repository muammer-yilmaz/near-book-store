// assembly/index.ts

import { Context } from "near-sdk-as";

import { toYocto } from "./utils"

import { Book, Comment, Episode } from "./model";

// create a book on blockchain !!book's price must be set with near not Yocto
export function createBook(name: string, desc: string, price: u8): Book {
  return Book.createBook(Context.sender, name, desc, toYocto(price));
}

export function buyBook(id: u32,): void {
  Book.buyBook(id);
}
// get all the books on blockchain data
export function getBooks(start: u32, limit: u32): Book[] {
  return Book.findBooks(start, limit);
}
// get the book with its id
export function getBook(id: u32): Book {
  return Book.findBookById(id);
}
// get the owners of a book
export function getOwners(id: u32): Array<string> {
  return Book.getBookOwners(id);
}
// add a comment about the book
export function addComment(id: u32, comment: string): Comment {
  return Book.addComment(id, comment);
}
// get the all comments about a book
export function getComments(id: u32): Array<Comment> {
  return Book.getComments(id);
}
// set the book's img link !Only Owner
export function setImg(id: u32, link: string): string {
  return Book.setImg(id, link);
}
// add episode to a book !Only Owner
export function addEpisode(id: u32, text: string): Episode {
  return Book.addEpisode(id, text);
}
// get all episodes of a book !Only Book Owner
export function getEpisodes(id: u32): Array<Episode> {
  let eps = Book.getEpisodes(id);
  let array = new Array<Episode>()
  for (let i = 0; i < eps.length; i++) {
    array.push(eps[i]);
  }
  return array;
}

