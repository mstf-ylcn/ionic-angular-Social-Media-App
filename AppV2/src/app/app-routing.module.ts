import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'photos',
    loadChildren: () => import('./pages/photos/photos.module').then( m => m.PhotosPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.module').then( m => m.SearchPageModule)
  },

  {
    path: 'sign-up',
    loadChildren: () => import('./pages/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
  {
    path: 'fullModal',
    loadChildren: () => import('./pages/full-modal-photos/full-modal-photos.module').then( m => m.FullModalPhotosPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./pages/tabs/tabs.module').then( m => m.TabsPageModule)
  },
  {
    path: 'modal-search',
    loadChildren: () => import('./pages/modal-search/modal-search.module').then( m => m.ModalSearchPageModule)
  },
  {
    path: 'modal-profile',
    loadChildren: () => import('./pages/modal-profile/modal-profile.module').then( m => m.ModalProfilePageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: 'camera-modal',
    loadChildren: () => import('./pages/camera-modal/camera-modal.module').then( m => m.CameraModalPageModule)
  }
];

@NgModule({
  imports: [FormsModule,ReactiveFormsModule,
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
