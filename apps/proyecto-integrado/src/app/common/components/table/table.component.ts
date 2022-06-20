import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  template: '',
})
export abstract class TableComponent<T> implements AfterViewInit {
  @Input() data!: Observable<T[]>;
  @Output() deleteEvent = new EventEmitter<string | number>();
  @Output() updateEvent = new EventEmitter<T>();
  @Output() viewEvent = new EventEmitter<T>();
  displayedColumns: string[];
  dataSource = new MatTableDataSource<T>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  protected constructor(@Inject(Array) cols: Array<string>) {
    this.displayedColumns = cols;
  }

  ngAfterViewInit() {
    this.data.subscribe((data: T[]) => {
      this.dataSource = new MatTableDataSource<T>(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  delete(id: string | number): void {
    this.deleteEvent.emit(id);
  }

  update(data: T): void {
    this.updateEvent.emit(data);
  }

  view(data: T): void {
    this.viewEvent.emit(data);
  }
}
