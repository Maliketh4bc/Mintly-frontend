import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';

@Component({
  selector: 'app-panel-layout',
  imports: [RouterOutlet, RouterLink, SidebarComponent],
  templateUrl: './panel-layout.component.html',
  styleUrl: './panel-layout.component.css'
})
export class PanelLayoutComponent {

}
