import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationSideBarComponent } from './notification-side-bar.component';

describe('NotificationSideBarComponent', () => {
  let component: NotificationSideBarComponent;
  let fixture: ComponentFixture<NotificationSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
