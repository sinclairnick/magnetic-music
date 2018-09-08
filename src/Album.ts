const path = require('path');

export class Song {
  constructor(
    public fileName: string,
    public torrentIndex: number,
    public format: string,
    public link: string,
    public length: number
  ) {
  }

}

export default class Album {
  constructor(
    public linkName: string,
    public link: string,
    public health: number,
    public songs: Song[],
    public covers: any[],
    public size: string
  ) {
  }
  seeds?: number;
  artist?: string;
  year?: number;
  metadata = false;

  static newSong = (fileName: string, torrentIndex: number, link: string, length: number) => {

    const format = path.extname(fileName);

    return new Song(
      fileName.replace(format, ''),
      torrentIndex,
      format,
      link,
      length
    );
  }
}