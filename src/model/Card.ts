import { ImageProvider } from "./ImageProvider";

export class Card {
  private _coverImage: string | undefined;

  constructor(
    private _cardTitle: string,
    private _cardDescription: string,
    private _cardUrl: string,
    private imageProvider?: ImageProvider
  ) {}

  get cardTitle() {
    return this._cardTitle;
  }
  get cardDescription() {
    return this._cardDescription;
  }
  get cardUrl() {
    return this._cardUrl;
  }

  get coverImage() {
    return this._coverImage;
  }

  async initializeCoverImage(): Promise<void> {
    try {
      let cover = await this.imageProvider?.loadCoverImage();
      this._coverImage = cover;
    } catch (e) {
      console.log(e);
    }
  }
}
