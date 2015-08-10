/**
 * Created by accou on 8/7/2015.
 */
import {inject} from 'aurelia-framework';
import {FileService} from './services/files-service';

@inject(FileService)
export class Files{

  constructor (fileService) {
    this.fileService = fileService;
    this.home = fileService.getHomeFolder();
  }

  activate() {
    this.fileService.getFilesInFolder(this.home).then(files => this.files = files, err => console.log(err));
  }

}
