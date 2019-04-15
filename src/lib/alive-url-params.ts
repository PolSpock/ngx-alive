export class AliveUrlParams {
    url: string;
    libelle: string;
    description: string;
    priority: number;

    constructor(url: string, libelle: string, description: string, priority: number) {
      this.url = url;
      this.libelle = libelle;
      this.description = description;
      this.priority = priority;
    }
}
