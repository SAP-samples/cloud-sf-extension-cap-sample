# Configure SuccessFactors Backend

## Introduction
   We will see the necessary steps needed for preparing the SuccessFactors backend.
   
## Step-by-Step

### Create Outbound OAuth Configuration


1. Login to your SuccessFactors instance with your username and password.
2. In the search bar, search for Integration and Choose 'Integration Center'.

   ![Integration Center](./images/sf-config-1.png)

3. In the 'Integration Center', select the tile 'Security Center'.

   ![Security Center](./images/sf-config-2.png)

4. Select 'Outbound OAuth Configurations'.

   ![Security Center](./images/sf-config-3.png)
   
5. Click 'Add' to create new OAuth configuration.

   ![OAuth Config1](./images/sf-config-4.png)
   
6. In the next step, we would configure the OAuth details of the Enterprise messaging instance in the SAP Cloud Platform. To view the service key of the Enterprise messaging instance, see the last step described in [Viewing service key](../ems-config/README.md#generate-service-key). Copy the values of 'Client ID', 'Client Secret' and 'Token endpoint' to a text editor of your choice.
 
7. In the opened screen for adding new OAuth Configuration, enter the following values:		
   - 'Configuration Name' : Enter a meaningful name, example: 'SFMission'
   - 'OAuth Type' : Select 'OAuth 2.0'
   - 'Grant Type' : Select 'Client_Credentials'
   - 'Client ID' : Client id of Enterprise messaging instance copied in previous step
   - 'Client secret' : Client secret of Enterprise messaging instance copied in previous step
   - 'Token URL': Token endpoint url of Enterprise messaging instance copied in previous step
   - Click on 'Add New Row' in Custom Parameters.
   - Enter key as 'x-qos' and Value ='1'
   - Click 'Save' to save the new OAuth Configuration.
   
     ![OAuth Config2](./images/sf-config-5.png)

### Create new Integration Trigger Job

1. Again go back to 'Integration Center' and select 'My Integrations'.

   ![Integration Job1](./images/sf-config-6.png)
   
2. Click '+ Create' and select 'More Integration Types'.

   ![Integration Job2](./images/sf-config-7.png)
   
3. 	In the opened screen, select the following values:
   - Choose Trigger type: 'Intelligent services'
   - Choose Destination type: 'REST'
   - Select Source Type : 'SuccessFactors'
   - Choose Format: JSON
   - Click 'Create'.

     ![Integration Job2](./images/sf-config-8.png)
     
4. In the next page, search for the event, 'Employment Termination' and click on the event 'Employment Termination' and click 'Select'.

   ![select Termination Event](./images/selectTerminationEvent.png)
   
5. Enter a meaningful name for 'Integration Name' for ex: 'Emp Termination' and Description as 'SF Mission' and click 'Next'.

   ![Integration Job3](./images/sf-config-9.png)
   
6. Click the '+' button to configure fields and Select 'Insert sibling element'

   ![Insert Elements](./images/insertElements.png)
   
7. Click on the element created and in the detailed view of the element, enter label as 'employeeId' and Click the button with tooltip 'Set as Association Field' as shown in screenshot.

   ![EmployeeId](./images/sf-config-10.png)
   
8. Expand 'Entity Tree View' and Select 'User ID' and Click the button 'Change Association to User ID'.

   ![EmployeeId2](./images/sf-config-11.png)
   
9. Click on the '+' button like in step 6 to add another new field and select 'Insert sibling element'.
10. Click on the element created	and in the detailed view of the element, enter label as 'managerId' and Click the button 'Set as Association Field'.

    ![ManagerId1](./images/sf-config-12.png)
    
11. Search for 'supervisor' and from the searched list, choose 'Supervisor (managerId) in Job Information (EmpJob)' and select 'Supervisor' and Click 'Change Association to Supervisor Id'.

    ![ManagerId2](./images/sf-config-13.png)
    
12. Click on the '+' button like in step 6 to add another new field and select 'Insert sibling element'.
13. Click on the element created and in the detailed view of the element, enter label as 'message' and enter Default value as 'Resigned' and Click 'Next'.

    ![Message](./images/sf-config-14.png)
    
14. Click 'Next' for the tab 'Response Fields' and Click Next' for the tab 'Filter'.
15. Select Authentication Type as 'Oauth' and in the drop-down for OAuth Configurations, select the previously created OAuth Configuration.

    ![destination Setting1](./images/destinationSetting1.png)
    
16. Construct the REST API URL link as shown below :
    - Give the Base url of the queue which was copied from Enterprise Message Service Key in step 4.10 E.g For Europe Region Account it could be 'https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/<topicName>/messages'. Use the topic name copied from the Subscriptions in Enterprise Messaging Application. Note that the topic name be used after double encoding.
For example, if your topic name is sfext/sf/sample/myMessaging/d41d/sfemessage, then the / should be replaced with %252F. The resultant topic name will be sfext%252Fsf%252Fsample%252FmyMessaging%252Fd41d%252Fsfemessage.'
In the end our final URL looks like : 'https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/eccorg%252Fsfmission%252Fabcd%252FPLTUserManagement%252Fd41d%252Fsfemessage/messages'

    ![destination Setting2](./images/destinationSetting2.png) 

17. Click on 'Next'.
18. Click on 'Save' and if any pop up comes up, click on 'Save/OK'.
    
    ![Save integration](./images/sf-config-15.png)
    
19. In Review and Run tab - click on 'Run now'.

    ![Run integration](./images/sf-config-16.png)
    
20. You should see a 'Success' message that the integration job was submitted.

    ![Success integration](./images/sf-config-17.png)

### Consume event when published 	
1. Search for 'Intelligent' and choose 'Intelligent Services Center'

   ![Consume event1](./images/sf-config-18.png)
   
2. Search for 'Employment' and click on the 'Employment Termination' event.

   ![Consume event2](./images/sf-config-19.png)
   
3. In the right side of the screen, Click on Custom Activities> Integration.

   ![Consume event3](./images/sf-config-20.png)
   
4. There is a popup for selecting Integration.
5. 	Choose the created Integration and Click on 'Add Integration'.

   ![Consume event4](./images/sf-config-22.png)
   
6. 	Now let us change the setting to consume event when an event is published.
7. Scroll down to the list and select the Integration created by you with Source as 'Integration Center' and change the Timing as 'When event is published' from the list. Click 'Actions'(top of page).

   ![Consume event5](./images/sf-config-23.png)
   
8. Click 'Save Flow'.

   ![Consume event6](./images/sf-config-24.png)	