import fetch from "node-fetch";
import { promises as fsp } from "fs";
import path from "path";
import { nanoid } from "nanoid";
import { ImageProvider } from "./ImageProvider";

export class ThumbnailGenerator implements ImageProvider {
  constructor(private imageUrl: string) {}

  public async loadCoverImage(): Promise<string | undefined> {
    const fetchUrl = `https://api.screenshotmachine.com/?key=c4d692&url=${this.imageUrl}&dimension=1024x768`;
    const response = await fetch(fetchUrl);
    const buffer = await response.buffer();
    const imgName = `${nanoid()}.jpeg`;
    const imageLocation: string = path.join(__dirname, "..", "public", imgName);
    try {
      await fsp.writeFile(imageLocation, buffer);
      return `/${imgName}`;
    } catch (error) {
      console.log(error);
    }
  }
}
