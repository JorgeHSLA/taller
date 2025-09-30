import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioPosts } from './usuario-posts';

describe('UsuarioPosts', () => {
  let component: UsuarioPosts;
  let fixture: ComponentFixture<UsuarioPosts>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioPosts]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioPosts);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
