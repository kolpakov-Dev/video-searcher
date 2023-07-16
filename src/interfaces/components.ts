import { IRegData } from "./IRegData";
import { IVideo } from "./IVideo";

export interface IRegAuthForm {
  func: Function;
  changeUser: Function;
  authUserData: IRegData;
}
export interface IVideoList {
  search: string;
  count: string;
}
export interface IVideoItem {
  video: IVideo;
  updateF: string;
}
