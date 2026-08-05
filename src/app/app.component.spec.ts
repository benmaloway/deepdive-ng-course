import { TestBed, waitForAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { CourseCardComponent } from './course-card/course-card.component';
import { CourseImageComponent } from './course-image/course-image.component';
describe('AppComponent', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CourseCardComponent,
        CourseImageComponent
      ],
    }).compileComponents();
  }));
  it('should create the app', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it('should render the first course as a course-card', waitForAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('course-card')).toBeTruthy();
  }));
});
