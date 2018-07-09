import { DataSharingService } from '../services/DataSharingService';

export class AppHeaderComponent { 
    // Define a variable to use for showing/hiding the Login button
    isUserLoggedIn: boolean;

    constructor(private dataSharingService: DataSharingService) {

        // Subscribe here, this will automatically update 
        // "isUserLoggedIn" whenever a change to the subject is made.
        this.dataSharingService.isUserLoggedIn.subscribe( value => {
            this.isUserLoggedIn = value;
        });
    }
}