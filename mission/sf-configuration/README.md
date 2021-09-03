# Configure events in SAP SuccessFactors system

## Introduction
   Go through the necessary steps needed for preparing the SAP SuccessFactors backend.
   
   **Persona:** SAP SuccessFactors Administrator 
   **Abbreviation:** SAP Business Technology Platform = SAP BTP

## Step-by-Step

### Create Outbound OAuth Configuration


1. Login to your SAP SuccessFactors instance with your username and password.
2. In the search bar, search for Integration and Choose **Integration Center**.

   ![Integration Center](./images/sf-config-1.png)

3. In the **Integration Center**, select the tile **Security Center**. If you do not find the tile **Security Center** in the Integration Center, then search for the tile **Security Center**. 

   ![Security Center](./images/sf-config-2.png)

4. Choose **Outbound OAuth Configurations**.

   ![Security Center](./images/sf-config-3.png)
   
5. Choose **Add** to create a new OAuth configuration.

   ![OAuth Config1](./images/sf-config-4.png)
   
6. Configure the OAuth details of the Event Mesh service instance in SAP BTP. To get the service key of the Event Mesh instance, see the last step described in [Viewing service key](../ems-config/README.md#generate-service-key). Copy the values of **Client ID**, **Client Secret** and **Token endpoint** to a text editor of your choice.
 
7. In the opened screen for adding new OAuth Configuration, enter the following values:		
   - In the **Configuration Name** field enter a meaningful name, example: **SFMission**
   - In the **OAuth Type** field select **OAuth 2.0**
   - In the **Grant Type** field select **Client_Credentials**
   - In the **Client ID** field set the **Client id** of the Event Mesh instance copied in previous step
   - In the **Client secret** field enter the **Client secret** of the Event Mesh instance copied in previous step
   - In the **Token URL** field enter the **Token endpoint URL** of the Event Mesh instance copied in previous step
   - Click on **Add New Row** in Custom Parameters.
   - Enter in the key field **x-qos** and in the value field **1**
   - Save the new OAuth Configuration.
   
     ![OAuth Config2](./images/sf-config-5.png)

### Create new Integration Trigger Job

1. Again go back to **Integration Center** and select **My Integrations**.

   ![Integration Job1](./images/sf-config-6.png)
   
2. Click **+ Create** and select **More Integration Types**.

   ![Integration Job2](./images/sf-config-7.png)
   
3. 	In the opened screen, select the following values:
   - In the Trigger type area, select the **Intelligent services** radio button
   - In the Destination type area select the **REST** radio button
   - In the Source Type area select the **SuccessFactors** radion button.
   - In the Format area  select the **JSON** radion button.
   - Choose **Create**.

     ![Integration Job2](./images/sf-config-8.png)
     
4. In the next page, search for the event, **Employment Termination**, select it from the list, and then choose **Select**.

   ![select Termination Event](./images/selectTerminationEvent.png)
   
5. Enter a meaningful name for **Integration Name** for example **Emp Termination** 
6. In the **Description** filed enter a meaningful text such as **SF Mission**
7. Choose **Next**.

   ![Integration Job3](./images/sf-config-9.png)
   
8. Choose **+** button to configure fields and then choose **Insert sibling element**

   ![Insert Elements](./images/insertElements.png)
   
9. Choose the element created and in the detailed view of the element, in the Label field enter **employeeId** and then choose the button with tooltip **Set as Association Field** as shown in screenshot.

   ![EmployeeId](./images/sf-config-10.png)
   
10. Expand the **Entity Tree View**, choose **User ID** and then choose the button **Change Association to User ID**.

   ![EmployeeId2](./images/sf-config-11.png)
   
11. Choose the **+** to add another new field and then choose **Insert sibling element**.
12. Choose the element created and in the detailed view of the element, in the Label field, enter **managerId** and choose the button with tooltip **Set as Association Field**.

    ![ManagerId1](./images/sf-config-12.png)
    
13. Search for **supervisor** and from the searche results list, choose **Supervisor (managerId) in Job Information (EmpJob)**
14. Expand the Entity Tree View, choose **Supervisor** and then choose **Change Association to Supervisor Id**.

    ![ManagerId2](./images/sf-config-13.png)
    
15. Choose **+**  + to add another field and then choose the button with tooltip **Insert sibling element**.
16. Choose the element created and in the detailed view of this element, in the Label field, enter **message** 
17. In the **Default value** field enter **Resigned**.
18. Choose **Next**.

    ![Message](./images/sf-config-14.png)
    
19. In the **Response Fields** choose **Next** without changing any configuration.
20. In the **Filter** tab choose **Next** without changing any configuration.
21. In the **Destination Settings tab:**
   - In the  **Authentication Type** field. select **OAuth**
   - in the **OAuth Configurations** field select the previously created OAuth Configuration.

   ![destination Setting1](./images/destinationSetting1.png)
    
22. Construct the REST API URL link as shown below :
    - Give the Base url of the queue which was copied from Enterprise Message Service Key in step 4. For example for Europe Region Account it could be **`https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/<topicName>/messages`**. 
    -  Use the topic name copied from the Subscriptions in Event Mesh Application. Note that the topic name be used after double encoding. For example, if your topic name is **eccorg/sfmission/abcd/sfemessage**, then the / must be replaced with %252F. The resultant topic name will be 
**eccorg%252Fsfmission%252Fabcd%252Fsfemessage**.
    -  In the end our final URL looks like : **https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/eccorg%252Fsfmission%252Fabcd%252Fsfemessage/messages**.


   ![destination Setting2](./images/destinationSetting2.png) 

23. Choose **Next**.
24. **Save** the configuration and if any pop up comes up, click on **Save/OK**.
    
    ![Save integration](./images/sf-config-15.png)
    
25. In Review and Run tab - choose **Run now**.

    ![Run integration](./images/sf-config-16.png)
    
26. You should see a **Success** message that the integration job was submitted.

    ![Success integration](./images/sf-config-17.png)

### Consume event when published 	
1. Search for **Intelligent** and choose **Intelligent Services Center(ISC)**

   ![Consume event1](./images/sf-config-18.png)
   
2. Search for **Employment** and choose the **Employment Termination** event.

   ![Consume event2](./images/sf-config-19.png)
   
3. In the right side of the screen choose Custom Activities> Integration.

   ![Consume event3](./images/sf-config-20.png)
   
4. There is a popup for selecting Integration. Choose the created Integration and then choose **Add Integration**.

   ![Consume event4](./images/sf-config-22.png)
   
Now let us change the setting to consume an event when it is published.

5. Scroll down to the list and select the iIntegration just you created with source as **Integration Center** and change the **Timing** to **When event is published** from the list. 
6. Choose **Actions** (top of page).

   ![Consume event5](./images/sf-config-23.png)
   
7. Choose **Save Flow**.

   ![Consume event6](./images/sf-config-24.png)	


## Summary
We have established a trust to the SAP Event Mesh service and created an integration job that is triggered when a employment termination is proceeden and puplish it via event. 
