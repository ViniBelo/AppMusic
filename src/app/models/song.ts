export class Song {
    private _id: string
    private _name: string
    private _music: string
    private _compositor : string
    private _produtora : string
    private _album: string
    private _genero : string
    private _dataLanc: string
    private _downloadURL: any

    constructor(name: string, music: string, compositor : string, produtora : string, album: string, genre : string, dataLanc: string){
        this._name = name
        this._music = music
        this._compositor = compositor
        this._produtora = produtora
        this._album = album
        this._genero = genre
        this._dataLanc = dataLanc
    }

    public get id() : string {
        return this._id
    }

    public get name() {
        return this._name
    }

    public get music() {
        return this._music
    }

    public get compositor() {
        return this._compositor
    }

    public get produtora() {
        return this._produtora
    }

    public get album() {
        return this._album
    }

    public get genero() {
        return this._genero
    }

    public get dataLanc() {
        return this._dataLanc
    }

    public get downloadURL() {
        return this._downloadURL
    }

    public set name(name: string) {
        this._name = name
    }

    public set music(music: string) {
        this._music = music
    }

    public set compositor(compositor : string) {
        this._compositor = compositor
    }

    public set produtora(produtora : string) {
        this._produtora = produtora
    }

    public set album(album: string) {
        this._album = album
    }

    public set genero(genero : string) {
        this._genero = genero
    }

    public set dataLanc(dataLanc: string) {
        this._dataLanc = dataLanc
    }

    public set downloadURL(downloadURL: any) {
        this._downloadURL = downloadURL
    }
}
