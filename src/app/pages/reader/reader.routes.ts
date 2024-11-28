import { Routes } from '@angular/router';

import { ReaderLayoutComponent } from './reader-layout/reader-layout.component';
import { UpdateProfileComponent } from '../../shared/components/update-profile/update-profile.component';
import { UserProfileComponent } from '../../shared/components/user-profile/user-profile.component';

import { CollectionComponent } from './collection/collection.component';
import { PurchasesComponent } from './purchases/purchases.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './catalog/details/details.component';

export const readerRoutes: Routes = [
    {
        path: '',
        component: ReaderLayoutComponent,
        children: [
            { path: 'catalog', component: CatalogComponent },
            { path: 'catalog/details/:id', component: DetailsComponent },
            { path: 'favorite', component: CollectionComponent },
            { path: 'profile', component: UserProfileComponent },
            { path: 'profile/update', component: UpdateProfileComponent },
        ]

    }
]