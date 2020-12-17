# SAP SucessFactors Extension Application - "Run Smooth"
[![REUSE status](https://api.reuse.software/badge/github.com/SAP-samples/cloud-sf-extension-cap-sample)](https://api.reuse.software/info/github.com/SAP-samples/cloud-sf-extension-cap-sample)

## Description:
`Run Smooth` is a reference application which showcases how to build an event driven extensions for SAP SuccessFactors using the capabilities provided by [SAP Cloud Platform Extension Factory](https://help.sap.com/viewer/7b98ddc13f8d4a3ba08a74042a0baa7f/Cloud/en-US). This solution is developed by extending the Employee Central module of SAP SuccessFactors to build an event driven application.

This application showcases:
1. Capabilities of SAP Cloud Platform Extension Factory
2. Building application on SAP Cloud Platform using SAP Cloud Application Programming Model(CAP)
3. Building and Event driven extension application using SAP CP Enterprise Messaging
4. Consuming REST API's from SAP SuccessFactors using SAP CP Destination Service


## Business Scenario:

In this reference application called as Run Smooth a business scenario is used to showcase the technology components.
A Manager maintains in the Run Smooth application the staffing details of all the projects to which the employees reporting to him are contributing to.  He can create project and assign employees to the projects. An employee contributing to a project might decide to leave the team/ company. When this happens, the manager gets a notification with the projects that the employee is working on and the skillsets of the employee. This information can be used by manager to find/hire a replacement for employee and assign the projects.

#### Features:
* Create Projects
* Assign Employees
* View the list of projects, employees working on the projects.
* Get notification when an employee is leaving the team with the consolidated report on the skills of the employee.

## Architecture

### Solution Diagram

![solution diagram](./documentation/images/SolutionDiagram.png)

The Run Smooth application is developed using [SAP Cloud Application programming Model (CAP)](https://cap.cloud.sap/docs/) and runs on the SAP Cloud Platform, Cloud Foundry Environment. It consumes platform services like Enterprise Messaging, SAP HANA and Destination. The events generated in SuccessFactors are inserted into the Enterprise messaging queue. The application running in Cloud Foundry polls the queue for these messages and inserts them into the HANA database. The run smooth application also makes calls to SF OData APIs to get SF data.

> Note: SAP fiori elements floorplans for OData V4 is in Lab preview and would be GA later this year.

## Requirements
* [Node js](https://nodejs.org/en/download/)
* SuccessFactors test or demo instance.
>Note: Please do not try running this application against a SuccessFactors productive instance as it involves triggering a Termination Event from SuccessFactors.
* [Cloud Foundry Command Line Interface (CLI)](https://github.com/cloudfoundry/cli#downloads)
* To build the multi target application, we need the [Cloud MTA Build tool](https://sap.github.io/cloud-mta-build-tool/), download the tool from [here](https://sap.github.io/cloud-mta-build-tool/download/)
* For Windows system, install 'MAKE' from https://sap.github.io/cloud-mta-build-tool/makefile/

If sap-registry is set in your system please delete by using below command.   
   
    `npm config delete "@sap:registry"`
>Note: Minimum version to run the application is CDS : 4.x.x
* Install the following:
	1. cds	 	- `npm install -g @sap/cds` `npm install -g @sap/cds-dk`
	2. [multiapps plugin](https://github.com/cloudfoundry-incubator/multiapps-cli-plugin) - `cf install-plugin multiapps`  
	3. mbt         -  `npm install -g mbt`
* A SAP Cloud Platfrom Account with Cloud Foundry Environment with the following [entitlements](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c8248745dde24afb91479361de336111.html) enabled:

| Service                           | Plan       | Number of Instances |
|-----------------------------------|------------|:-------------------:|
| Destination                       | lite       |          1          |
| Enterprise Messaging              | default    |          1          |
| SAP HANA Schemas & HDI Containers | hdi-shared |          1          |
| SAP SuccessFactors Extensibility  | api-access |          1          |
| SAP Hana Service                  | 64standard |          1          |
| Application Runtime              | memory         |          3          |
| Html5 Applications		    |  app-host	 |	    2	       |
|Portal [Optional]	    |  Standard	 |	    1       |


## Configuration

### Step 1: Configure trust between Successfactors and SAP Cloud Platform using Extension Factory

 Follow steps 1, 2 and 4 from this [document](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/9e33934540c44681817567d6072effb2.html) to set up trust and destination to access SuccessFactors system using Extension Factory.
> Ignore step 3 in the document as the service instance creation is automatically done when the application is deployed as MTA.

### Step 2: Download the EDMX files
1. Open https://api.sap.com/ and login to the same
2. In the Search bar, search for "External User".
3. Click on the External User API from SAP SuccessFactors
4. Click on Details
5. Click on Download Specifications
6. Choose EDMX. The edmx file is now saved in the local machine
7. Similarly download 
	- User Management API from SAP SuccessFactors
	- Skills Management API from SAP SuccessFactors

### Step 3: Project Configuration
1. [Clone](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) this [repository](../..)
2. Copy the three downloaded EDM files from Step 2 into root folder of the cloned project
3. Import the downloaded EDMX files by running the command ```  cds import <filename>.edmx```
4. In the root folder of the project locate and open [mta.yaml](mta.yaml)
5. Go to the section `Success Factors Extensibility Service` and modify the SuccessFactors System name as per the name given while registering the System in previous step.
6. In the root folder of the clone project open the file package.json and add the below credentials section to all the three imported edmx files
   >        
       "FoundationPlatformPLT": {
          "kind": "odata",
          "model": "srv/external/FoundationPlatformPLT",
          "credentials": {
            "destination": "sfextension-service",
            "path": "/odata/v2",
            "requestTimeout": 18000000
          }
        },
        "PLTUserManagement": {
          "kind": "odata",
          "model": "srv/external/PLTUserManagement",
          "credentials": {
            "destination": "sfextension-service",
            "path": "/odata/v2",
            "requestTimeout": 18000000
          }
        },
        "ECSkillsManagement": {
          "kind": "odata",
          "model": "srv/external/ECSkillsManagement",
          "credentials": {
            "destination": "sfextension-service",
            "path": "/odata/v2",
            "requestTimeout": 18000000
          }
        }

7. Open the file “enterprisemessage.json”  in root folder of the project. Modify `"emname": "<yourmessageclientname>","namespace": "<yourorgname>/<yourmessageclientname>/<uniqueID>"` with values for `"<yourmessageclientname>"`,`<yourorgname>/<yourmessageclientname>/<uniqueID>"` as described below.
> The `<yourmessageclientname>` and `<uniqueID>` can be any random unique identifier. `<yourorgname>` would be your SAP Cloud Platfrom Cloud. Foundry Org name without '-' or any special character.  Please make sure that namespace does not exceed 24 characters. For more details regarding syntax, size and characters allowed in namespace are mentioned [here](https://help.sap.com/viewer/bf82e6b26456494cbdd197057c09979f/Cloud/en-US/5696828fd5724aa5b26412db09163530.html?q=namespace)

8. Enable Portal Subscription. 
  - Navigate to SAP Cloud Platfrom Cockpit, 
   - Navigate to your subaccount  
   - Click on Subscriptions. 
   - Search and local Portal Subscription and enable it
> If you do not have Portal Service enabled in your entitlements, ignore this step.

9.There are two options with respect to HANA to continue:
   
   option 1: Create SAP HANA Service instance with plan 64standard as described [here](https://help.sap.com/viewer/cc53ad464a57404b8d453bbadbc81ceb/Cloud/en-US/21418824b23a401aa116d9ad42dd5ba6.html)
   The application is configured for SAP HANA Cloud  Service instance.
   Remove the following snippet from package.json to adapt it to SAP HANA Service instance.
   ```
   "hana": {
      "deploy-format": "hdbtable"
   },
   ```
   
   option 2: Create SAP HANA Cloud service instance with plan hana as described [here](https://help.sap.com/viewer/db19c7071e5f4101837e23f06e576495/2020_03_QRC/en-US/f7febb16072b41f7ac90abf5ea1d4b86.html)
   
> If there are multiple instances of SAP HANA Service in the space where you plan to deploy this application, please modify the mta.yaml as shown below. Replace <database_guid> with the [id of the database](https://help.sap.com/viewer/cc53ad464a57404b8d453bbadbc81ceb/Cloud/en-US/93cdbb1bd50d49fe872e7b648a4d9677.html?q=guid) you would like to bind the application with :
 ```
 # Hana HDI Container
  - name: cloud-sf-extension-cap-sample-db-hdi-container
    type: com.sap.xs.hdi-container
    parameters:
     service: hana
     service-plan: hdi-shared
     config:
       database_id: <database_guid>
    properties:
      hdi-container-name: '${service-name}'
```


### Step 4: Deploy the reference application
> If the application is to be deployed without portal service, please copy  [mta without portal service](documentation/mta_without_portal.yaml) and replace the content of [mta.yaml](mta.yaml) file with it. 

1. Build the application by running below command from root folder of project
    `mbt build -p=cf `  
2. Login to Cloud Foundry by typing the below commands on command prompt
    ```
    cf api <api>
    cf login -u <username> -p <password>
    ```
    `api` - [URL of the Cloud Foundry landscape](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/350356d1dc314d3199dca15bd2ab9b0e.html) that you are trying to connect to.

    Select the org and space when prompted to. For more information on the same refer [link](https://help.sap.com/viewer/65de2977205c403bbc107264b8eccf4b/Cloud/en-US/c4c25cc63ac845779f76202360f98694.html).

3. Deploy the application

	Navigate to mta_archives folder and run the below command from CLI

   `cf deploy cloud-sf-extension-cap-sample_0.0.1.mtar`
   
   > In case you need to deploy the application again, delete the sfextension-service instance and then deploy. 

### Step 5: Enterprise Messaging Application
1. Follow the steps [here](https://help.sap.com/viewer/bf82e6b26456494cbdd197057c09979f/Cloud/en-US/d6389ec67f2e451b8d4cadc19c4bc369.html) to subscribe to the Enterprise Messaging Business Application
2. Follow the steps [here](https://help.sap.com/viewer/bf82e6b26456494cbdd197057c09979f/Cloud/en-US/637d331010e54a2999e2f023d2de1130.html) to add the necessary roles to the user to access the Enterprise Messaging Business Application
3. Open your global account, then your subaccount.
4. In the left pane, choose Subscriptions.
5. Choose Enterprise Messaging and click on `Go to Application` link (after the subscription is activated).
6. In the application, choose the messaging client (specified in the Project Configuration>Step 2.5) created when the application is deployed.
7. Go to the tab `Queue`.
![Integration type](./documentation/images/queue.png)
8. From the table, click on Icon for 'Subscription' (under Actions) for the Queue created when the application was deployed.
9. From the pop-up window, please note the topic name for future reference (Step 5.5.8)
10. Create Service Keys for Enterprise Messaging Service by following steps [here](https://help.sap.com/viewer/bf82e6b26456494cbdd197057c09979f/Cloud/en-US/577ea7ce5cef4e2ea974c03d5549b3ff.html). Note down the client id, client secret, Token URL and Base URL from the service key which is shown as a json.

### Step 6: Setting up SuccessFactors system

In this step, you will configure the successFactors system to send message to the Enterprise Messaging service on Cloud platform.

1. Login to the sf demo instance.

    username: sfadmin
    password: `<It will be provided to you in the mail that you receive on requesting for demo instance. >`

2. Setting Outbound OAuth Configurations. In this step, the credentials required to send messages to the Enterprise Messaging service are set.

   1. In the demo instance search bar, search for [Integration center](https://help.sap.com/viewer/60ba370328e0485797adde67aee846a0/latest/en-US/7ef9c7781afd4ee597e4c09555e4546a.html)
   2. Select `Security center`
   3. Select `Outbound OAuth Configurations`
   4. Click on `Add` to create new OAuth configuration
   5. Enter the below detail:

      OAuth Type: `OAuth 2.0`

      Grant Type: `Client_Credentials`

      `Client ID`, `Client Secret`, `Token URL`: you can get these details from the service key of the enterprise message service instance you created in Step 5. If there is no existing service key, please create it in the Cloud Platform cockpit.

      Add Custom Header Parameters.

      Add new row: key=x-qos. Value =1

3. [Creating outbound integration](https://help.sap.com/viewer/60ba370328e0485797adde67aee846a0/latest/en-US/755f11067c084481b578dfe7cadb89a9.html). An integration specifies the endpoint to which a message should be send along with the content of the message.
   1. Navigate to integration center.
   2. Select `My Integrations`
   3. Select `Create` > `More Integration Types`
   4. Select the below options and click on Create:

      Trigger type: Intelligent service

      Destination type: REST

      Format: JSON

   ![Integration type](./documentation/images/integration.PNG)

4. Search for the [Intelligent Service](https://help.sap.com/viewer/60ba370328e0485797adde67aee846a0/latest/en-US/c187392494804ee0baf6b4b58bb428b4.html) `Employment Termination`. Select it and click on `Select` button.

5. Provide details for the integration.
   1. Enter name for the integration and click next
   2. In Configure Fields tab, Click `+` button. Insert sibling elements
   3. Select the created element and set label as 'employeeId'
   4. Click on `Set as Associated field` button. Select entity tree view. Select `User ID`. Click on 'Change Association to User Id'
   ![Set as Association field](./documentation/images/SetAsAssociation.png)
   5. Similarly add new sibling for `managerId` and associate it with Supervisor id.
   6. Add new sibling element `message` with default value as 'Resigned'. Click Next
   7. Keep the default settings for `Response field`, `Filter` tabs. Click Next
   8. Edit the `Destination Settings` with the following details:

      REST API URL: give the Base URL of the queue which was copied from Enterprise Message Service Key in step 4.10
     E.g For Europe Region Account it could be `https://enterprise-messaging-pubsub.cfapps.eu10.hana.ondemand.com/messagingrest/v1/topics/<topicName>/messages`
      > For <topicName>, use the topic name copied in Step 4.9. Note that the topic name must be double encoded.
      
      > For example, if your topic name is `sfem/emm/1909/PLTUserManagement/d41d/sfemessage`, then the `/` should be replaced with `%252F`.
      The resultant topic name will be `sfem%252Femm%252F1909%252FPLTUserManagement%252Fd41d%252Fsfemessage`.
      

      Authentication type: OAuth

      OAuth Configuration: Select the configuration created in Step 2 above on Setting Outbound OAuth Configurations.

      ![Destination settings](./documentation/images/DestinationSettings.PNG)

   9. Click on `Save`

   10. In `Review and Run` tab - click on `Run now`

 6. Configuring the event flow. This step ensures that when the event is triggered, the integration created in the above step is run.
   1. Search for intelligent services center in the search bar.
   2. Select Employment termination event
   3. Add integration for the existing flow:
      - Click on `Integration` under `Activities`. (on the right-hand side corner)
      - Select the Integration created in the previous step. Click on `Add integration`.
      - Change the 'Timing' of the Integration to 'When the event is published' and save the flow (`Actions > Save Flow`).

## Demo Script

1. In the command line interface run the command `cf apps`
   
2. Find the URL for the app `cloud-sf-extension-cap-sample-approuter` - this is the launch URL for Run Smooth application
   
   > If project is deployed without portal service then form the url to run your application like below
   >
   >`https://<tenantId>.<appRouterHost>.<domain>/<appName-appVersion>/<resourcePath>`
   >
   >Example:
    ```  https://<approuter-url>/projects-1.0.0/index.html ```

3. Launch the URL and login as dleal(David Leal)
> You can choose any employee who is a Manager.
5. Click on Project Details tile
![Project Details](./documentation/images/App.png)
6. Click on a Project from the list. 
7. Click on Edit button
![Project Edit](./documentation/images/Edit.png)
8. Click on Create Button.
![Assign Employee](./documentation/images/Create.png)
9. Click the Drop-Down
   ![Drop-down](./documentation/images/Drop-down.png)
10.  All employees reporting to David Leal is displayed.
11. Select a employee and assign them to projects. E.g Simon Rampal(srampal)
12. Login to SF demo instance with sfadmin user.
![step1](./documentation/images/step1.PNG)
13. Search for Employee David Leal (dleal) in the Employee Directory
14. Select Employee David Leal
15. Click on Actions button and Select Org Chart
![step4](./documentation/images/step4.PNG)
16. Choose an employee who is reporting to 'David Leal e.g Simon Rampal(srampal) and assigned to the project in step 8
17. Click on Take Actions button and Select Termination
![step6](./documentation/images/step6.PNG)
18. Set values for
      - Termination Date (Recommended to use a future date. For example, a date one week from the current date)
      - Termination Reason - Early Retirement
      - Ok to Rehire - Yes
      - Regret Termination - Yes
![step7](./documentation/images/step7.PNG)
19. Click on Save.
20. In the window `Please confirm your request`, click on the 'Show workflow participants'.
21. Workflow participants would be shown as 1. Paul Atkins (Production Director); 2. Tessa Walker (HR Business Partner Global), Christine Dolan (Chief Human Resources Officer)
> This means that Paul Atkins and Tessa Walker (or Christine Dolan) must approve this request to proceed.
22. Click on Confirm button
23. Use Proxy Now functionality and Select Target User as Paul Atkins(patkins)
![step12](./documentation/images/step12.PNG)
24. In the Home page of Paul Atkins click on tile Approve Requests
25. Click on Approve button for the request for approval of Early Retirement of Simon Rampal
![step14](./documentation/images/step14.PNG)
26. Use Proxy Now functionality and Select Target User as Tessa Walker(twalker)
27. In the Home page of Tessa Walker click on tile Approve Requests
28. Click on Approve button for the request for approval of Early Retirement of Simon Rampal
29. Open the Web Application UI for Run Smooth application in browser.
30. Login with user David Leal (dleal).
31. Click on notifications tile from the approuter URL.
![step20](./documentation/images/App.png)
   
    > If project is deployed without portal service then form the url to run your application like below :
    > `https://<tenantId>.<appRouterHost>.<domain>/<appName-appVersion>/<resourcePath>`
    >
    > Example:
    ```https://<approuter-url>/notifications-1.0.0/index.html```
    
32.  Notification will be displayed regarding Resignation of Simpon Rampal along with his Skillset.
![step21](./documentation/images/Step29.png)



## How to Obtain Support

In case you find a bug, or you need additional support, please open an issue here in GitHub.

## License
Copyright (c) 2020 SAP SE or an SAP affiliate company. All rights reserved. This project is licensed under the Apache Software License, version 2.0 except as noted otherwise in the [LICENSE](LICENSES/Apache-2.0.txt) file.
