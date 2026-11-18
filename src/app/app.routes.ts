import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { ColeccionComponent } from './pages/coleccion/coleccion.component';
import { TiendaComponent } from './pages/tienda/tienda.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';

export const routes: Routes = [
    { path: 'registro', component: RegistroComponent, title: 'Registro · Mintly' },
    { path: 'login', component: LoginComponent, title: 'Iniciar sesión · Mintly' },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
        { path: '', redirectTo: 'inicio', pathMatch: 'full' },
        { path: 'inicio', component: InicioComponent, title: 'Inicio · Mintly' },
        { path: 'coleccion', component: ColeccionComponent, title: 'Mi colección · Mintly' },
        { path: 'tienda', component: TiendaComponent, title: 'Tienda · Mintly' },
        { path: 'carrito', component:                                                          CarritoComponent, title: 'Carrito · Mintly' },
        { path: 'perfil', component: PerfilComponent, title: 'Perfil · Mintly' },
        { path: 'cards/:id', component: CardDetailComponent, title: 'Carta · Mintly' },
        ],
    },

    { path: '**', redirectTo: 'inicio' },
    ];
