import { Component, OnInit, inject } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { CommonModule } from '@angular/common';
import { TitleComponent } from '../../partials/title/title.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-order-track-page',
  standalone: true,
  imports: [
    CommonModule,
    TitleComponent,
    OrderItemsListComponent,
    MapComponent
  ],
  templateUrl: './order-track-page.component.html',
  styleUrl: './order-track-page.component.css'
})
export class OrderTrackPageComponent implements OnInit {
  order!: Order;
  private activatedRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);

  ngOnInit(): void {
    const params = this.activatedRoute.snapshot.params;
     if(!params['orderId']) return;

     this.orderService.trackOrderById(params['orderId']).subscribe(order => {
       this.order = order;
     });
  }
}
