import { FileUploadService } from './../../../services/file-upload.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UploadImageState } from 'src/app/states/uploadImage.state';
import * as UploadImageActions from 'src/app/actions/uploadImage.action';
import * as UploadVideoActions from 'src/app/actions/uploadVideo.action';
import { UploadVideoState } from 'src/app/states/uploadVideo.state';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VideoState } from 'src/app/states/video.state';
import * as VideoActions from 'src/app/actions/video.action';
import { AuthState } from 'src/app/states/auth.state';
import { Video } from 'src/app/models/video.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { generateVideoThumbnails } from '@rajesh896/video-thumbnails-generator';
@Component({
  selector: 'app-add-video',
  templateUrl: './add-video.component.html',
  styleUrls: ['./add-video.component.scss'],
})
export class AddVideoComponent implements OnInit {

  
  isEmpty: boolean = false;

  isvideoInfoCreate$ = this.store.select((state) => state.video);

  videoFiles: File[] = [];
  imageFiles: File[] = [];
  testImageFiles: string[] = [];


  // videoUrl$ = this.store.select((state) => state.uploadVideo.filepath);
  imageUrl$ = this.store.select((state) => state.uploadImage);

  idToken$ = this.store.select((state) => state.auth.idToken);
  token: string = "";
  videoUploadForm !: FormGroup;
  showSpinner = false;
  // rejectedFiles: RejectedFile[] = [];

  constructor(
    private _snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private store: Store<{
      uploadImage: UploadImageState,
      uploadVideo: UploadVideoState,
      video: VideoState,
      auth: AuthState
    }>,
  ) {
    this.idToken$.subscribe((token) => {
      this.token = token;
      // console.log(this.token);
    })
  }

  ngOnInit(): void {
    this.videoUploadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      hashtags: [''],
    });

    this.isvideoInfoCreate$.subscribe(value => {
      if (value.isSuccess == true) {
        this.store.dispatch(UploadVideoActions.uploadVideos({ idToken: this.token, files: this.videoFiles[0] , video_id: value.videoLoad._id}))
        this.showSpinner = false;
        this._snackBar.open("Upload is processing,", "close", {
          duration: 3000,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        this.resetForm();
      }
    })

    this.imageUrl$.subscribe(value => {
      if(value.isSuccess == true){
        let thumbUrl = value.filepath;
        let hashtags = [];
        // let videoPath = value;
        // videoFormData.append('video', this.videoFiles[0]);
        // let videoPath = await this.httpService.addVideo(this.token, videoFormData);
        // thumbFormData.append('thumbnail', this.imageFiles[0]);
        // let imagePath = await this.httpService.addThumb(this.token, thumbFormData);
  
        let form = this.videoUploadForm.value;
        let description = form.description.replace(/\n/g, "<br>");
        // console.log(description);
  
        if (form.hashtags) {
          // console.log(form.hashtags);
          hashtags = form.hashtags.trim();
          hashtags = hashtags.split(" ");
          // console.log(hashtags);
        }
  
        let newForm : Video = {
          ...form,
          description: description,
          // url: videoPath,
          image_url: thumbUrl,
          hashtags: hashtags,
          isHidden: true,
        }
  
        // console.log(newForm);
        // let video = await this.httpService.createVideoInfo(this.token, newForm);
        // console.log(video);\
        this.store.dispatch(VideoActions.createVideo({ idToken: this.token, video: newForm }));
      }
    })
  }



  resetForm() {
    this.videoUploadForm.reset(this.videoUploadForm);
    this.videoFiles.length = 0;
    this.imageFiles.length = 0;
    this.testImageFiles.length = 0;
  }

  async add() {
    // const videoFormData: FormData = new FormData();
    // const thumbFormData: FormData = new FormData();
    if (this.videoFiles[0] && this.imageFiles[0]) {
      this.showSpinner = true;
      this.store.dispatch(UploadImageActions.uploadImage({ files :  this.imageFiles[0]}));
    } else {
      alert('Files are emptied');
      return
    }
  }

  onVideoSelect(event: { addedFiles: any; rejectedFiles: any }) {
    // console.log(event);
    this.isEmpty = true;
    if (event.addedFiles.length > 0) {
      if (this.videoFiles.length > 0) {
        this.videoFiles.shift();
        // console.log(this.videoFiles);
      }
      this.videoFiles.push(...event.addedFiles);
      this.convertThumb();
      console.log(this.videoFiles);
    } else {
      // this.rejectedFiles.push(...event.rejectedFiles);
      // console.log(this.rejectedFiles);
      alert(`Your uploading file is reject due to: ${event.rejectedFiles[0].reason}`);
    }
  }

  onVideoRemove(event: File) {
    console.log(event);
    this.testImageFiles.length = 0;
    this.videoFiles.splice(this.videoFiles.indexOf(event), 1);
  }

  onImageSelect(event: { addedFiles: any; rejectedFiles: any }) {
    // console.log(event);
    if (event.addedFiles.length > 0) {
      if (this.imageFiles.length > 0) {
        this.imageFiles.shift();
        console.log(this.imageFiles);
      }
      this.imageFiles.push(...event.addedFiles);
      console.log(this.imageFiles);
    } else {
      // this.rejectedFiles.push(...event.rejectedFiles);
      // console.log(this.rejectedFiles);
      alert(`Your uploading file is reject due to: ${event.rejectedFiles[0].reason}`);
    }
  }

  onImageRemove(event: File) {
    console.log(event);
    this.imageFiles.splice(this.imageFiles.indexOf(event), 1);
  }

  convertThumb() {
    let videoFile = this.videoFiles[0];
    this.isEmpty = true;
    generateVideoThumbnails(videoFile, 2, 'jpg').then((thumbnailArray: string[]) => {
      // output will be arry of base64 Images
      // example - ["img1", "imgN"]

      // let convertedFiles = thumbnailArray.map((fileBase64, index) => {
      //   let fileType = fileBase64.substring(
      //     fileBase64.indexOf(":") + 1,
      //     fileBase64.lastIndexOf(";")
      //   );
      //   console.log(fileType)
      //   let fileExtension = fileType.split('/');
      //   return new File([fileBase64], `thumb${index}.${fileExtension[1]}`, {type: fileType});
      // });
      // console.log(convertedFiles);
      // console.log(thumbnailArray);

      this.testImageFiles = thumbnailArray;
      this.isEmpty = false;
      return thumbnailArray;
      // @todo - implement your logic here
    }).catch((err: any) => {
      console.error(err);
    })

  }
}
