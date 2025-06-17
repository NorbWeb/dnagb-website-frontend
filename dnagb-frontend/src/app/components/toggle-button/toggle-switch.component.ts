import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-toggle-switch',
  imports: [],
  templateUrl: './toggle-switch.component.html',
  styleUrl: './toggle-switch.component.css',
})
export class ToggleSwitchComponent {
  protected checked: boolean = false;
  readonly label = input<string>('Toggle');
  readonly id = input<string>('');
  readonly output = output<boolean>();
  readonly disabled = input<boolean>(false);

  onToggleChange(): void {
    this.checked = !this.checked;
    this.output.emit(this.checked);
  }
}
