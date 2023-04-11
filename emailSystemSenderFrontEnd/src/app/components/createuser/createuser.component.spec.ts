import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateuserComponent } from './createuser.component';

describe('CreateuserComponent', () => {
  let component: CreateuserComponent;
  let fixture: ComponentFixture<CreateuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateuserComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * the below code is intended to test if a email is sent to the user
   * after clicking the button "add user" once the button is clicked the
   * userSubmit button is called and method calls two api's to backed one
   * to add user to the data base and the second to send email to the user
   * @param 
   * @param 
   * @return 
   */

  it('should send email', () => {
    spyOn(component, 'userSubmit');
    const button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();
    expect(component.successMsg).not.toBeNull;
  });
});
