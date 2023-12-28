import { Component, OnInit, inject } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean;
  private loadingService = inject(LoadingService);

  ngOnInit(): void {
    this.loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    
  }

}
