import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:[
      {
        path: 'photos',
        loadChildren: () => import('../photos/photos.module').then( m => m.PhotosPageModule)
      },
      {
        path: 'search',
        loadChildren: () => import('../search/search.module').then( m => m.SearchPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('../profile/profile.module').then( m => m.ProfilePageModule)
      }
      ,
      {
        path: 'fullModal',
        loadChildren: () => import('../full-modal-photos/full-modal-photos.module').then( m => m.FullModalPhotosPageModule)
      },
      {
        path: 'searchModal',
        loadChildren: () => import('../modal-search/modal-search.module').then( m => m.ModalSearchPageModule)
      }
      ,
      {
        path: 'profileModal',
        loadChildren: () => import('../modal-profile/modal-profile.module').then( m => m.ModalProfilePageModule)
      }
      ,
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then( m => m.SettingsPageModule)
      }
    ]
  },
  {
    path:'',
    redirectTo: '/tabs/photos',
    pathMatch:'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
