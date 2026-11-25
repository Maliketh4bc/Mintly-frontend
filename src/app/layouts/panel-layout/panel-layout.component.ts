import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { DesktopNoticeComponent } from '../../components/desktop-notice/desktop-notice.component';

@Component({
  selector: 'app-panel-layout',
  imports: [RouterOutlet, SidebarComponent, DesktopNoticeComponent],
  templateUrl: './panel-layout.component.html',
  styleUrl: './panel-layout.component.css'
})
export class PanelLayoutComponent {

}
