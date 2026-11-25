import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';

// tienda
import { PanelLayoutComponent } from './layouts/panel-layout/panel-layout.component';
import { ResumenComponent } from './pages/panel/resumen/resumen.component';
import { OfertasComponent } from './pages/panel/ofertas/ofertas.component';
import { OfertaFormComponent } from './pages/panel/oferta-form/oferta-form.component';
import { ReservasComponent } from './pages/panel/reservas/reservas.component';
import { RecogidaComponent } from './pages/panel/recogida/recogida.component';
import { DatosTiendaComponent } from './pages/panel/datos-tienda/datos-tienda.component';

// publico
import { PublicLayoutComponent } from './layouts/public-layout/public-layout.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { TiendasComponent } from './pages/publica/tiendas/tiendas.component';
import { TiendaDetailComponent } from './pages/publica/tienda-detail/tienda-detail.component';
import { CatalogoComponent } from './pages/publica/catalogo/catalogo.component';
import { CardDetailComponent } from './pages/card-detail/card-detail.component';

export const routes: Routes = [

    { path: 'login', component: LoginComponent, title: 'Acceso para tiendas · Mintly' },

  {
    path: 'panel',
    component: PanelLayoutComponent,
    children: [
      { path: '', redirectTo: 'resumen', pathMatch: 'full' },
      { path: 'resumen', component: ResumenComponent, title: 'Resumen · Panel de tienda' },
      { path: 'ofertas', component: OfertasComponent, title: 'Mis ofertas · Panel de tienda' },
      { path: 'ofertas/nueva', component: OfertaFormComponent, title: 'Nueva oferta · Panel de tienda' },
      { path: 'ofertas/:id/editar', component: OfertaFormComponent, title: 'Editar oferta · Panel de tienda' },
      { path: 'reservas', component: ReservasComponent, title: 'Reservas · Panel de tienda' },
      { path: 'recogida', component: RecogidaComponent, title: 'Confirmar recogida · Panel de tienda' },
      { path: 'tienda', component: DatosTiendaComponent, title: 'Datos de la tienda · Panel de tienda' },
    ],
  },

  {
    path: '',
    component: PublicLayoutComponent,
    children: [
      { path: '', component: InicioComponent, title: 'Mintly' },
      { path: 'tiendas', component: TiendasComponent, title: 'Tiendas · Mintly' },
      { path: 'tiendas/:id', component: TiendaDetailComponent, title: 'Tienda · Mintly' },
      { path: 'catalogo', component: CatalogoComponent, title: 'Catálogo · Mintly' },
      { path: 'cards/:id', component: CardDetailComponent, title: 'Carta · Mintly' },
    ],
  },

  { path: '**', redirectTo: '' },
];
