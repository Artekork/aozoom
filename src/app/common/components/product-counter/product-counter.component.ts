import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-product-counter',
  standalone: true,
  imports: [],
  templateUrl: './product-counter.component.html',
  styleUrl: './product-counter.component.scss'
})
export class ProductCounterComponent {
  @Input() minValue: number = 0; // Минимальное значение счётчика
  @Input() maxValue: number = 100; // Максимальное значение счётчика
  @Input() initialValue: number = 1; // Начальное значение счётчика

  @Output() valueChange = new EventEmitter<number>(); // Событие изменения значения

  value: number = 0;

  ngOnInit(): void {
    this.value = this.initialValue; // Устанавливаем начальное значение
  }

  increase(): void {
    if (this.value < this.maxValue) {
      this.value++;
      this.emitValueChange();
    }
  }

  decrease(): void {
    if (this.value > this.minValue) {
      this.value--;
      this.emitValueChange();
    }
  }

  onInputChange(event: any): void {
    let newValue = Math.round(event.target.value) || this.minValue;
    if (newValue >= this.maxValue) newValue = this.maxValue;
    if (newValue <= this.minValue) newValue = this.minValue;
    this.value = newValue;

    event.target.value = this.value;

    this.emitValueChange();
  }


  private emitValueChange(): void {
    this.valueChange.emit(this.value);
  }
}
