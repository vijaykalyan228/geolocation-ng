import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from "@angular/router";

import {ParamsComponent} from './params/params.component';

const APP_ROUTES:Routes = [
    { path:'',component: ParamsComponent},
]

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);

export const appRoutingProviders: any[] = [];
