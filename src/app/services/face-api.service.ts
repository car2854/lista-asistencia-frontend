import { EventEmitter, Injectable } from '@angular/core';

import * as faceapi from 'face-api.js';

@Injectable({
  providedIn: 'root'
})
export class FaceApiService {

  public globalFace:any;

  private modelosForLoad = [
    faceapi.nets.ssdMobilenetv1.loadFromUri('/assets/models'),
    faceapi.nets.tinyFaceDetector.loadFromUri('/assets/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/assets/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/assets/models'),
    // faceapi.nets.faceExpressionNet.loadFromUri('/assets/models')
  ]

  cbModels: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
    this.globalFace = faceapi;
    this.loadModels();
  }

  public loadModels = () => {
    Promise.all(this.modelosForLoad).then((resp) => {
      console.log('Modelos cargados');
      this.cbModels.emit(true);
    })
  }
}
