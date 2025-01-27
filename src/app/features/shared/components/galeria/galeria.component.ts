import { Component, Input } from '@angular/core';
import { responsiveOptions } from '../../consts/consts';
import { GalleriaModule } from 'primeng/galleria';
import { thumbnailInterface } from '../../interfaces/slider.interface';
import { imgUrls } from '../../consts/carouse.urls';

@Component({
  selector: 'app-galeria',
  imports: [GalleriaModule],
  templateUrl: './galeria.component.html',
  styleUrl: './galeria.component.scss',
})
export class GaleriaComponent {
  responsiveOptions = responsiveOptions;

  images: thumbnailInterface[] = imgUrls;
}
