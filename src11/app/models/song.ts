export class Song {
    private _id: any
    private _name: string
    private _music: string
    private _album: string
    private _genero : string;
    private _dataLanc: string

    constructor(name: string, music: string, album: string, genre : string, dataLanc: string){
        let chave = new Date
        this._id = chave.getTime()
        this._name = name;
        this._music = music;
        this._album = album;
        this._genero = genre;
        this._dataLanc = dataLanc;
    }

    public get id() {
        return this._id;
    }

    public get name() {
        return this._name;
    }

    public get music() {
        return this._music;
    }

    public get album() {
        return this._album;
    }

    public get genero() {
        return this._genero;
    }

    public get dataLanc() {
        return this._dataLanc;
    }

    public set name(name: string) {
        this._name = name;
    }

    public set music(music: string) {
        this._music = music;
    }

    public set album(album: string) {
        this._album = album;
    }

    public set genero(genero : string){
        this._genero = genero;
    }

    public set dataLanc(dataLanc: string) {
        this._dataLanc = dataLanc;
    }
}
