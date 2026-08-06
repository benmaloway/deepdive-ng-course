import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Course } from '../model/course';
import { Observable } from 'rxjs/internal/Observable';

let counter = 0;
// Set up as app wide singleton service. This is the preferred way to set up a service in Angular. It is provided in the root injector of the application. The provider is responsible for creating an instance of the service and providing it to the component that needs it.
// Always use it when it is stateless and not component specific. 
// If it is stateful and component specific, then provide it in the component itself. This will create a unique instance of the service for that component. It will not be shared with other components. This is called a non-singleton service.  You would use the providedIn property of the @Injectable decorator to specify that the service should be provided in the root injector of the application. This will create a singleton instance of the service that can be shared across the entire application. You would use this approach when you want to share state or data between different components in your application.  You would use the providers property of the @Component decorator to specify that the service should be provided in the component's injector. This will create a unique instance of the service for that component and its children. You would use this approach when you want to encapsulate state or data within a specific component and its children.
@Injectable({
  providedIn: 'root',
  useFactory: (http: HttpClient) => new CoursesService(http),
  deps: [HttpClient]
})
export class CoursesService {

  id:number;

  constructor(private http: HttpClient) {
    counter++;
    this.id = counter;
    console.log("CoursesService instance created", this.id);
  }

  loadCourses() : Observable<Course[]> {
    const params = new HttpParams().set('pageNumber', '0').set('pageSize', '3');

    return this.http.get<Course[]>('/api/courses', { params });
  }

  saveCourse(course: Course) {
    // X-Auth is a custom header that we can use to send additional information to the server. In this case, we are sending the userId of the user who is making the request. This is useful for authentication and authorization purposes. The server can use this information to determine if the user is allowed to make the request or not.
    const header = new HttpHeaders().set('X-Auth', 'userId');

    return this.http.put(`/api/courses/${course.id}`, course, { headers: header });
  }

}
