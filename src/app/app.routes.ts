import { Routes } from '@angular/router';
import { Home } from './home/home';
import { LandingPage } from './landing-page/landing-page';
import { Produto } from './produto/produto';
import { Register } from './register/register';

export const routes: Routes = [
	{ path: '', component: LandingPage, pathMatch: 'full' },
	{ path: 'home', component: Home },
	{ path: 'login', loadComponent: () => import('./login/login').then((component) => component.Login) },
	{ path: 'register', component: Register },
	{ path: 'produtos', component: Produto },
	{ path: '**', redirectTo: '' },
];
