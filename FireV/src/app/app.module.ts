import { UploadVideoEffect } from './effects/uploadVideo.effect';
import { UploadImageEffect } from './effects/uploadImage.effect';
import { uploadImage } from './actions/uploadImage.action';
import { ShareModule } from 'src/app/modules/share/share.module';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics, getAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './reducers/auth.reducer';
import { AuthEffects } from './effects/auth.effect';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { uploadImageReducer } from './reducers/uploadImage.reducer';
import { uploadVideoReducer } from './reducers/uploadVideo.reducer';
import { AuthState } from './states/auth.state';
import * as AuthActions from '../app/actions/auth.action';
import { videoReducer } from './reducers/video.reducer';
import { VideoEffect } from './effects/video.effect';
import { SnackBarComponent } from './pages/components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideMessaging(() => getMessaging()),
    provideStorage(() => getStorage()),
    ShareModule,
    StoreModule.forRoot({
      auth: authReducer,
      uploadImage: uploadImageReducer,
      uploadVideo: uploadVideoReducer,
      video: videoReducer
    }, {}),
    EffectsModule.forRoot([
      AuthEffects,
      UploadImageEffect,
      UploadVideoEffect,
      VideoEffect
    ]),
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    ScreenTrackingService, UserTrackingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private store: Store<{ auth: AuthState }>) {
    this.store.dispatch(AuthActions.getIdToken());
  }
}
