import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inventory } from '@inventory/models/inventory';

@Component({
  selector: 'app-add-inventory-form',
  templateUrl: './add-inventory-form.component.html',
  styleUrls: ['./add-inventory-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddInventoryFormComponent {
  @Input()
  public adding = false;

  @Output()
  public addInventory = new EventEmitter<Inventory>();

  public form: FormGroup = this.formBuilder.group({
    appId: ['', Validators.required],
    contextId: ['', Validators.required],
  });

  public appIdHintLink = 'https://steamdb.info/';

  constructor(private readonly formBuilder: FormBuilder) {}

  public submit(): void {
    if (this.form.valid) {
      const inventory: Inventory = { ...this.form.value };
      this.addInventory.emit(inventory);
    }
  }
}
