import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPerson } from '../models/Person';

@Injectable()
export class DataSharingService {
    public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public currentUser: BehaviorSubject<IPerson> = new BehaviorSubject<IPerson>(null);
}