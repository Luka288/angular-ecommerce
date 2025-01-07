import { CommonModule } from '@angular/common';
import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { PanelMenuModule } from 'primeng/panelmenu';
import { BrandsService } from '../../services/brands.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-panel-menu',
  imports: [PanelMenuModule, CommonModule],
  templateUrl: './panel-menu.component.html',
  styleUrl: './panel-menu.component.scss',
})
export class PanelMenuComponent {
  @Input() panelInfo: MenuItem[] = [];
}
