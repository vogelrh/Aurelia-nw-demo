/**
 * Created by accou on 8/7/2015.
 */
import {inject} from 'aurelia-framework';
import {FileService} from './services/files-service';

@inject(FileService)
export class Files{

  constructor (fileService) {
    this.fileService = fileService;
    this.curDir = fileService.getHomeFolder();
    this.files = [];
  }

  activate() {
    this.fileService.getFilesInFolder(this.curDir).then(files => {
      this.files = files;
      console.log(this.files.length);
    }, err => console.log(err));
  }

  itemClicked(item) {
    if (item) {
      if (item.isDirectory) {
        this.files = [];
        this.curDir = item.path;
        this.fileService.getFilesInFolder(this.curDir).then(files => {
          this.files = files;
          console.log(this.files.length);
        }, err => console.log(err));
      }
    }
  }
}
