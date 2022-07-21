import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinTypeListComponent } from './coin-type-list.component';

describe('CoinTypeListComponent', () => {
  let component: CoinTypeListComponent;
  let fixture: ComponentFixture<CoinTypeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinTypeListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
