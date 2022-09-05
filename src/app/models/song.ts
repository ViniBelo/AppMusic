export class Song {
    private _id: any
    private _nome: string
    private _artist: string
    private _album: string
    private _launchDate: string

    constructor(nome: string, artist: string, album: string, launchDate: string){
        let chave = new Date
        this._id = chave.getTime()
        this._nome = nome
        this._artist = artist
        this._album = album
        this._launchDate = launchDate
    }

    public get id() {
        return this._id
    }

    public get nome() {
        return this._nome
    }

    public get artist() {
        return this._artist
    }

    public get album() {
        return this._album
    }

    public get launchDate() {
        return this._launchDate
    }

    public set nome(nome: string) {
        this._nome = nome
    }

    public set artist(artist: string) {
        this._artist = artist
    }

    public set album(album: string) {
        this._album = album
    }

    public set launchDate(launchDate: string) {
        this._launchDate = launchDate
    }
}
