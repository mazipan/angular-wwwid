export class Article {
  constructor(
    public title: string,
    public slug: string,
    public auhtor: string,
    public pubDate: string,
    public compressedImg: string,
    public thumbnail: string,
    public content: string,
    public contentView: string,
    public categories: Array<string>
  ) { }
}
