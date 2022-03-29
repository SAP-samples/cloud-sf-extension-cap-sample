# Testing your scenario by running the Reference Application

## Introduction
Let us now try to test the end to end scenario by triggering an **Employee Termination** event in the SAP SuccessFactors system and then you can view and consume this event in your SAP BTP extension application. To run this scenario you need a SAP SuccessFactors testing system and must have an administrator role. The names of the persons that are used in this tutorial may differ in your system.

**Abbreviation:** SAP Business Technology Platform = SAP BTP

## Step-by-step

### Start the Demo Application
1. Login to your SAP BTP global account.
2. Navigate to your sub-account and space where you have deployed your SuccessFactors extension application.
3. You have the options to start the demo applications either by calling the applications from the **HTML5 Repository** or by the **SAP Launchpad** when you have done this optional implementation step

4a. **Using HTML5 Repository**

   - In the cockpit menue choose **HTML5 Applications**. You will find the notifications and projects applications in the repository
   
     ![Projects](./images/html5repo.png) 

   - Select the projects application and login via the SuccessFactors IDP with your SAP SuccessFactors username that belongs to a manager. For example, the demo username **dleal (David Leal)** belongs to the fiction employee David Leal who is a manager.

4b. **Using Launchpad Service**

   - Open the launchpad URL which you have copied in [Create a Launchpad Site - step 5](../launchpad/README.md#copyURL)
   - Login via the SuccessFactors IDP with your SAP SuccessFactors username that belongs to a manager. For example, the demo username **dleal (David Leal)** belongs to the fiction employee David Leal who is a manager.
   
     ![Projects](./images/Projects.png)

### Run the Demo Application

1. Choose the **Projects** tile.

   ![Projects](./images/Projects2.png)
   
2. Go to the **Projects** tab and choose **Edit**. 

   ![Project Edit](./images/Edit.png)

3. Choose **Create**. A new entry appears. 
   
   ![Assign Employee](./images/Create.png)

4. Choose the drop-down in the Employee ID column of the new entry. All employees reporting to David Leal are displayed.

   ![Drop-down](./images/Drop-down.png)
   
5. Select an employee, for example Simon Rampal (srampal), and assign him to projects. 

6. **Save** the changes.

7. Log in to the SAP SuccessFactors demo instance with the SAP SuccessFactors Admin user, in this case the admin user is **sfadmin**.

   ![step1](./images/step1.PNG)
    
8. Search for the employee **David Leal** (dleal) in the Employee Directory.
9. Choose the employee **David Leal**.
10. Click **Actions** > **Jump To** > **Org Chart** or choose **Home** and select **Org Chart**.
    
    ![step4](./images/step4.PNG)

11. Choose an employee who is reporting to **David Leal** for example Simon Rampal(srampal) who was assigned to the project in step 12.

12. Choose **Take Action** > **Termination**.
    
    ![step6](./images/step6.PNG)
    
13. Make the following configuration:
      - In the **Termination Date** field, configure a future date. For example, a date one week from the current date
      - In the **Termination Reason**, select **Early Retirement (TERELRT)**
      - In the **OK to Rehire** , select **Yes**
      - In the **Regret Termination** field, select **Yes**
      
        ![step7](./images/step7.PNG)
        
14. Choose **Save**.
15. In the window **Please confirm your request**, choose **Show workflow participants**.
    
16. For the Termination event to get triggered, tow more Workflow participants has to approve this termination. In our demo system, workflow participants are shown as 1. Paul Atkins (Production Director); 2. Tessa Walker (HR Business Partner Global), Christine Dolan (Chief Human Resources Officer). This means that Paul Atkins and Tessa Walker (or Christine Dolan) must approve this request to proceed.
    
17. Choose **Confirm**.
18. You can log in/ask the workflow participants to approve the request. Choose **Proxy Now** and then **Select Target User as Paul Atkins (patkins)** to approve the request.
    
    ![step12](./images/step12.PNG)
    
19. In the Home page of **Paul Atkins**, select the Notification icon and choose **Approve Requests**. 

    ![step12a](./images/step12a.png)
    
20. Choose **Approve** for the **Early Retirement for Simon Rampal** request.
    
    ![step14](./images/step14.PNG)
    
21. Choose **Proxy Now** and then **Select Target User as Tessa Walker(twalker)** to approve the request.
22. In the Home page of **Tessa Walker**, choose **Approve Requests**.
23. Choose **Approve** for the **Early Retirement of Simon Rampal** request. Now two users have approved the early retirement and an event will be triggered.
24. Switch to the browser window where you have opened the SAP BTP extension application (you opened this app in Step 3).
25. Login with user **David Leal (dleal)** who is a manager.
26. Choose **Notifications**.
    > By using the **HTML5 Repository** start the notification application. 
    > ![notification](./images/html5repo2.png)
    
    ![step20](./images/NotificationInApp.png)
    
27. Notification will be displayed regarding the resignation of Simon Rampal along with his skillset.

    ![step21](./images/Step29.png)
