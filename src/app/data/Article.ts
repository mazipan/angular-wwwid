export class Article {
  constructor(
    public title: string,
    public link: string,
    public slug: string,
    public author: string,
    public pubDate: string,
    public compressedImg: string,
    public thumbnail: string,
    public content: string,
    public contentView: string,
    public categories: Array<string>
  ) { }
}
